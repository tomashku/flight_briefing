import React, { useState, useEffect } from "react";
import { SafeAreaView, TextInput, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BaseButton } from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";


const MapSelector = ({ ldr, setLdr }) => {

  const [displayValue, setDisplayValue] = useState(500);

  return <View style={styles.selectorBar}>
    <Text>RWY</Text>
    <Slider
      style={styles.slider}
      minimumValue={1000}
      maximumValue={3000}
      value={displayValue}
      minimumTrackTintColor="lightgreen"
      maximumTrackTintColor="lightgray"
      onValueChange={(displayValue)=>setDisplayValue(displayValue)}
      onSlidingComplete={(ldr) => setLdr(ldr)}
    />
    <TouchableOpacity style={styles.listButton}>
      <Text style={styles.buttonText}>{displayValue.toFixed(0)}</Text>
    </TouchableOpacity>
  </View>;
};

const styles = StyleSheet.create({
  selectorBar: {
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  slider: {
    width: "60%",
    margin: 10,
  },
  listButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    // height: 30,
    // backgroundColor: "lightgreen",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  buttonText: {
    padding: 3,
    fontSize: 16,
    // fontWeight: "bold",
  },
});

export default MapSelector;
