import StationsMock from "../tests/mocks/StationsMock";
const searchText = "whatever"
const GoogleAPIKey = "BS_key"
const url =
  "/Users/TuzMacbookPro2017/Development/QMG-local/F8-Elements/tests/mocks/StationsMock.json";
  // "http://localhost:3000/stations";
const wpURL = "http://joinelectro.com/wp-json/wp/v2/job-listings/"

export function fetchStations() {
  return dispatch => {
    dispatch({ type: "GET_STATIONS_START" });
    fetch(wpURL)
      .then(res => {
        return res.json();
      })
      .then(json => {
        dispatch({ type: "GET_STATIONS_SUCCESS", payload: json });
      })
      .catch(error => {
        console.warn(error);
        dispatch({ type: "GET_STATIONS_FAILURE", payload: error });
      });
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
