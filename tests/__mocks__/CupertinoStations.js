import Station from "../../src/models/Station";

export default (stations = {
  1: new Station({
    title: "De Anza Community College Transit Center",
    address: "6969 Cool Street",
    location: { lat: 37.32246610000001, lng: -122.0444706 }
  }),
  2: new Station({
    title: "Gavello Glen",
    address: "6969 Cool Street",
    location: { lat: 37.3598896, lng: -122.019102 }
  }),
  3: new Station({
    title: "Steven's Creek",
    address: "6969 Cool Street",
    location: { lat: 37.3043165, lng: -122.072954 }
  }),
  4: new Station({
    title: "Google Headquarters",
    address: "6969 Cool Street",
    location: {
      lat: 37.4219999,
      lng: -122.0840575
    }
  })
});
