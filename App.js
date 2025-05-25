import "react-native-gesture-handler";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./src/Components/Home";
import { Feather } from "@expo/vector-icons";
import { View, TouchableOpacity, Text } from "react-native";
import {
  LocationProvider,
  LocationContext,
} from "./src/Context/LocationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider, ThemeContext } from "./src/Context/ThemeContext";

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  const { fetchCurrentLocation } = useContext(LocationContext);
  const [theme, setTheme] = useContext(ThemeContext);

  function handleCall() {
    fetchCurrentLocation();
    navigation.closeDrawer();
  }

  function handleTheme() {
    const newTheme = !theme;
    setTheme(newTheme);
    AsyncStorage.setItem("Theme", JSON.stringify(newTheme));
    navigation.closeDrawer();
  }

  return (
    <View className="flex-1 p-5 pt-10">
      <TouchableOpacity
        onPress={() => navigation.closeDrawer()}
        className="self-end p-2 mb-5"
      >
        <Feather name="x" size={24} color="white" />
      </TouchableOpacity>

      <View className="gap-5">
        <TouchableOpacity
          className="py-3 border-b border-white/20"
          onPress={handleCall}
        >
          <View className="flex-row items-center gap-2">
            <Text className="text-white text-lg font-medium">
              Current Location
            </Text>
            <Feather name="globe" size={20} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-3 border-b border-white/20"
          onPress={handleTheme}
        >
          <View className="flex-row items-center gap-2">
            <Text className="text-white text-lg font-medium">
              {theme ? "Default Theme" : "Dark Theme"}
            </Text>
            <Feather name={theme ? "sun" : "moon"} size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function AppContainer() {
  const [theme] = useContext(ThemeContext);

  return (
    <LocationProvider>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerType: "slide",
            overlayColor: "transparent",
            drawerStyle: {
              backgroundColor: theme ? "#4a5565" : "#0284c7", // Example
              width: "70%",
            },
            sceneContainerStyle: {
              backgroundColor: theme ? "#0f172a" : "#0284c7",
            },
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          className="shadow-2xl"
        >
          <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  );
}
