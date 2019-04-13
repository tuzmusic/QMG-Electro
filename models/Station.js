export default class Station {
  constructor(json) {
    this.originalJSON = json;
    this.id = json.id;
    this.listingURL = json.link;
    this.content = json.content.rendered;
    this.title = json.title.rendered;
    if ((fields = json.fields)) {
      this.address = json.fields._job_location;
      this.website = json.fields._company_website;
      this.tagline = json.fields._company_tagline;
      this.twitter = json.fields._company_twitter;
    }
    // this.amenityIDs = [...json.job_listing_amenity];

    if ((urls = json._links["wp:featuredmedia"])) {
      this.mediaJSONurl = urls[0].href;
    } else {
      this.mediaJSONurl = "no image provided";
    }
  }
}
