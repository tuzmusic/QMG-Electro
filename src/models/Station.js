import uuid from "react-native-uuid";

String.prototype.stripHtmlTags = () => {
  const div = document.createElement("div");
  div.innerHTML = this;
  return div.texContent || div.innerText || "";
};

export default class Station {
  constructor(json) {
    function p(propName, prefix = "_") {
      if ((valueArray = json.listing_props[`${prefix}${propName}`]))
        return valueArray[0];
    }

    this.originalJSON = json.originalJSON || json;
    this.id = json.id;
    this.listingURL = json.link;
    if (json.listing_props) {
      this.title =
        p("job_title") ||
        json.title.rendered ||
        console.warn("no title for station", json.id);
      this.content =
        p("job_description") ||
        json.content.rendered ||
        console.warn("no description for station", json.id);
      this.contactEmail = p("company_email");
      this.contactPhone = p("company_phone");
      this.address = p("job_location");
      this.location = {
        lat: p("geolocation_lat", ""),
        lng: p("geolocation_long", "")
      };
      this.priceFrom = p("company_price_from");
      this.priceTo = p("company_price_to");
      this.website = p("company_website");
      if (this.website && !this.website.startsWith("http"))
        this.website = "http://" + this.website;
    }
    // this.amenityIDs = [...json.job_listing_amenity];

    this.mediaID = json.featured_media;
    if (this.mediaID > 0)
      this.mediaDataURL =
        "http://joinelectro.com/wp-json/wp/v2/media/" + this.mediaID;
  }

  static createFromForm(json) {
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
        geolocation_long: [json.location.lng], // may need to be converted to a string
      }
      // job_listing_amenity: (array of amenity numbers),
      // featured_media: (media id)
    };
  }
}
