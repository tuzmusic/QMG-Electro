import StationsMock from "../tests/mocks/StationsMock";

export function fetchStations() {
  return { type: "GET_STATIONS", payload: StationsMock.stations };
}
