import { AsyncStorage } from "react-native";
import Station from "../../models/Station";

function results({ stations, error }) {
  return {
    type: "GET_STATIONS_" + (stations ? "SUCCESS" : "FAILURE"),
    stations,
    error
  };
}

export function fetchStations({ useCache, shouldDownload }) {
  return async dispatch => {
    if (!useCache && !shouldDownload) return
    dispatch({ type: "GET_STATIONS_START" });
    if (useCache) dispatch(results(await _getCachedStations()));
    if (shouldDownload) {
      dispatch(results(await _downloadStations()));
      dispatch({ type: "SAVE_STATIONS" });
    }
  };
}

async function _getCachedStations() {
  try {
    const data = await AsyncStorage.getItem("electro_stations");
    if (data === null) return console.warn("requested key returns null");
    const stns = JSON.parse(data).stations;
    Object.values(stns).forEach(json => (stns[json.id] = new Station(json)));
    return { stations: stns };
  } catch (error) {
    return { error };
  }
}

// async function _downloadStations(dispatch, attempt = 0) {
export async function _downloadStations() {
  const url = "http://joinelectro.com/wp-json/wp/v2/job-listings/";
  try {
    const res = await fetch(url);
    const json = await res.json();
    const stations = Object.assign(
      {},
      ...json.map(s => ({ [s.id]: Station.createFromApiResponse(s) }))
    );
    return { stations };
  } catch (error) {
    console.warn(error);
    return { error };
  }
}

export function _getImageURLsForAllStations(stations) {
  Object.values(stations).forEach(station => getImageURLForStation(station));
}

/* public */ export function getImageURLForStation(station) {
  return dispatch => {
    _getImageURLForStation(dispatch, station);
  };
}

/* private */ export async function _getImageURLForStation(dispatch, station) {
  if ((url = station.mediaDataURL)) {
    try {
      const res = await fetch(url);
      const json = await res.json();
      const imageURL = json.media_details.sizes.medium.source_url;
      dispatch({
        type: "UPDATE_STATION",
        station: { ...station, imageURL }
      });
      dispatch({ type: "SAVE_STATIONS" });
    } catch (error) {
      console.warn(error);
    }
  }
}

export function setCurrentStationID(id) {
  return dispatch => {
    dispatch({ type: "SET_CURRENT_STATION", stationID: id });
  };
}

export function createStation(formData) {
  return async dispatch => {
    const station = new Station(formData);
    try {
      // const returnedStation = await postStationToApi(station);
      await dispatch({ type: "CREATE_STATION", station }); // will eventually be dispatching returnedStation
      dispatch({ type: "SAVE_STATIONS" });
      return station;
    } catch (error) {
      dispatch({ type: "CREATE_STATION_ERROR", error });
    }
  };
}

export function deleteStation(station) {
  return dispatch => {
    dispatch({ type: "DELETE_STATION", station });
    dispatch({ type: "SAVE_STATIONS" });
  };
}

function _postStationToApi(station) {
  const apiFriendlyStation = Station.createForApiPost(station);
  // POST apiFriendlyStation to API
  fetch("url")
    .then(res => res.json())
    .then(json => {
      return json; // this may not be quite right...
    })
    .catch(error => {
      return error;
    });
}
