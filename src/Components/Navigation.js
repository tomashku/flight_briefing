import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DepartureScreen from "../screens/DepartureScreen";
import RouteScreen from "../screens/RouteScreen";
import DestinationScreen from "../screens/DestinationScreen";


const Tab = createBottomTabNavigator();

function Navigation({closestDepartureAirports, closestDestinationAirports, routeAlternates, ldr, setLdr}) {

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
        <Tab.Screen name="Dep" children={()=> <DepartureScreen closestDepartureAirports={closestDepartureAirports} ldr={ldr} setLdr={setLdr}/>}/>
        <Tab.Screen name="Rte" children={()=> <RouteScreen routeAlternates={routeAlternates} ldr={ldr} setLdr={setLdr}/>}/>
        <Tab.Screen name="Dst" children={()=> <DestinationScreen closestDestinationAirports={closestDestinationAirports} ldr={ldr} setLdr={setLdr}/>}/>
      </Tab.Navigator>
    </NavigationContainer>

  );
}

export default Navigation;
