import createDataContext from "./createDataContext";
import { ADD_CURRENT_LOCATION, STOP_RECORDING, START_RECORDING, ADD_LOCATION, CHANGE_NAME } from './types';
const locationReducer = (state, action) => {
   switch (action.type) {
      case ADD_CURRENT_LOCATION:
         return { ...state, currentLocation: action.payload }
      case START_RECORDING:
         return { ...state, recording: true }
      case STOP_RECORDING:
         return { ...state, recording: false }
      case ADD_LOCATION:
         return { ...state, locations: [...state.locations, action.payload] }
      case CHANGE_NAME:
         return { ...state, name: action.payload }
      default:
         return state;
   }
};

const changeTrackName = dispatch => name => {
   dispatch({ type: CHANGE_NAME, payload: name })
}

const addLocation = dispatch => (location, recording) => {
   dispatch({ type: ADD_CURRENT_LOCATION, payload: location })
   if (recording) {
      dispatch({ type: ADD_LOCATION, payload: location })
   }
};
const startRecording = dispatch => () => {
   dispatch({ type: START_RECORDING })
};
const stopRecording = dispatch => () => {
   dispatch({ type: STOP_RECORDING })
};

export const { Context, Provider } = createDataContext(
   locationReducer,
   { changeTrackName, addLocation, startRecording, stopRecording },
   { name: '', locations: [], recording: false, currentLocation: null }
);
