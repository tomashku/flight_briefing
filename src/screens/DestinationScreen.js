import React from "react";
import { Text, StyleSheet, FlatList, View } from "react-native";

const DestinationScreen = ({ closestDestinationAirports }) => {

  return (
    <FlatList
      data={closestDestinationAirports}
      keyExtractor={item => item.ident}
      renderItem={({ item }) => <View style={styles.item}><Text>{item.ident}</Text></View>}
    />
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
  },
  alignment: {
    flex: 1,
    marginTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  item: {
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderColor: 'lightgray',
    margin: 5,
    padding: 5
  },
});

export default DestinationScreen;