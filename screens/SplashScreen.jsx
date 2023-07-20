import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import React, { useRef, useEffect } from "react";
import { Alert } from "react-native";
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import Lottie from "lottie-react-native";
const SplashScreen = ({ navigation }) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleGetToken = async () => {
    const storedToken = await AsyncStorage.getItem("token");

    if (storedToken !== null) {
      const decodedToken = jwtDecode(storedToken);
      try {
        if (decodedToken.exp * 1000 >= 0) {
          navigation.reset({
            index: 0,
            routes: [{ name: "BottomTab" }],
          });
        } else {
          Alert.alert(
            //title
            "Error",
            //body
            "Your authitentication is expired",
            [
              {
                text: "OK",
                onPress: () => console.log("Yes Pressed"),
              },
            ],
            { cancelable: false }
            //clicking out side of alert will not cancel
          );
          dispatch({
            type: "clearError",
          });

          // Token is still valid
          // Proceed with the login flow or any other actions
          AsyncStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Failed to decode the token:", error);
      }
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "login" }],
      });
    }
  };

  useEffect(() => {
    const animationSequence = Animated.sequence([
      Animated.timing(moveAnim, {
        duration: 2000,
        toValue: Dimensions.get("window").width / 1.8,
        delay: 0,
        useNativeDriver: false,
      }),
      Animated.timing(moveAnim, {
        duration: 2000,
        toValue: 0,
        delay: 0,
        useNativeDriver: false,
      }),
    ]);

    const fadeAnimation = Animated.timing(fadeAnim, {
      duration: 2000,
      toValue: 1,
      delay: 2000,
      useNativeDriver: false,
    });

    const animationPromise = new Promise((resolve) => {
      animationSequence.start(resolve);
    });

    animationPromise.then(() => {
      fadeAnimation.start(() => {
        handleGetToken();
      });
    });
  }, [moveAnim, fadeAnim]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "white" }]}>
      <View style={styles.contentContainer}>
        {/* <Animated.Image
          style={[styles.image, { opacity: fadeAnim, width: "100%" }]}
          source={require("../assets/handshake.png")}
        /> */}
        <Lottie
          style={styles.image}
          source={require("../assets/animations/store.json")}
          autoPlay
          loop
        />
        <Animated.View style={[styles.logoContainer, { marginLeft: moveAnim }]}>
          <Text style={[styles.logoText]}>Manage </Text>
          <Animated.Text style={[styles.logoText, { opacity: fadeAnim }]}>
            Your Store
          </Animated.Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#52b372",
  },
  logoText: {
    fontSize: 35,
    marginTop: 20,
    color: "black",
    fontWeight: "700",
  },
  contentContainer: {
    top: "40%",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    flexDirection: "row",
  },
});
