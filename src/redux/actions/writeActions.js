import Station from "../../models/Station";

export function createStation(json) {
  return dispatch => {
    const station = Station.createFromForm(json);
    dispatch({ type: "CREATE_STATION", payload: station });
  };
}
