import { AsyncStorage } from "react-native";
import Station from "../models/Station";

function getCachedStations(dispatch, attempt = 0) {
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
      if (attempt < 2) downloadStations(dispatch, attempt + 1);
    });
}

function downloadStations(dispatch, attempt = 0) {
  fetch("http://joinelectro.com/wp-json/wp/v2/job-listings/")
    .then(res => {
      return res.json();
    })
    .then(json => {
      const stations = json.map(hash => new Station(hash));
      save(stations);
      dispatch({ type: "GET_STATIONS_SUCCESS", payload: stations });
    })
    .catch(error => {
      console.warn(error);
      dispatch({ type: "GET_STATIONS_FAILURE", payload: error });
      if (attempt < 2) getCachedStations(dispatch, attempt + 1);
    });
}

function save(json) {
  const storage = { stations: json, fetchedDate: new Date() };
  AsyncStorage.setItem("bolt_fetched_stations", JSON.stringify(storage));
}

export function fetchStations(useCache, attempt = 0) {
  return dispatch => {
    dispatch({ type: "GET_STATIONS_START" });

    if (useCache) {
      getCachedStations(dispatch);
    } else {
      downloadStations(dispatch);
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
