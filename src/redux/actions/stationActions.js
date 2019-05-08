import { AsyncStorage } from "react-native";
import Station from "../../models/Station";

export function saveStations(stations) {
  const data = { stations, savedDate: new Date() };
  AsyncStorage.setItem("electro_stations", JSON.stringify(data));
}

export function updateStation(dispatch, station, key, value) {
  dispatch({ type: "UPDATE_STATION", station: { ...station, [key]: value } });
}

export function fetchStations({ useCache, shouldDownload }) {
  return async dispatch => {
    dispatch({ type: "GET_STATIONS_START" });
    if (useCache) {
      // console.log("Getting cached stations");
      const { stations, error } = await _getCachedStations();
      if (stations) {
        // console.log(`Loaded ${Object.keys(stations).length} stations`);
        dispatch({ type: "GET_STATIONS_SUCCESS", stations });
      } else if (error) {
        dispatch({ type: "GET_STATIONS_FAILURE", error });
      }
    }
    if (shouldDownload) {
      console.log("Downloading stations");
      const { stations, error } = await _downloadStations();
      if (stations) {
        console.log(`Downloaded ${Object.keys(stations).length} stations`);
        dispatch({ type: "GET_STATIONS_SUCCESS", stations });
      } else if (error) {
        console.warn("Couldn't download stations:", error);
        dispatch({ type: "GET_STATIONS_FAILURE", error });
      }
    }
  };
}

async function _getCachedStations() {
  try {
    const data = await AsyncStorage.getItem("electro_stations");
    if (data === null) return console.log("requested key returns null");
    const stns = JSON.parse(data).stations;
    Object.values(stns).forEach(json => (stns[json.id] = new Station(json)));
    return { stations: stns };
  } catch (error) {
    return { error };
  }
}

// async function _downloadStations(dispatch, attempt = 0) {
async function _downloadStations() {
  const url = "http://joinelectro.com/wp-json/wp/v2/job-listings/";
  try {
    const res = await fetch(url);
    const json = await res.json();
    const stations = Object.assign(
      {},
      ...json.map(s => ({ [s.id]: Station.createFromApiResponse(s) }))
    );
    _getImageURLsForAllStations(stations);
    return { stations };
    // saveStations(stations);
  } catch (error) {
    console.warn(error)
    return { error };
  }
}

function _getImageURLsForAllStations(stations) {
  Object.values(stations).forEach(station => _getImageURLForStation(station));
}

/* public */ export function getImageURLForStation(station) {
  return async dispatch => {
    const updateAction = await _getImageURLForStation(station);
    console.log(updateAction.type);
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
