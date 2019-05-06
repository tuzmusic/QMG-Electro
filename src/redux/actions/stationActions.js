import { AsyncStorage } from "react-native";
import Station from "../../models/Station";

export function saveStations(stations) {
  const data = { stations, savedDate: new Date() };
  AsyncStorage.setItem("electro_stations", JSON.stringify(data));
}

export function updateStation(dispatch, station, key, value) {
  dispatch({ type: "UPDATE_STATION", station: { ...station, [key]: value } });
}

export function fetchStations({ useCache, shouldDownload }, attempt = 0) {
  return async dispatch => {
    dispatch({ type: "GET_STATIONS_START" });
    if (useCache) {
      console.log("Getting cached stations");
      const { stations: cachedStations, error } = await _getCachedStations();
      if (cachedStations) {
        dispatch({ type: "GET_STATIONS_SUCCESS", stations: cachedStations });
      } else if (error) {
        dispatch({ type: "GET_STATIONS_FAILURE", error });
      }
    }
    if (shouldDownload) {
      console.log("Couldn't get cached stations:", error);
      _downloadStations(dispatch, useCache ? 2 : attempt);
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

function _downloadStations(dispatch, attempt = 0) {
  console.log("Downloading stations");
  fetch("http://joinelectro.com/wp-json/wp/v2/job-listings/")
    .then(res => res.json())
    .then(async json => {
      const stations = Object.assign(
        {},
        ...json.map(s => ({ [s.id]: Station.createFromApiResponse(s) }))
      );
      await _getImagesForAllStations(dispatch, stations);
      console.log(`Downloaded ${Object.keys(stations).length} stations`);
      dispatch({ type: "GET_STATIONS_SUCCESS", stations });
      saveStations(stations);
    })
    .catch(error => {
      console.warn("Couldn't download stations:", error);
      dispatch({ type: "GET_STATIONS_FAILURE", error });
      if (attempt < 2) _getCachedStations(dispatch, attempt + 1);
    });
}

function _newStations(oldStations, newStations) {
  let newCount = 0;
  Object.keys(newStations).forEach(id => {
    if (!oldStation[id]) newCount++;
  });
  return newCount;
}

function _getImagesForAllStations(dispatch, stations) {
  Object.values(stations).forEach(station =>
    _getImageForStation(dispatch, station)
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
        updateStation(dispatch, station, "imageURL", imageURL);
      })
      .catch(error => console.warn(error));
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
