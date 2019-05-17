// @flow
import Station from "../../src/models/Station";
import type { ElectroLocation, Action } from "../../flowTypes";
import type StationType from "../../src/models/Station";

const mockInfo = {
  content: "This is a charging station",
  address: "123 Fakeadress Lane, Some City, NW 12345",
  contactEmail: "email@electro.com",
  contactPhone: "321-555-1212",
  imageURL:
    "http://joinelectro.com/wp-content/uploads/2019/04/car-charging-300x300.jpg"
};

const stations: { [key: string]: Station } = {
  "1": new Station({
    id: "1",
    title: "Gavello Glen",
    location: { latitude: 37.3598896, longitude: -122.019102 },
    priceFrom: "10",
    priceTo: "50",
    ...mockInfo
  }),
  "2": new Station({
    id: "2",
    title: "De Anza Community College Transit Center",
    address: "6969 Cool Street",
    location: { latitude: 37.32246610000001, longitude: -122.0444706 },
    priceFrom: "10",
    priceTo: "50",
    ...mockInfo
  }),
  "3": new Station({
    id: "3",
    title: "Google Headquarters",
    address: "6969 Cool Street",
    location: {
      latitude: 37.4219999,
      longitude: -122.0840575
    },
    priceFrom: "10",
    priceTo: "50",
    ...mockInfo
  }),
  "4": new Station({
    id: "4",
    title: "Steven's Creek",
    address: "6969 Cool Street",
    location: { latitude: 37.3043165, longitude: -122.072954 },
    priceFrom: "10",
    priceTo: "50",
    ...mockInfo
  })
};
export default stations;
