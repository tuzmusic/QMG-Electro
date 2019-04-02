const initialState = { currentStation: null, currentRegion: null, isLoading: false }

export default mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATION':
      return {...state, currentStation: action.payload.station}
  
    default:
      return state
  }
} 