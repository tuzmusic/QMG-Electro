class Station {
  constructor({
    fields,
    id,
    content,
    title,
    link,
    job_listing_amenity,
    _links
  }) {
    this.address = fields._job_location;
    this.website = fields._company_website;
    this.id = id;
    this.listingURL = link;
    this.content = content.rendered;
    this.title = title.rendered;
    this.amenityIDs = [...job_listing_amenity];
    this.tagline = fields._company_tagline;
    this.twitter = fields._company_twitter;
    this.mediaJSONurl = _links["wp:featuredmedia"]?[0].href;
  }
}
