import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import FormButton from "./formButton";
import { Context as LocationContext } from "../context/LocationContext";

const TrackForm = ({ onCapture }) => {
  const {
    state: { recording, locations, distance },
    startRecording,
    stopRecording
  } = useContext(LocationContext);
  return (
    <>
      {recording ? (
        <TouchableOpacity onPress={stopRecording}>
          <FormButton title={"STOP"} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={startRecording}>
          <FormButton title={"START"} />
        </TouchableOpacity>
      )}
      {!recording && locations.length && distance ? (
        <TouchableOpacity onPress={onCapture}>
          <FormButton title={"SAVE"} />
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({});

export default TrackForm;
