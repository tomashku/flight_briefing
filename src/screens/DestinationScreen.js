import React from "react";
import { Text, StyleSheet, FlatList, View } from "react-native";

const DestinationScreen = ({ closestDestinationAirports }) => {

  const airport = ({ item }) => <View style={styles.item}>
    <Text style={styles.gpsCode}>{item.gps_code}</Text>
    <Text>{item.name}</Text>
    <Text>{item.distance === 0 ? '' : item.distance.toFixed(0)} {item.distance === 0 ? '' : "NM"}</Text>
    <Text>{item.bearing === 0 ? '' : item.bearing.toFixed(0)}{item.bearing === 0 ? '' :"º"}</Text>
    <Text>LDA {(item.runways.length_ft * 0.3048).toFixed(0)}m</Text>
  </View>;

  return (
    <FlatList
      data={closestDestinationAirports}
      keyExtractor={item => item.id.toString()}
      renderItem={airport}
    />
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
  gpsCode: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default DestinationScreen;
