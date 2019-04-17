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
    let stn = {};
    // API-friendly
    stn.title.rendered = json.title;
    stn.content.rendered = json.description;
    stn.fields._job_location = json.address
    stn.fields._company_tagline = json.tagline
    stn.fields._company_website = json["(website)"]
    stn.fields._company_tagline = json["(tagline)"]

    // stn.job_listing_amenity = (array of amenity numbers)
    // amenities: "60"

    // API-absent
    stn.closingTime = json.closingTime
    stn.contactEmail = json.contactEmail
    stn.contactPhone = json.contactPhone
    stn.openingTime = json.openingTime
    stn.priceFrom = json.priceFrom
    stn.priceTo = json.priceTo
    
  }
}
