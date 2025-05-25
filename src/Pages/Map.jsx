import React from "react";
import MapView from "react-native-maps";
import { View } from "react-native";
import { Marker } from "react-native-maps";

function Map({ lat, long, city }) {
  return (
    <View className="mt-6 mb-10 h-60 bg-black/30 rounded-xl overflow-hidden">
      <MapView
        style={{ width: "100%", height: "100%" }}
        region={{
          latitude: lat, // Same as marker
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: lat, longitude: long }}
          title={city}
          description="Your location"
        />
      </MapView>
    </View>
  );
}

export default Map;
