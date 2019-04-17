import Station from "../../models/Station";

export function createStation(json) {
  return dispatch => {
    console.log("creating station");
    const station = Station.createFromForm(json);
    console.log("Station:", station);
    dispatch({ type: "CREATE_STATION", payload: station });
  };
}
