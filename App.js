import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("...Loading");
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    console.log(latitude, longitude);
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].district);
  };
  console.log(city);
  useEffect(() => {
    ask();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.cityName}>
        <Text>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.days}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>28</Text>
          <Text style={styles.weather}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>28</Text>
          <Text style={styles.weather}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>28</Text>
          <Text style={styles.weather}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>28</Text>
          <Text style={styles.weather}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7EC4CF",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
  },
  days: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  day: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    textAlign: "center",
    fontSize: 68,
  },
  weather: {
    textAlign: "center",
    fontSize: 58,
  },
});
