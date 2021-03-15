import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DepartureScreen from "../screens/DepartureScreen";
import RouteScreen from "../screens/RouteScreen";
import DestinationScreen from "../screens/DestinationScreen";


const Tab = createBottomTabNavigator();

function Navigation({closestDepartureAirports, closestDestinationAirports}) {

  return (
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
        <Tab.Screen name="Dep" children={()=> <DepartureScreen closestDepartureAirports={closestDepartureAirports} />}/>
        <Tab.Screen name="Rte" component={RouteScreen} />
        <Tab.Screen name="Dst" children={()=> <DestinationScreen closestDestinationAirports={closestDestinationAirports} />}/>
      </Tab.Navigator>
    </NavigationContainer>

  );
}

export default Navigation;
