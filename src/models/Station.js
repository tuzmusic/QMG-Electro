export default class Station {
  constructor(json) {
    // console.log("constructor for station", json.id);
    this.originalJSON = json;
    this.id = json.id;
    this.listingURL = json.link;
    this.content = json.content.rendered;
    this.title = json.title.rendered;
    if ((fields = json.fields)) {
      this.address = json.fields._job_location;
      this.tagline = json.fields._company_tagline;
      this.twitter = json.fields._company_twitter;

      this.website = json.fields._company_website;
      if (this.website && !this.website.startsWith("http"))
        this.website = "http://" + this.website;
    }
    // this.amenityIDs = [...json.job_listing_amenity];

    this.mediaID = json.featured_media;
    if (this.mediaID > 0)
      this.mediaDataURL =
        "http://joinelectro.com/wp-json/wp/v2/media/" + this.mediaID;
  }
}
