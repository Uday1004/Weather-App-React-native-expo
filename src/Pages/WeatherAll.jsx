import React, { useEffect, useContext, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LocationContext } from "../Context/LocationContext"; // adjust path if needed]

function WeatherAll() {
  const { currentLat, currentLong, currentCity } = useContext(LocationContext);

  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        console.log("📍 Fetching weather for:", currentLat, currentLong);

        const currentRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&units=metric&appid=f98e5ac5c7283411df8959a634616fd4`
        );
        const current = await currentRes.json();
        setWeatherData(current);

        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${currentLat}&lon=${currentLong}&units=metric&appid=f98e5ac5c7283411df8959a634616fd4`
        );
        const forecast = await forecastRes.json();
        setForecastData(forecast.list.slice(0, 5)); // Next 5 slots (~15 hours)

        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching weather:", error);
        setLoading(false);
      }
    };

    if (currentLat !== 0 && currentLong !== 0) {
      fetchWeatherData();
    }
  }, [currentLat, currentLong]);

  return (
    <View>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-white text-2xl font-bold">Loading...</Text>
        </View>
      ) : (
        <>
          <View className="items-center mt-7 px-3 relative w-full">
            <View className="absolute top-0 left-0 right-0 px-5 flex-row justify-between items-center">
              <Text
                style={{
                  fontFamily: "montserrat", // jo font aapne load kiya hai
                  color: "white",
                  fontSize: 32,
                  fontWeight: "bold",
                  marginBottom: 4,
                  flex: 1,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {currentCity}
              </Text>

              <Text className="text-white text-xl font-medium ml-2 whitespace-nowrap">
                {weatherData?.weather?.[0]?.main || ""}
              </Text>
            </View>

            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@4x.png`,
              }}
              style={{ width: 150, height: 150, marginTop: 15 }}
            />
            <Text className="text-5xl mt-0 text-white font-extrabold">
              {weatherData?.main?.temp
                ? `${Math.round(weatherData.main.temp)}°C`
                : "--°C"}
            </Text>
          </View>

          <View className="bg-white/20 mt-6 rounded-xl flex-row flex-wrap px-4 py-4 justify-between">
            {[
              {
                icon: "droplet",
                label: `${weatherData?.main?.humidity}%`,
                name: "Humidity",
              },
              {
                icon: "thermometer",
                label: `${Math.round(weatherData?.main?.feels_like)}°C`,
                name: "Feels like",
              },
              {
                icon: "wind",
                label: `${Math.round(weatherData?.wind?.speed * 3.6)} km/h`,
                name: "Wind",
              },
              {
                icon: "eye",
                label: `${(weatherData?.visibility / 1000).toFixed(1)} km`,
                name: "Visibility",
              },
              {
                icon: "sliders",
                label: `${Math.round(weatherData?.main?.pressure)} hPa`,
                name: "Pressure",
              },
            ].map((item, index) => (
              <View key={index} className="items-center w-1/3 mb-4">
                <Feather name={item.icon} size={20} color="white" />
                <Text className="text-gray-300 font-semibold mt-2 text-sm">
                  {item.name}
                </Text>
                <Text className="text-white mt-1 text-lg">{item.label}</Text>
              </View>
            ))}
          </View>

          <View className="mt-8">
            <View className="flex-row justify-between px-2 mb-2">
              <Text className="text-white font-semibold">Previous</Text>
              <Text className="text-white">Next</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {forecastData.map((item, index) => {
                const hour = new Date(item.dt * 1000)
                  .getHours()
                  .toString()
                  .padStart(2, "0");
                const temp = `${Math.round(item.main.temp)}°`;
                const icon = item.weather[0].icon;

                return (
                  <View
                    key={index}
                    className="bg-white/20 rounded-xl p-4 mx-2 items-center min-w-[70px]"
                  >
                    <Image
                      source={{
                        uri: `https://openweathermap.org/img/wn/${icon}.png`,
                      }}
                      style={{ width: 40, height: 40 }}
                    />
                    <Text className="text-white font-bold">{temp}</Text>
                    <Text className="text-white text-xs">{hour}:00</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}

export default WeatherAll;
