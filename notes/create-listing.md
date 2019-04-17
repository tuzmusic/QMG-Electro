# Create Listing To-Dos

- Post new listing to API
- Form validations
- Show success/failure to the user
- Amenities (checkboxes or dropdown or modal with checkboxes...)
  - Fetch job amenity types from http://joinelectro.com/wp-json/wp/v2/job_listing_amenity
- Image(s)
  - Choose or take photo
  - Upload to server
  - Get reference (url)
  - Update station with media ID
- Location
  - Get long/lat when creating, save to object.
  - There's the matter of getting location for existing stations too, but, since this won't be an issue in production, this part should actually wait.