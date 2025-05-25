import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLong, setCurrentLong] = useState(0);
  const [currentCity, setCurrentCity] = useState("NaN");

  const fetchCurrentLocation = async () => {
    console.log("📍 fetchCurrentLocation() invoked");

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("🔐 Permission status:", status);

      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      console.log("✅ Location fetched:", latitude, longitude);

      setCurrentLat(latitude);
      setCurrentLong(longitude);

      const [geocode] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log("🗺️ Reverse geocode result:", geocode);

      const city =
        geocode?.city || geocode?.district || geocode?.region || "Unknown";
      setCurrentCity(city);
      console.log("🏙️ City set to:", city);
    } catch (error) {
      console.error("❌ Error in fetchCurrentLocation:", error);
    }
  };

  // Fetch location on mount
  useEffect(() => {
    fetchCurrentLocation();
    console.log("📦 LocationContext mounted");
  }, []);

  return (
    <LocationContext.Provider
      value={{
        currentLat,
        currentLong,
        currentCity,
        setCurrentLat, // 🔁 expose these
        setCurrentLong,
        setCurrentCity,
        fetchCurrentLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
