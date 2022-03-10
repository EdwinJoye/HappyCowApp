import {
  View,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
} from "react-native";

export default function SplashScreen() {
  return (
    <View>
      <ImageBackground
        source={require("../img/splash.webp")}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      >
        <ActivityIndicator
          style={{ marginTop: 40 }}
          size="small"
          color="#0000ff"
        />
      </ImageBackground>
    </View>
  );
}
