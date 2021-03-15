import React, { useState, useEffect } from "react";
import { SafeAreaView, TextInput, StyleSheet, View, Keyboard } from "react-native";
import airports from "../../data/airports.json";
import AnimatedNumber from "react-native-animated-number";
import Navigation from "./Navigation";


const SearchBar = () => {

  const offTrackDistance = 80;

  const [departureInputValue, setDepartureValue] = useState();
  const [destinationInputValue, setDestinationValue] = useState();

  const [departureAirport, setDepartureAirport] = useState();
  const [destinationAirport, setDestinationAirport] = useState();

  const [distance, setDistance] = useState(0);

  const [closestDepartureAirports, setClosestDepartureAirports] = useState([]);
  const [closestDestinationAirports, setClosestDestinationAirports] = useState([]);

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

  function findClosestDepartureAirports(airport, distance) {
    let airportsArray = [];
    for (let i = 0; i < airports.length; i++) {
      let tempAirport = airports[i];
      if (departureAirport && getDistanceBetweenAirports(airport, tempAirport) < distance &&
        tempAirport.scheduled_service === "yes" &&
        (tempAirport.type === "medium_airport" ||
          tempAirport.type === "large_airport"
        )) {
        airportsArray.push(tempAirport);
      }
    }
    setClosestDepartureAirports(...closestDepartureAirports, airportsArray);
  }

  function findClosestDestinationAirports(airport, distance) {

    let airportsArray = [];
    for (let i = 0; i < airports.length; i++) {
      let tempAirport = airports[i];
      if (destinationAirport && getDistanceBetweenAirports(airport, tempAirport) < distance &&
        tempAirport.scheduled_service === "yes" &&
        (tempAirport.type === "medium_airport" ||
          tempAirport.type === "large_airport"
        )) {
        airportsArray.push(tempAirport);
      }
    }
    setClosestDestinationAirports(...closestDestinationAirports, airportsArray);
  }

  /* Set Departure and Destination Airports*/
  useEffect(() => {
    setDepartureAirport(airports.filter(airports => airports.ident === departureInputValue)[0]);
    setDestinationAirport(airports.filter(airports => airports.ident === destinationInputValue)[0]);
  }, [departureInputValue, destinationInputValue]);

  /*Distance between airports*/
  useEffect(() => {
    if (departureAirport && destinationAirport &&
      departureInputValue.length === 4) {
      setDistance(getDistanceBetweenAirports(departureAirport, destinationAirport));
    }
    if (!departureAirport || !destinationAirport) {
      setDistance(0);
    }
  }, [destinationAirport, destinationAirport]);

  useEffect(()=>{
    if (departureAirport) {
      findClosestDepartureAirports(departureAirport, offTrackDistance)
    } else {
      setClosestDepartureAirports([]);
    }
  },[departureAirport])

  useEffect(()=>{
    if (destinationAirport) {
      findClosestDestinationAirports(destinationAirport, offTrackDistance)
    } else {
      setClosestDestinationAirports([]);
    }
  },[destinationAirport])



  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={"DEP"}
          style={styles.inputText}
          autoCapitalize={"characters"}
          maxLength={4}
          autoCorrect={false}
          value={departureInputValue}
          onChangeText={text => setDepartureValue(text)}
          autoFocus={true}
        >
        </TextInput>
        <AnimatedNumber value={distance.toFixed(0)} time={50} style={styles.distanceText} />
        <TextInput
          placeholder={"DST"}
          style={styles.inputText}
          autoCapitalize={"characters"}
          maxLength={4}
          autoCorrect={false}
          value={destinationInputValue}
          onChangeText={text => setDestinationValue(text)}
          autoFocus={true}
        >
        </TextInput>
      </View>
      <Navigation closestDepartureAirports={closestDepartureAirports} closestDestinationAirports={closestDestinationAirports}/>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  inputContainer: {
    height: "10%",
    borderBottomColor: "lightblue",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  navigation: {
    height: "90%",
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
    textAlign: "center",
    fontSize: 16,
    paddingLeft: 5,
    paddingRight: 5,
    // borderWidth: 1,
    borderRadius: 5,
    borderColor: "lightblue",
  },
});

export default SearchBar;
