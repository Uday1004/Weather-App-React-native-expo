import React, { useEffect, useCallback, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Map from "../Pages/Map";
import WeatherAll from "../Pages/WeatherAll";
import { LocationContext } from "../Context/LocationContext"; // 🔁 Import context

function Main() {
  const navigation = useNavigation();

  const {
    currentLat,
    currentLong,
    currentCity,
    setCurrentLat,
    setCurrentLong,
    setCurrentCity,
  } = useContext(LocationContext);

  const [text, setText] = useState("");
  const [cityState, setCityState] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [locationLocked, setLocationLocked] = useState(true);
  const [loading, setLoading] = useState(true);

  // Search suggestions
  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query},IN&limit=5&appid=f98e5ac5c7283411df8959a634616fd4`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("❌ Error fetching suggestions:", error);
    }
  };

  // Debounce for suggestions
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchSuggestions(text);
    }, 300);
    return () => clearTimeout(timeout);
  }, [text]);

  // Refresh control
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSuggestions(text).then(() => setRefreshing(false));
  }, [text]);

  // Update context on manual city select
  useEffect(() => {
    const fetchCityCoordinates = async () => {
      if (!currentCity || locationLocked) return;

      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${currentCity},${cityState},IN&limit=1&appid=f98e5ac5c7283411df8959a634616fd4`
        );
        const data = await response.json();
        if (data.length > 0) {
          setCurrentLat(data[0].lat);
          setCurrentLong(data[0].lon);
          setCurrentCity(data[0].name);
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ Error fetching city coordinates:", error);
        setLoading(false);
      }
    };
    fetchCityCoordinates();
  }, [currentCity, cityState, locationLocked]);

  return (
    <ScrollView
      className="flex-1 bg-gradient-to-b from-blue-700 to-sky-300 px-4 py-6"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="flex-row justify-between items-center mb-4">
        <View className="relative flex-row items-center bg-white/10 w-60 rounded-full px-4">
          <TextInput
            placeholder="Search city"
            placeholderTextColor="#fff"
            className="text-white flex-1 h-12"
            value={text}
            onChangeText={setText}
            returnKeyType="search"
            onSubmitEditing={() => {
              setCurrentCity(text);
              setCityState("");
              setSuggestions([]);
              setText("");
              setLocationLocked(false); // Switch to manual
            }}
          />

          {suggestions.length > 0 && (
            <View className="absolute top-14 left-0 right-0 bg-white rounded-xl shadow-lg z-50 max-h-60">
              <ScrollView nestedScrollEnabled className="max-h-60">
                {suggestions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      Keyboard.dismiss();
                      setCurrentCity(item.name);
                      setCityState(item.state || "");
                      setText("");
                      setSuggestions([]);
                      setLocationLocked(false); // Switch to manual
                    }}
                    className={`p-3 ${
                      index !== suggestions.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <Text className="text-black">
                      {item.name}, {item.state ? item.state + ", " : ""}
                      {item.country}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <TouchableOpacity
            onPress={() => {
              setCurrentCity(text);
              setCityState("");
              setSuggestions([]);
              setText("");
              setLocationLocked(false); // Switch to manual
            }}
          >
            <Feather name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View className="mr-2">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <WeatherAll />

      <Map lat={currentLat} long={currentLong} city={currentCity} />
    </ScrollView>
  );
}

export default Main;
