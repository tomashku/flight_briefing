import React from "react";
import { SafeAreaView, Text, StyleSheet, View, FlatList } from "react-native";
import MapSelector from "../Components/MapSelector";


const RouteScreen = ({ routeAlternates, ldr, setLdr }) => {

  const airport = ({ item }) => <View style={styles.item}>
    <View style={styles.header}>
      <Text style={styles.gpsCode}>{item.gps_code} </Text>
      <Text>{item.name}</Text>
    </View>

    <Text>{item.offTrackDistance === 0 ? "" : item.offTrackDistance.toFixed(0)} {item.offTrackDistance === 0 ? "" : "NM"}</Text>
    <Text>LDA {(item.runways.length_ft * 0.3048).toFixed(0)}m</Text>
  </View>;

  return (
    <View>
      <MapSelector ldr={ldr} setLdr={setLdr}/>
      <FlatList
        data={routeAlternates}
        keyExtractor={item => item.id.toString()}
        renderItem={airport}
      />

    </View>

  );

};

const styles = StyleSheet.create({
  alignment: {
    flex: 1,
    marginTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  item: {
    width: "100%",
    // height: 80,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "lightgray",
    margin: 5,
    padding: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  gpsCode: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RouteScreen;
