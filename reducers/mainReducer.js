import StationsMock from "../tests/mocks/StationsMock";

const initialState = {
  stations: [],
  isLoading: false,
  error: null,
  currentRegion: null
};

export default (mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STATIONS_START":
      return { ...state, isLoading: true };
    case "GET_STATIONS_SUCCESS":
      return { ...state, stations: action.payload, isLoading: false };
    case "GET_STATIONS_FAILURE":
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
});
