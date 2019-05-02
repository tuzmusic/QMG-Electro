import { AsyncStorage } from "react-native";

const initialState = {
  stations: [], // should be {}, but that doesn't work currently, for some buried reason. This isn't doing any harm.
  currentStationID: null,
  userInQuestion: null,
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
    case "SET_CURRENT_STATION":
      return { ...state, currentStationID: action.payload };
    case "SET_USER_IN_QUESTION":
      return { ...state, userInQuestion: action.payload };
    case "CREATE_STATION":
      const newStations = {
        ...state.stations,
        [action.payload.id]: action.payload
      };
      return { ...state, stations: newStations };
    case "UPDATE_STATION":
      return {
        ...state,
        stations: { ...state.stations, [action.payload.id]: action.payload }
      };
    case "DELETE_STATION":
      const clonedStations = { ...state.stations };
      delete clonedStations[action.payload.id];
      return { ...state, stations: clonedStations };
    case "SAVE_STATIONS":
      console.log("Saving stations to storage");
      const data = { stations: state.stations, savedDate: new Date() };
      const storageString = JSON.stringify(data);
      AsyncStorage.setItem("electro_stations", storageString)
        .then(() => {
          // debugger;
        })
        .catch(() => {
          // debugger;
        });
      return state;
    default:
      return state;
  }
});
