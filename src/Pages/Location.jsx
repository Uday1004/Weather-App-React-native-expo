import React from "react";
import { View } from "react-native";
import * as Location from "expo-location";

function Location() {
  useEffect(() => {
    const getLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLan(location.coords.latitude);
        setLong(location.coords.longitude);
      } catch (error) {
        console.error("❌ Error getting location:", error);
      }
    };

    getLocationPermission();
  }, []);

  return;
}

export default Location;
