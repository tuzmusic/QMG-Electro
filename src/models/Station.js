import uuid from "react-native-uuid";

export default class Station {
  constructor(json) {
    function p(propName) {
      console.log(propName);
      return json.listing_props[`_${propName}`][0]
    }
    // base fields
    this.originalJSON = json;
    this.id = json.id;
    this.listingURL = json.link;
    if (json.listing_props) {
      this.title = p("job_title")
      this.content = p("job_description")
      this.contactEmail = p("company_email")
      this.contactPhone = p("company_phone")
      this.address = p("job_location")
      // this.title = p._job_title[0];
      // this.content = p._job_description[0];
      // this.contactEmail = p._company_email[0];
      // this.contactPhone = p._company_phone[0];
      // this.address = p._job_location[0];
      this.location = {
        latitude: p.geolocation_lat[0],
        longitude: p.geolocation_long[0]
      };
      this.priceFrom = p._company_price_from[0];
      this.priceTo = p._company_price_to[0];
      this.website = p._company_website[0];
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
      // API-friendly
      originalJSON: json,
      id: uuid.v1(), // ultimately this may need to be a string
      title: { rendered: json.title },
      content: {
        rendered: `<p>${json.content}</p>`
      },
      fields: {
        _job_location: json.address,
        _company_tagline: json.tagline,
        _company_website: json.website
      },
      // job_listing_amenity: (array of amenity numbers),
      // featured_media: (media id)

      // API-absent
      closingTime: json.closingTime,
      contactEmail: json.contactEmail,
      contactPhone: json.contactPhone,
      openingTime: json.openingTime,
      priceFrom: json.priceFrom,
      priceTo: json.priceTo
    };
  }
}
