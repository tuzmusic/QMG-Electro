export default class Station {
  constructor(json) {
    this.originalJSON = json
    this.address = json.fields._job_location;
    this.website = json.fields._company_website;
    this.id = json.id;
    this.listingURL = json.link;
    this.content = json.content.rendered;
    this.title = json.title.rendered;
    this.amenityIDs = [...json.job_listing_amenity];
    this.tagline = json.fields._company_tagline;
    this.twitter = json.fields._company_twitter;
    this.mediaJSONurl = "no image provided";
    if ((urls = json._links["wp:featuredmedia"]))
      this.mediaJSONurl = urls[0].href;
  }
}
