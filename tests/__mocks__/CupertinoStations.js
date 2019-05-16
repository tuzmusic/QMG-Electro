import Station from "../../src/models/Station";
/* 
// @flow
import type { ElectroLocation, Action } from "../../flowTypes";
import type StationType from "../../src/models/Station";

import Station from "../../src/models/Station";

const stations: { [string | number]: StationType } = {
  "1": new Station(),
  "2": new Station(),
  "3": new Station(),
  "4": new Station()
};
(stations["1"].title = "De Anza Community College Transit Center"),
  (stations["1"].address = "6969 Cool Street"),
  (stations["1"].location = {
    latitude: 37.32246610000001,
    longitude: -122.0444706
  });
(stations["2"].title = "Gavello Glen"),
  (stations["2"].address = "6969 Cool Street"),
  (stations["2"].location = { latitude: 37.3598896, longitude: -122.019102 });
(stations["3"].title = "Steven's Creek"),
  (stations["3"].address = "6969 Cool Street"),
  (stations["3"].location = { latitude: 37.3043165, longitude: -122.072954 });
(stations["4"].title = "Google Headquarters"),
  (stations["4"].address = "6969 Cool Street"),
  (stations["4"].location = { latitude: 37.4219999, longitude: -122.0840575 });

export default stations;
 */
export default (stations = {
  1: new Station({
    title: "Gavello Glen",
    address: "6969 Cool Street",
    location: { latitude: 37.3598896, longitude: -122.019102 }
  }),
  2: new Station({
    title: "De Anza Community College Transit Center",
    address: "6969 Cool Street",
    location: { latitude: 37.32246610000001, longitude: -122.0444706 }
  }),
  3: new Station({
    title: "Google Headquarters",
    address: "6969 Cool Street",
    location: {
      latitude: 37.4219999,
      longitude: -122.0840575
    }
  }),
  4: new Station({
    title: "Steven's Creek",
    address: "6969 Cool Street",
    location: { latitude: 37.3043165, longitude: -122.072954 }
  })
});
