import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NearestScreen from "./screens/NearestScreen";
import DepartureScreen from "./screens/DepartureScreen";
import RouteScreen from "./screens/RouteScreen";
import DestinationScreen from "./screens/DestinationScreen";
import SearchBar from "./Components/SearchBar";
import { StyleSheet } from "react-native";


const Tab = createBottomTabNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <SearchBar />
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "cornflowerblue",
            inactiveTintColor: "gray",
            labelStyle: {
              fontSize: 16,
            },
          }}

        >
          <Tab.Screen name="Dep" component={DepartureScreen} />
          <Tab.Screen name="Rte" component={RouteScreen} />
          <Tab.Screen name="Dst" component={DestinationScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>

  );
};

const styles = StyleSheet.create({

  });


export default App;
