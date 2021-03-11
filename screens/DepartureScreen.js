import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import SearchBar from "../Components/SearchBar";

const RouteScreen = () => {

  return (
    <SafeAreaView style={styles.alignment}>
      <Text style={styles.textStyle}>Departure Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
  },
  alignment: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default RouteScreen;
