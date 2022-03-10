import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RestaurantsScreen from "./Screens/RestaurantsScreen";
import RestaurantScreen from "./Screens/RestaurantScreen";
import SplashScreen from "./Screens/SplashScreen";
import MapScreen from "./Screens/MapScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="RestaurantsScreen">
          {(props) => <RestaurantsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="RestaurantScreen">
          {(props) => <RestaurantScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="MapScreen">
          {(props) => <MapScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SplashScreen">
          {(props) => <SplashScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
