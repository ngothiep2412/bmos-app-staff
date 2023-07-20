import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../styles/styles";
import Lottie from "lottie-react-native";
const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie
        style={{
          height: 200,
          width: 200,
        }}
        source={require("../assets/animations/loading.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
