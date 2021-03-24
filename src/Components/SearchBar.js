import React, { useState, useEffect } from "react";
import { SafeAreaView, TextInput, StyleSheet, View, Text } from "react-native";
import airports from "../../data/airports.json";
import runways from "../../data/runways.json";
import AnimatedNumber from "react-native-animated-number";
import Navigation from "./Navigation";
import { getDistanceFromLine } from "geolib";
import MapSelector from "./MapSelector";

const geolib = require("geolib");

const SearchBar = () => {

    const offTrackDistance = 400;
    // const lda = 6000;

    const [ldr, setLdr] = useState(500);

    const [departureInputValue, setDepartureValue] = useState();
    const [destinationInputValue, setDestinationValue] = useState();

    const [departureAirport, setDepartureAirport] = useState();
    const [destinationAirport, setDestinationAirport] = useState();

    const [distance, setDistance] = useState(0);
    const [bearing, setBearing] = useState(0);

    const [closestDepartureAirports, setClosestDepartureAirports] = useState([]);
    const [closestDestinationAirports, setClosestDestinationAirports] = useState([]);
    const [routeAlternates, setRouteAlternates] = useState([]);

    function getDistanceBetweenAirports(airport1, airport2) {
      return geolib.getPreciseDistance({ latitude: airport1.latitude_deg, longitude: airport1.longitude_deg },
        { latitude: airport2.latitude_deg, longitude: airport2.longitude_deg }) * 0.000539957;
    }

    function getDistanceBetweenPointAndAirport(point, airport) {
      return geolib.getPreciseDistance({ latitude: point.latitude_deg, longitude: point.longitude_deg },
        { latitude: airport.latitude_deg, longitude: airport.longitude_deg }) * 0.000539957;
    }

    function getBearingBetweenPointAndAirport(point, airport) {
      return geolib.getGreatCircleBearing({ latitude: point.latitude_deg, longitude: point.longitude_deg },
        { latitude: airport.latitude_deg, longitude: airport.longitude_deg });
    }

    function getBearingBetweenAirports(airport1, airport2) {
      return geolib.getGreatCircleBearing({ latitude: airport1.latitude_deg, longitude: airport1.longitude_deg },
        { latitude: airport2.latitude_deg, longitude: airport2.longitude_deg });
    }

    function findClosestAirports(refAirport, distance) {
      const myAirports = [];
      for (let i = 0; i < airports.length; i++) {
        myAirports[i] = {};
        myAirports[i].id = airports[i].id;
        myAirports[i].type = airports[i].type;
        myAirports[i].name = airports[i].name;
        myAirports[i].latitude_deg = airports[i].latitude_deg;
        myAirports[i].longitude_deg = airports[i].longitude_deg;
        myAirports[i].elevation_ft = airports[i].elevation_ft;
        myAirports[i].scheduled_service = airports[i].scheduled_service;
        myAirports[i].gps_code = airports[i].gps_code;
        myAirports[i].iata_code = airports[i].iata_code;
        myAirports[i].id = airports[i].id;
      } /*Copy of the airports because they reference same object*/

      let airportsArray = [];
      for (let i = 0; i < myAirports.length; i++) {
        const tempAirport = myAirports[i];
        if (departureAirport && getDistanceBetweenAirports(refAirport, tempAirport) < distance &&
          tempAirport.scheduled_service === "yes" &&
          (tempAirport.type === "medium_airport" ||
            tempAirport.type === "large_airport"
          )) {
          tempAirport.distance = getDistanceBetweenAirports(refAirport, tempAirport);
          tempAirport.bearing = getBearingBetweenAirports(refAirport, tempAirport);
          airportsArray.push(tempAirport);
        }
      }
      for (let k = 0; k < airportsArray.length; k++) {
        const lookup = {};
        let runwayIdToFind = airportsArray[k].id;
        runways.forEach(runway => lookup[runway.airport_ref] = runway);
        if (typeof lookup[runwayIdToFind] !== "undefined") {
          airportsArray[k].runways = lookup[runwayIdToFind];
        }
      }/*Dep and Dest airport are being filtered which is not good*/
      airportsArray = airportsArray.filter(airport => typeof airport.runways !== "undefined"); /*Discard airports without the runways*/
      airportsArray = airportsArray.filter(airport => airport.runways.length_ft > ldr * 3.28084); /*Filter by LDA in feet*/
      airportsArray.sort((a, b) => a.distance - b.distance);
      return airportsArray;
    }

    function getRouteAlternates(dep, dest) {
      const myAirports = [];
      for (let i = 0; i < airports.length; i++) {
        myAirports[i] = {};
        myAirports[i].id = airports[i].id;
        myAirports[i].type = airports[i].type;
        myAirports[i].name = airports[i].name;
        myAirports[i].latitude_deg = airports[i].latitude_deg;
        myAirports[i].longitude_deg = airports[i].longitude_deg;
        myAirports[i].elevation_ft = airports[i].elevation_ft;
        myAirports[i].scheduled_service = airports[i].scheduled_service;
        myAirports[i].gps_code = airports[i].gps_code;
        myAirports[i].iata_code = airports[i].iata_code;
        myAirports[i].id = airports[i].id;
      }/*Copy of the airports because they reference same object*/


      let routeAlternates = [];
      for (let i = 0; i < myAirports.length; i++) {
        const tempAirport = myAirports[i];
        if (departureAirport && departureAirport &&
          tempAirport.scheduled_service === "yes" &&
          getDistanceBetweenAirports(tempAirport, dest) <= distance && /*avoids using apts which are in the oposit direction*/
          getDistanceBetweenAirports(tempAirport, dep) <= distance && /*avoids using apts which are beyond the dest*/
          getDistanceBetweenAirports(tempAirport, dest) !== 0 && /*removes the dest airport from list*/
          (tempAirport.type === "medium_airport" || tempAirport.type === "large_airport") &&

          (getDistanceFromLine(
            { latitude: tempAirport.latitude_deg, longitude: tempAirport.longitude_deg },
            { latitude: dep.latitude_deg, longitude: dep.longitude_deg },
            { latitude: dest.latitude_deg, longitude: dest.longitude_deg },
          ) * 0.000539957 < offTrackDistance)) {
          myAirports[i].offTrackDistance = getDistanceFromLine(
            { latitude: tempAirport.latitude_deg, longitude: tempAirport.longitude_deg },
            { latitude: dep.latitude_deg, longitude: dep.longitude_deg },
            { latitude: dest.latitude_deg, longitude: dest.longitude_deg },
          ) * 0.000539957;
          tempAirport.distanceFromOrgin = getDistanceBetweenAirports(tempAirport, departureAirport);
          routeAlternates.push(tempAirport);
        }
      }

      for (let k = 0; k < routeAlternates.length; k++) {
        const lookup = {};
        let runwayToFind = routeAlternates[k].id;
        runways.forEach(runway => lookup[runway.airport_ref] = runway);
        if (typeof lookup[runwayToFind] !== "undefined") {
          routeAlternates[k].runways = lookup[runwayToFind];
        }
      }
      routeAlternates = routeAlternates.filter(alternate => typeof alternate.runways !== "undefined"); /*Discard airports without the runways*/
      routeAlternates = routeAlternates.filter(alternate => alternate.runways.length_ft > ldr * 3.28084); /*Filter by LDA in feet*/
      routeAlternates.sort((a, b) => a.distanceFromOrgin - b.distanceFromOrgin);
      return routeAlternates;
    }

    /* Set Departure and Destination Airports*/
    useEffect(() => {

      if (typeof departureInputValue !== "undefined" && departureInputValue.length === 4) {
        setDepartureAirport(airports.filter(airports => airports.ident === departureInputValue)[0]);
      } else {
        setDepartureAirport();
      }
    }, [departureInputValue]);
    useEffect(() => {
      if (typeof departureInputValue !== "undefined" && departureInputValue.length === 4) {
        setDestinationAirport(airports.filter(airports => airports.ident === destinationInputValue)[0]);
      } else {
        setDestinationAirport();
      }
    }, [destinationInputValue]);
    /*Distance & Bearing between airports*/
    useEffect(() => {
      if (departureAirport && destinationAirport) {
        setDistance(getDistanceBetweenAirports(departureAirport, destinationAirport));
        setBearing(getBearingBetweenAirports(departureAirport, destinationAirport));
      }
      if (!departureAirport || !destinationAirport) {
        setDistance(0);
        setBearing(0);
      }
    }, [destinationAirport, destinationAirport]);
    /*Find closest Departure Airports*/
    useEffect(() => {
      if (departureAirport) {
        setClosestDepartureAirports(findClosestAirports(departureAirport, offTrackDistance));
      } else {
        setClosestDepartureAirports([]);
      }

    }, [departureAirport]);
    /*Find closest Destination Airports*/
    useEffect(() => {
      if (destinationAirport) {
        setClosestDestinationAirports(findClosestAirports(destinationAirport, offTrackDistance));
      } else {
        setClosestDestinationAirports([]);
      }
    }, [destinationAirport]);

    useEffect(() => {
      if (distance) {
        setRouteAlternates(getRouteAlternates(departureAirport, destinationAirport));
      } else {
        setRouteAlternates([]);
      }

    }, [distance,ldr]);

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

          <View style={styles.distanceBearing}>
            <AnimatedNumber value={bearing.toFixed(0)} time={30} />
            <Text>&deg; </Text>
            <AnimatedNumber value={distance.toFixed(0)} time={30} />
            <Text> NM</Text>
          </View>

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
        <Navigation closestDepartureAirports={closestDepartureAirports}
                    closestDestinationAirports={closestDestinationAirports}
                    routeAlternates={routeAlternates}
                    ldr={ldr}
                    setLdr={setLdr}
        />
      </SafeAreaView>

    );
  }
;

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  inputContainer: {
    height: 50,
    borderBottomColor: "grey",
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
    width: "33%",
    height: 30,
    fontSize: 20,
    textAlign: "center",
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  distanceBearing: {
    flexDirection: "row",
    textAlign: "center",

    fontSize: 24,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    borderColor: "lightblue",
  },
});

export default SearchBar;
