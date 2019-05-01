import uuid from "react-native-uuid";

String.prototype.stripHtmlTags = () => {
  const div = document.createElement("div");
  div.innerHTML = this;
  return div.texContent || div.innerText || "";
};

export default class Station {
  constructor(json) {
    this.title = json.title;
    this.address = json.address;
    this.contactEmail = json.contactEmail;
    this.contactPhone = json.contactPhone;
    this.content = json.content;
    this.location = json.location;
    this.priceFrom = json.priceFrom;
    this.priceTo = json.priceTo;
    this.tagline = json.tagline;
    this.website = json.website;
    // this.amenities = json.amenities;
  }

  static createFromApiResponse(json) {
    function p(propName, prefix = "_") {
      if ((valueArray = json.listing_props[`${prefix}${propName}`]))
        return valueArray[0];
    }
    let station = new Station();
    station.originalJSON = json.originalJSON || json;
    station.id = json.id;
    station.listingURL = json.link;
    if (json.listing_props) {
      station.title =
        p("job_title") ||
        json.title.rendered ||
        console.warn("no title for station", json.id);
      station.content =
        p("job_description") ||
        json.content.rendered ||
        console.warn("no description for station", json.id);
      station.contactEmail = p("company_email");
      station.contactPhone = p("company_phone");
      station.address = p("job_location");
      station.location = {
        lat: p("geolocation_lat", ""),
        lng: p("geolocation_long", "")
      };
      station.priceFrom = p("company_price_from");
      station.priceTo = p("company_price_to");
      station.website = p("company_website");
      if (station.website && !station.website.startsWith("http"))
        station.website = "http://" + station.website;
    }
    // this.amenityIDs = [...json.job_listing_amenity];

    station.mediaID = json.featured_media;
    if (station.mediaID > 0) {
      station.mediaDataURL =
        "http://joinelectro.com/wp-json/wp/v2/media/" + station.mediaID;
    }
    return station;
  }

  static createForApiPost(json) {
    return {
      originalJSON: json,
      id: uuid.v1(), // ultimately this may need to be a string
      listing_props: {
        _job_title: [json.title],
        _job_description: [json.content],
        _job_location: [json.address],
        _company_tagline: [json.tagline],
        _company_website: [json.website],
        _company_email: [json.contactEmail],
        _company_phone: [json.contactPhone],
        _job_location: [json.address],
        _company_price_from: [json.priceFrom],
        _company_price_to: [json.priceTo],
        _company_website: [json.website],
        geolocation_lat: [json.location.lat], // may need to be converted to a string
        geolocation_long: [json.location.lng] // may need to be converted to a string
      }
      // job_listing_amenity: (array of amenity numbers),
      // featured_media: (media id)
    };
  }
}
