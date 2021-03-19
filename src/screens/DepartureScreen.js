import React from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";

const DepartureScreen = ({ closestDepartureAirports }) => {

  const airport = ({ item }) => <View style={styles.item}>
    <Text style={styles.gpsCode}>{item.gps_code}</Text>
    <Text>{item.distance === 0 ? '' : item.distance.toFixed(0)} {item.distance === 0 ? '' : "NM"}</Text>
    <Text>{item.bearing === 0 ? '' : item.bearing.toFixed(0)}{item.bearing === 0 ? '' :"º"}</Text>
  </View>;

  return <FlatList
    data={closestDepartureAirports}
    keyExtractor={item => item.ident}
    renderItem={airport}
  />;
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
    height: 80,
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

export default DepartureScreen;
