import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "0db106f17f347fd5d0c8aa5eb69deb43";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("...Loading");
  const [ok, setOk] = useState(true);
  const [days, setDays] = useState([]);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    //console.log(latitude, longitude);
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].district);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts,minutely,hourly,current&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);
  //console.log(days);
  return (
    <View style={styles.container}>
      <View style={styles.cityName}>
        <Entypo name="menu" size={30} color="black" />
        <Text style={styles.city}>{city}</Text>
        <AntDesign name="search1" size={30} color="black" />
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.days}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          days.map((item, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.date}>
                {`${new Date(item.dt * 1000).getFullYear()} / ${
                  new Date(item.dt * 1000).getMonth() + 1
                } / ${new Date(item.dt * 1000).getDate()}`}
              </Text>
              <View style={{ ...styles.hr, marginBottom: 60 }}></View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.wrapper}>
                  <Text style={styles.temp}>{`${item.temp.day.toFixed(
                    0
                  )}°`}</Text>
                  <Text style={styles.weather}>{item.weather[0].main}</Text>
                  <Text style={styles.tinyText}>
                    {item.weather[0].description}
                  </Text>
                </View>
                <Fontisto
                  name={icons[item.weather[0].main]}
                  size={100}
                  color="black"
                />
              </View>
              <View style={{ ...styles.hr, marginTop: 120 }}></View>
            </View>
          ))
        )}
      </ScrollView>
      <StatusBar style="auto" backgroundColor="#FFCF04" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFCF04",
    justifyContent: "center",
    alignItems: "center",
  },
  hr: {
    width: "90%",
    height: 2,
    marginRight: 60,
    backgroundColor: "black",
  },
  city: {
    fontSize: 20,
    fontWeight: "600",
  },
  date: {
    fontSize: 24,
    alignSelf: "flex-start",
    fontWeight: "600",
    marginBottom: 60,
  },
  cityName: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 28,
    paddingRight: 40,
    paddingLeft: 40,

    paddingTop: 70,
    width: "100%",
    marginBottom: 60,
  },
  days: {},
  day: {
    width: SCREEN_WIDTH,
    paddingLeft: 40,
  },
  wrapper: {
    alignSelf: "flex-start",
  },
  temp: {
    fontSize: 100,
    fontWeight: "600",
    marginBottom: 10,
  },
  flexRow: {},
  weather: {
    fontSize: 25,
    fontWeight: "800",
    marginBottom: 20,
  },
  tinyText: {
    fontSize: 17,
    fontWeight: "600",
  },
});
