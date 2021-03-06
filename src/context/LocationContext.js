import createDataContext from "./createDataContext";
import { getDistance } from "geolib";
import {
  TAKE_SNAPSHOT,
  ADD_CURRENT_LOCATION,
  STOP_RECORDING,
  START_RECORDING,
  ADD_LOCATION,
  CHANGE_NAME,
  RESET,
  RECORD_DISTANCE,
  SAVE_TIME
} from "./types";

const locationReducer = (state, action) => {
  switch (action.type) {
    case ADD_CURRENT_LOCATION:
      return { ...state, currentLocation: action.payload };
    case START_RECORDING:
      return { ...state, recording: true, timerClear: false };
    case STOP_RECORDING:
      return { ...state, recording: false };
    case ADD_LOCATION:
      const coords = {
        latitude: action.payload.coords.latitude,
        longitude: action.payload.coords.longitude
      };

      const dist = getDistance(
        {
          latitude: state.initialLocation.coords.latitude,
          longitude: state.initialLocation.coords.latitude
        },
        {
          latitude: action.payload.coords.latitude,
          longitude: action.payload.coords.latitude
        }
      );
      return {
        ...state,
        locations: [...state.locations, coords],
        distance: dist
      };
    case CHANGE_NAME:
      return { ...state, name: action.payload };
    case RESET:
      return { ...state, name: "", locations: [], distance: 0 };
    case RECORD_DISTANCE:
      return { ...state, initialLocation: action.payload };
    case TAKE_SNAPSHOT:
      return {
        ...state,
        snapShot: action.payload,
        timerClear: true
      };
    case SAVE_TIME:
      return { ...state, timeElapsed: action.payload };
    default:
      return state;
  }
};

const takeSnapShot = dispatch => uri => {
  dispatch({ type: TAKE_SNAPSHOT, payload: uri });
};
const changeTrackName = dispatch => name => {
  dispatch({ type: CHANGE_NAME, payload: name });
};
const saveTime = dispatch => timer => {
  dispatch({ type: SAVE_TIME, payload: timer });
};
const getUIDistance = dispatch => location => {
  dispatch({ type: RECORD_DISTANCE, payload: location });
};
const addLocation = dispatch => (location, recording) => {
  dispatch({ type: ADD_CURRENT_LOCATION, payload: location });
  if (recording) {
    dispatch({ type: ADD_LOCATION, payload: location });
  }
};
const startRecording = dispatch => () => {
  dispatch({ type: START_RECORDING });
};
const stopRecording = dispatch => () => {
  dispatch({ type: STOP_RECORDING });
};
const reset = dispatch => () => {
  dispatch({ type: RESET });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  {
    saveTime,
    changeTrackName,
    addLocation,
    startRecording,
    stopRecording,
    reset,
    getUIDistance,
    takeSnapShot
  },
  {
    timeElapsed: "",
    timerClear: false,
    distance: 0,
    snapShot: "",
    initialLocation: {},
    name: "",
    locations: [],
    recording: false,
    currentLocation: null
  }
);
