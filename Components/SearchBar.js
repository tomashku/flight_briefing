import React, { useState, useEffect } from "react";
import { SafeAreaView, TextInput, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import airports from "../data/airports.json";

const SearchBar = () => {

  const [departureValue, setDepartureValue] = useState();
  const [destinationValue, setDestinationValue] = useState();
  const [distance, setDistance] = useState(0);

  const departureAirport = airports.filter(airports => airports.codeIcaoAirport === departureValue);
  const destinationAirport = airports.filter(airports => airports.codeIcaoAirport === destinationValue);

  function getDistanceFromLatLonInKm(airport1, airport2) {

    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    const lat1 = airport1[0].latitudeAirport;
    const lon1 = airport1[0].longitudeAirport;
    const lat2 = airport2[0].latitudeAirport;
    const lon2 = airport2[0].longitudeAirport;

    const R = 3443.92; // Radius of the earth in NM
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in NM
    return d;
  }

  useEffect(() => {
    if (departureAirport.length !== 0 &&
      destinationAirport.length !== 0 &&
      departureValue.length === 4 &&
      destinationValue.length === 4) {
      setDistance(getDistanceFromLatLonInKm(departureAirport, destinationAirport).toFixed(0));
    }
  }, [departureAirport, destinationAirport]);

  return <SafeAreaView style={styles.container}>
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={"DEP"}
        style={styles.inputText}
        autoCapitalize={"characters"}
        maxLength={4}
        autoCorrect={false}
        value={departureValue}
        onChangeText={text => setDepartureValue(text)}
      >
      </TextInput>
      <Text style={styles.distanceText}>{distance} NM</Text>
      <TextInput
        placeholder={"DEST"}
        style={styles.inputText}
        autoCapitalize={"characters"}
        maxLength={4}
        autoCorrect={false}
        value={destinationValue}
        onChangeText={text => setDestinationValue(text)}
      >
      </TextInput>
    </View>
  </SafeAreaView>;
};


const styles = StyleSheet.create({
  container: {
    flex: 0.06,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputText: {
    flex: 0.2,
    height: 30,
    fontSize: 20,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
  },
  distanceText: {
    flex: 0.3,
    textAlign: "center",
    fontSize: 16,

  },
  button: {
    flex: 1,
    height: 30,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "gray",

  },

});

export default SearchBar;
