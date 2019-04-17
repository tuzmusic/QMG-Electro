import uuid from "react-native-uuid";

export default class Station {
  constructor(json) {
    // console.log("constructor for station", json.id);
    this.originalJSON = json;
    this.id = json.id;
    this.listingURL = json.link;
    this.content = json.content.rendered;
    this.title = json.title.rendered;
    if ((fields = json.fields)) {
      this.address = fields._job_location;
      this.tagline = fields._company_tagline;
      this.twitter = fields._company_twitter;

      this.website = fields._company_website;
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
        rendered: `<p>
        ${json.content}
      </p>`
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
