import React, { useContext } from "react";
import { View } from "react-native";
import Main from "../Pages/Root";
import { LocationContext } from "../Context/LocationContext";
import { ThemeContext } from "../Context/ThemeContext"; // ✅ Correct import

function Home() {
  const { currentLat, currentLong, currentCity } = useContext(LocationContext);
  const [theme] = useContext(ThemeContext); // ✅ Now works correctly

  return (
    <View
      className={`flex-1 px-2 py-8 items-center ${
        theme ? "bg-gray-600" : "bg-sky-600"
      } justify-center`}
    >
      <Main
        currentlat={currentLat}
        currentlong={currentLong}
        currentCity={currentCity}
      />
    </View>
  );
}

export default Home;
