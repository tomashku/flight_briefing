import React, { useState, useEffect } from "react";
import { SafeAreaView, TextInput, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import airports from "../data/airports.json";
import AnimatedNumber from "react-native-animated-number";
import EStyleSheet from "react-native-extended-stylesheet";

const SearchBar = () => {

  const [departureValue, setDepartureValue] = useState();
  const [destinationValue, setDestinationValue] = useState();
  const [distance, setDistance] = useState(0);
  const [closestAirports, setClosestAirports] = useState([]);

  const departureAirport = airports.filter(airports => airports.ident === departureValue)[0];
  const destinationAirport = airports.filter(airports => airports.ident === destinationValue)[0];

  function getDistanceBetweenAirports(airport1, airport2) {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    const lat1 = airport1.latitude_deg;
    const lon1 = airport1.longitude_deg;
    const lat2 = airport2.latitude_deg;
    const lon2 = airport2.longitude_deg;

    const R = 3443.92; // Radius of the earth in NM
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in NM
  }

  function findClosestAirports(airport, distance) {
    for (let i = 0; i < airports.length; i++) {
      let tempAirport = airports[i];
      if (airport && getDistanceBetweenAirports(airport, airports[i]) < distance) {
        console.log(tempAirport.ident);
        setClosestAirports([...closestAirports, tempAirport]);
      }
    }
  }


  /*Distance between airports*/
  useEffect(() => {
    if (departureAirport && destinationAirport) {
      setDistance(getDistanceBetweenAirports(departureAirport, destinationAirport));
    }
    if (!departureAirport || !destinationAirport) {
      setDistance(0);
    }
  }, [destinationAirport, destinationAirport]);

  useEffect(() => {
    findClosestAirports(departureAirport, 60);
    console.log(closestAirports);
  }, [departureAirport]);




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
      <AnimatedNumber value={distance} time={50} style={styles.distanceText} />
      <TextInput
        placeholder={"DST"}
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
    flex: 0.07,
    minHeight: 60,
    justifyContent: "center",
    borderColor: "lightblue",
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputText: {
    width: "30%",
    height: 30,
    fontSize: 20,
    textAlign: "center",
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "lightblue",
  },
  distanceText: {
    width: "30%",
    minWidth: 100,
    textAlign: "center",
    fontSize: 16,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "lightblue",
  },
});

export default SearchBar;

