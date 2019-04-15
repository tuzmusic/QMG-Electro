const stations = {
  id: 850,
  date: "2019-04-11T12:08:58",
  date_gmt: "2019-04-11T12:08:58",
  guid: {
    rendered: "http://example.com/listings/a-sample-listing/"
  },
  modified: "2019-04-11T12:12:07",
  modified_gmt: "2019-04-11T12:12:07",
  slug: "a-sample-listing",
  status: "publish",
  type: "job_listing",
  link: "http://example.com/listings/a-sample-listing/",
  title: {
    rendered: "A Sample Listing"
  },
  content: {
    rendered: "<p>Description of this listing that I typed, for real.</p> ",
    protected: false
  },
  featured_media: 0,
  comment_status: "open",
  ping_status: "closed",
  template: "",
  meta: [],
  job_categories: [60],
  job_types: [],
  job_listing_amenity: [61, 65],
  job_listing_region: [31],
  job_listing_tag: [],
  fields: {
    _job_location: "1600 Pennsylvania Ave NW, Washington, DC",
    _application: "",
    _company_name: "",
    _company_website: "http://www.whatever.com",
    _company_tagline: "Awesome tagline",
    _company_twitter: "twitter.com/123456",
    _company_video: "",
    _filled: false
  },
  _links: {
    self: [
      {
        href: "http://example.com/wp-json/wp/v2/job_listings/850"
      }
    ],
    collection: [
      {
        href: "http://example.com/wp-json/wp/v2/job_listings"
      }
    ],
    about: [
      {
        href: "http://example.com/wp-json/wp/v2/types/job_listing"
      }
    ],
    replies: [
      {
        embeddable: true,
        href: "http://example.com/wp-json/wp/v2/comments?post=850"
      }
    ],
    wp_attachment: [
      {
        href: "http://example.com/wp-json/wp/v2/media?parent=850"
      }
    ],
    wp_term: [
      {
        taxonomy: "job_listing_category",
        embeddable: true,
        href: "http://example.com/wp-json/wp/v2/job_categories?post=850"
      },
      {
        taxonomy: "job_listing_type",
        embeddable: true,
        href: "http://example.com/wp-json/wp/v2/job_types?post=850"
      },
      {
        taxonomy: "job_listing_amenity",
        embeddable: true,
        href:
          "http://example.com/wp-json/wp/v2/job_listing_amenity?post=850"
      },
      {
        taxonomy: "job_listing_region",
        embeddable: true,
        href: "http://example.com/wp-json/wp/v2/job_listing_region?post=850"
      },
      {
        taxonomy: "job_listing_tag",
        embeddable: true,
        href: "http://example.com/wp-json/wp/v2/job_listing_tag?post=850"
      }
    ],
    curies: [
      {
        name: "wp",
        href: "https://api.w.org/{rel}",
        templated: true
      }
    ]
  }
};
