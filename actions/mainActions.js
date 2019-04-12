import { AsyncStorage } from "react-native";
import StationsMock from "../tests/mocks/StationsMock";
const searchText = "whatever";
const GoogleAPIKey = "BS_key";
const url =
  "/Users/TuzMacbookPro2017/Development/QMG-local/F8-Elements/tests/mocks/StationsMock.json";
// "http://localhost:3000/stations";
const wpURL = "http://joinelectro.com/wp-json/wp/v2/job-listings/";

function getCachedStations() {
  AsyncStorage.getItem("bolt_fetched_stations")
    .then(data =>
      dispatch({ type: "GET_STATIONS_SUCCESS", payload: JSON.parse(data) })
    )
    .catch(error => {
      console.warn("Couldn't get cached stations:", error);
      dispatch({ type: "GET_STATIONS_FAILURE", payload: error });
    });
}

function downloadStations() {
  fetch(wpURL)
    .then(res => {
      return res.json();
    })
    .then(json => {
      const storage = { ...json, fetchedDate: new Date() };
      AsyncStorage.setItem("bolt_fetched_stations", JSON.stringify(storage));
      dispatch({ type: "GET_STATIONS_SUCCESS", payload: json });
    })
    .catch(error => {
      console.warn("Couldn't download stations:", error);
      dispatch({ type: "GET_STATIONS_FAILURE", payload: error });
    });
}

function save(json) {
  const storage = { stations: json, fetchedDate: new Date() };
  AsyncStorage.setItem("bolt_fetched_stations", JSON.stringify(storage));
}

export function fetchStations(useCache) {
  return dispatch => {
    dispatch({ type: "GET_STATIONS_START" });

    if (useCache) {
      AsyncStorage.getItem("bolt_fetched_stations")
        .then(data => {
          dispatch({
            type: "GET_STATIONS_SUCCESS",
            payload: JSON.parse(data).stations
          });
        })
        .catch(error => {
          console.warn("Couldn't get cached stations:", error);
          dispatch({ type: "GET_STATIONS_FAILURE", payload: error });
        });
    } else {
      fetch(wpURL)
        .then(res => {
          return res.json();
        })
        .then(json => {
          save(json);
          dispatch({ type: "GET_STATIONS_SUCCESS", payload: json });
        })
        .catch(error => {
          console.warn(error);
          dispatch({ type: "GET_STATIONS_FAILURE", payload: error });
        });
    }
  };
}

export function setCurrentStation(station) {
  return dispatch => {
    dispatch({ type: "SET_CURRENT_STATION", payload: station });
  };
}

export function setUserInQuestion(user) {
  return dispatch => {
    dispatch({ type: "SET_USER_IN_QUESTION", payload: user });
  };
}
