import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList } from "react-native";
import SearchBar from "../Components/SearchBar";

const RouteScreen = ({routeAlternates}) => {

  const airport = ({ item }) => <View style={styles.item}>
    <Text style={styles.gpsCode}>{item.gps_code}</Text>
    <Text>{item.offTrackDistance === 0 ? '' : item.offTrackDistance.toFixed(0)} {item.offTrackDistance === 0 ? '' : "NM"}</Text>
  </View>;

  return <FlatList
    data={routeAlternates}
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

export default RouteScreen;
