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

  const departureAirport = airports.filter(airports => airports.codeIcaoAirport === departureValue);
  const destinationAirport = airports.filter(airports => airports.codeIcaoAirport === destinationValue);

  function getDistanceFromLatLonInNM(airport1, airport2) {
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
    return R * c; // Distance in NM
  }

  function findAirportsWithinDistance(airport, distance) {
    function getDistanceFromLatLonInNM2(airport1, airport2) {
      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }

      const lat1 = airport1[0].latitudeAirport;
      const lon1 = airport1[0].longitudeAirport;
      const lat2 = airport2.latitudeAirport;
      const lon2 = airport2.longitudeAirport;

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

    let airportsInRange = [];
    for (let i = 0; i < airports.length; i++) {
      if (getDistanceFromLatLonInNM2(airport, airports[i]) < distance) {
        airportsInRange.push(airports[i]);
      }
      setClosestAirports(...closestAirports,...[airportsInRange]);
    }

  }


  useEffect(() => {
    if (departureAirport.length !== 0 &&
      destinationAirport.length !== 0 &&
      departureValue.length === 4 &&
      destinationValue.length === 4) {
      setDistance(getDistanceFromLatLonInNM(departureAirport, destinationAirport).toFixed(0));
    }
    if (departureAirport.length === 0 || destinationAirport.length === 0) {
      setDistance(0);
    }
  }, [departureAirport, destinationAirport]);

  useEffect(() => {
    if (distance !== 0) {
      findAirportsWithinDistance(departureAirport, 200);
    }
  }, [distance]);

  useEffect(()=>{
    console.log(closestAirports);
  },[closestAirports])

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
    paddingLeft: 50,
    paddingRight: 50,
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

