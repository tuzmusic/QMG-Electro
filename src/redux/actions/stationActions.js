import { AsyncStorage } from "react-native";
import Station from "../../models/Station";

export function saveStations(stations) {
  const data = { stations, savedDate: new Date() };
  AsyncStorage.setItem("electro_stations", JSON.stringify(data));
}

export function updateStation(dispatch, station, key, value) {
  dispatch({ type: "UPDATE_STATION", station: { ...station, [key]: value } });
}

function results({ stations, error }) {
  return {
    type: "GET_STATIONS_" + (stations ? "SUCCESS" : "FAILURE"),
    stations,
    error
  };
}

export function f1() {
  return 1;
}

export function calls_f1() {
  f1();
}

export function fetchStations({ useCache, shouldDownload }) {
  return async dispatch => {
    dispatch({ type: "GET_STATIONS_START" });
    if (useCache) dispatch(results(await _getCachedStations()));
    if (shouldDownload) dispatch(results(await _downloadStations()));
  };
}

async function _getCachedStations() {
  try {
    const data = await AsyncStorage.getItem("electro_stations");
    if (data === null) return console.warn("requested key returns null");
    const stns = JSON.parse(data).stations;
    Object.values(stns).forEach(json => (stns[json.id] = new Station(json)));
    await _getImageURLsForAllStations(stns);
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
    // saveStations(stations);
  } catch (error) {
    console.warn(error);
    return { error };
  }
}

export async function _getImageURLsForAllStations(stations) {
  await Object.values(stations).forEach(
    async station => await getImageURLForStation(station)
  );
}

/* public */ export async function getImageURLForStation(station) {
  const updateAction = await _getImageURLForStation(station);
  return dispatch => {
    dispatch(updateAction);
  };
}

/* private */ export async function _getImageURLForStation(station) {
  if ((url = station.mediaDataURL)) {
    try {
      const res = await fetch(url);
      const json = await res.json();
      const imageURL = json.media_details.sizes.medium.source_url;
      return {
        type: "UPDATE_STATION",
        station: { ...station, imageURL }
      };
      // updateStation(dispatch, station, "imageURL", imageURL);
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
