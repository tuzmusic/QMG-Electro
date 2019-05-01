import { AsyncStorage } from "react-native";
import Station from "../../models/Station";

function saveStations(json) {
  const data = { stations: json, fetchedDate: new Date() };
  AsyncStorage.setItem("electro_stations", JSON.stringify(data));
}

function updateStation(dispatch, station, key, value) {
  dispatch({ type: "UPDATE_STATION", payload: { ...station, [key]: value } });
}

function stationsFromHashes(hashes) {
  let stations = {};
  hashes.forEach(
    hash => (stations[hash.id] = Station.createFromApiResponse(hash))
  );
  return stations;
}

function downloadStations(dispatch, attempt = 0) {
  console.log("Downloading stations");
  fetch("http://joinelectro.com/wp-json/wp/v2/job-listings/")
    .then(res => res.json())
    .then(async json => {
      const stations = stationsFromHashes(json);
      await getImagesForAllStations(dispatch, stations);
      saveStations(stations);
      dispatch({ type: "GET_STATIONS_SUCCESS", payload: stations });
    })
    .catch(error => {
      console.warn("Couldn't download stations:", error);
      dispatch({ type: "GET_STATIONS_FAILURE", payload: error });
      if (attempt < 2) getCachedStations(dispatch, attempt + 1);
    });
}

async function getCachedStations(dispatch, attempt = 0) {
  console.log("Getting cached stations");
  try {
    const data = await AsyncStorage.getItem("electro_stations");
    const stations = JSON.parse(data).stations;
    dispatch({ type: "GET_STATIONS_SUCCESS", payload: stations });
    // downloadStations(dispatch, 2); // after getting cached stations, update station list
    // TO-DO: show user that we're updating.
  } catch (error) {
    debugger
    console.log("Couldn't get cached stations:", error);
    dispatch({ type: "GET_STATIONS_FAILURE", payload: error });
    // if (attempt < 2) downloadStations(dispatch, attempt + 1);
  }
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
        // console.log(
        //   `medium imageURL for station #${station.id}: ${imageURL}`
        // );
        updateStation(dispatch, station, "imageURL", imageURL);
      })
      .catch(error => console.warn(error));
  }
}

export function fetchStations({ useCache, shouldDownload }, attempt = 0) {
  return async dispatch => {
    dispatch({ type: "GET_STATIONS_START" });

    if (useCache) {
      await getCachedStations(dispatch, attempt);
      if (shouldDownload) downloadStations(dispatch, 2)
    } else if (shouldDownload) {
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
