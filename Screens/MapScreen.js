import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { View, Text, Dimensions, FlatList } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MapScreen() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json`
        );

        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          console.log("On passe à la suite");
          const location = await Location.getCurrentPositionAsync();

          setLatitude(item.location.lat);
          setLongitude(item.location.lng);
        } else {
          alert("Permission Refusée !");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    getPermission();
  }, []);

  const generateStars = (numberOfStars) => {
    let starsArrays = [];
    for (let i = 0; i < 5; i++) {
      if (i < numberOfStars) {
        starsArrays.push(
          <Entypo name="star" size={22} color="#DAA520" key={i} />
        );
      } else {
        starsArrays.push(<Entypo name="star" size={22} color="grey" key={i} />);
      }
    }
    return starsArrays;
  };

  return (
    <View>
      <Text>Map Screen </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <MapView
              style={{
                height: Dimensions.get("window").height,
                width: Dimensions.get("window").width,
              }}
              initialRegion={{
                latitude: item.location.lat,
                longitude: item.location.lng,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              showsUserLocation={true}
              provider={PROVIDER_GOOGLE}
            >
              <FlatList
                data={data}
                renderItem={({ item }) => {
                  return (
                    <MapView.Marker
                      coordinate={{
                        latitude: item.location.lat,
                        longitude: item.location.lng,
                      }}
                    />
                  );
                }}
              ></FlatList>
            </MapView>
          );
        }}
      ></FlatList>
    </View>
  );
}
