import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { colors, fonts, padding, margin } from "../styles/base";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";
import FormInput from "../components/FormInput";
const TrackSaveScreen = () => {
  const {
    state: { name },
    changeTrackName
  } = useContext(LocationContext);
  const [saveTrack] = useSaveTrack();
  const submit = () => {
    changeTrackName();
    saveTrack();
  };
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <View style={styles.inner}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}> Save my track </Text>
        </View>
        <FormInput
          buttonTitle="SAVE"
          holderValue="My Track name"
          inputValue={name}
          handleChange={changeTrackName}
          submitValue={submit}
        />
      </View>
    </SafeAreaView>
  );
};
TrackSaveScreen.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: colors.primaryBgColor
  },
  title: {
    padding: padding.lg,
    fontFamily: fonts.primary,
    color: colors.primary,
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
    opacity: 0.8
  }
});
export default TrackSaveScreen;
