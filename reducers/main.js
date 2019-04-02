const initialState = { stations: [], currentRegion: null, isLoading: false };

export default (mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STATIONS":
      return { ...state, stations: action.payload.stations, isLoading: false };

    default:
      return state;
  }
});
