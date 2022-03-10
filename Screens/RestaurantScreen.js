import { useState, useEffect } from "react";
import { useParams } from "react-router-native";
import axios from "axios";
import SplashScreen from "./SplashScreen";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { View, Text, Dimensions } from "react-native";

export default function RestaurantScreen({ name, rating, image, description }) {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const longi = 2.351543;
  const lati = 48.862881;

  const getPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        console.log("On passe à la suite");
        const location = await Location.getCurrentPositionAsync();

        setLatitude(longitude);
        setLongitude(latitude);
      } else {
        alert("Permission Refusée !");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(name);
  console.log(rating);
  getPermission();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json`
      );

      var data = "";
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].placeId == id) {
          data = response.data[i];
          break;
        }
      }

      setData(data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <SplashScreen></SplashScreen>
  ) : (
    <View>
      <Text>Resto Screen</Text>
      <Text>{description}</Text>
      <MapView
        style={{ height: 220, width: Dimensions.get("window").width }}
        initialRegion={{
          latitude: lati,
          longitude: longi,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
      >
        <MapView.Marker
          coordinate={{
            latitude: lati,
            longitude: longi,
          }}
        />
      </MapView>
    </View>
  );
}
