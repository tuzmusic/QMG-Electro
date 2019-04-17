import Station from "../../models/Station";

export function createStation(formData) {
  return dispatch => {
    const apiFriendlyStation = Station.createFromForm(formData);
    // POST apiFriendlyStation to API
    // this should return an API-friendly station
    // then we'll convert that back to a station object
    const station = new Station(apiFriendlyStation)
    // (or update any fields on the existing object)
    // and dispatch that station object inside the fetch's "then"

    dispatch({ type: "CREATE_STATION", payload: station });
  };
}
