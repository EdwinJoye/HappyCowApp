import { useState, useEffect } from "react";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { SearchBar } from "react-native-elements";
import SplashScreen from "./SplashScreen";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function RestaurantsScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json"
        );
        setData(response.data);
      } catch (error) {
        console.log("Error on retrieve rooms", error);
      }
    };
    fetchData();
  }, []);

  const generateStars = (numberOfStars) => {
    let starsArrays = [];
    for (let i = 0; i < 5; i++) {
      if (i < numberOfStars) {
        starsArrays.push(
          <Entypo name="star" size={20} color="#DAA520" key={i} />
        );
      } else {
        starsArrays.push(<Entypo name="star" size={20} color="grey" key={i} />);
      }
    }
    return starsArrays;
  };
  return !isLoading ? (
    <SplashScreen></SplashScreen>
  ) : (
    <View>
      <View style={{ backgroundColor: "#8A66BC", height: 200 }}>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            padding: 15,
            backgroundColor: "pink",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "900",
            }}
          >
            Happy Cow
          </Text>
        </View>
        <SearchBar
          placeholder="Search"
          style={{ backgroundColor: "white", borderColor: "yellow" }}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log("RESTOO", item.rating);
                navigation.navigate("RestaurantScreen", {
                  name: "hello",
                  rating: item.rating,
                  image: item.thumbnail,
                  description: item.description,
                });
              }}
            >
              <View
                style={{
                  marginBottom: 10,
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{ width: 100, height: 100, marginRight: 5 }}
                  source={{ uri: item.thumbnail }}
                ></Image>
                <View>
                  <View
                    style={{
                      height: 20,
                      alignItems: "flex-end",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>{item.name}</Text>
                    <Image
                      resizeMode="contain"
                      source={require("../img/medal.png")}
                      style={{ height: 20, width: 20 }}
                    ></Image>
                  </View>
                  <View
                    style={{
                      height: 20,
                      width: 268,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        height: 20,
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      {generateStars(item.rating)}
                    </View>
                    <Text>0,22 km</Text>
                  </View>
                  <Text
                    style={{ height: 20, color: "green", fontWeight: "700" }}
                  >
                    OUVERT
                  </Text>
                  <Text
                    resizeMode="contain"
                    style={{
                      width: 265,
                      overflow: "scroll",
                      height: 40,
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      ></FlatList>
    </View>
  );
}
