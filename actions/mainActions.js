import { AsyncStorage } from "react-native";
import Station from "../models/Station";

function save(json) {
  const storage = { stations: json, fetchedDate: new Date() };
  AsyncStorage.setItem("bolt_fetched_stations", JSON.stringify(storage));
}

function updateStation(dispatch, station, key, value) {
  dispatch({ type: "UPDATE_STATION", payload: { ...station, [key]: value } });
}

function downloadStations(dispatch, attempt = 0) {
  console.log("Downloading stations");
  fetch("http://joinelectro.com/wp-json/wp/v2/job-listings/")
    .then(res => res.json())
    .then(async json => {
      let stations = {};
      json.forEach(hash => (stations[hash.id] = new Station(hash)));
      await getImagesForAllStations(dispatch, stations);
      save(stations);
      dispatch({ type: "GET_STATIONS_SUCCESS", payload: stations });
    })
    .catch(error => {
      console.warn("Couldn't download stations:", error);
      dispatch({ type: "GET_STATIONS_FAILURE", payload: error });
      if (attempt < 2) getCachedStations(dispatch, attempt + 1);
    });
}

function getCachedStations(dispatch, attempt = 0) {
  console.log("Getting cached stations");
  AsyncStorage.getItem("bolt_fetched_stations")
    .then(data => {
      dispatch({
        type: "GET_STATIONS_SUCCESS",
        payload: JSON.parse(data).stations
      });
      downloadStations(dispatch, 2); // after getting cached stations, update station list
      // TO-DO: show user that we're updating.
    })
    .catch(error => {
      console.warn("Couldn't get cached stations:", error);
      dispatch({ type: "GET_STATIONS_FAILURE", payload: error });
      if (attempt < 2) downloadStations(dispatch, attempt + 1);
    });
}

function getImagesForAllStations(dispatch, stations) {
  Object.keys(stations).forEach(key =>
    _getImageForStation(dispatch, stations[key])
  );
}

export function getImageForStation(station) {
  return dispatch => {
    _getImageForStation(dispatch, station);
  };
}

function _getImageForStation(dispatch, station) {
  if ((url = station.mediaDataURL)) {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        const imageURL = json.media_details.sizes.medium.source_url;
        console.log(
          `medium imageURL for station #${station.id}: ${imageURL}`
        );
        updateStation(dispatch, station, "imageURL", imageURL);
      })
      .catch(error => console.warn(error));
  }
}

export function fetchStations(useCache, attempt = 0) {
  return dispatch => {
    dispatch({ type: "GET_STATIONS_START" });

    if (useCache) {
      getCachedStations(dispatch, attempt);
    } else {
      downloadStations(dispatch, attempt);
    }
  };
}

export function setCurrentStationID(id) {
  return dispatch => {
    dispatch({ type: "SET_CURRENT_STATION", payload: id });
  };
}

export function setUserInQuestion(user) {
  return dispatch => {
    dispatch({ type: "SET_USER_IN_QUESTION", payload: user });
  };
}
