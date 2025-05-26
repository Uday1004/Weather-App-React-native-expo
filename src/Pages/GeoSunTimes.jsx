import React from "react";
import { View, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

function GeoSunTimes({ sunrise, sunset }) {
  const formattedSunrise = new Date(sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedSunset = new Date(sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <View className="bg-white/20 h-30 rounded-xl px-4 mt-7 mb-5 flex-row justify-between items-center">
      <View className="items-center mb-3">
        {/* <Image
          source={require("../../assets/demo.png")}
          className="w-20 h-20 rounded-full mb-2"
        /> */}
        <Feather name="sunrise" size={50} color="white" className="mb-3 mt-4" />
        <Text className="text-white text-1xl mb-2">{formattedSunrise}</Text>
        <Text className="text-white text-xl font-bold">Sunrise</Text>
      </View>

      <View className="items-center mb-3">
        {/* <Image
          source={require("../../assets/demo.png")}
          className="w-20 h-20 rounded-full mb-2"
        /> */}
        <Feather name="sunset" size={50} color="white" className="mb-3 mt-4" />
        <Text className="text-white text-1xl mb-2">{formattedSunset}</Text>
        <Text className="text-white text-xl font-bold">Sunset</Text>
      </View>
    </View>
  );
}

export default GeoSunTimes;
