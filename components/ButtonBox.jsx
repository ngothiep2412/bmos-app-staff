import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";

const ButtonBox = ({
  icon,
  text,
  handler,
  reverse = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: reverse ? colors.color1 : colors.color3,
        height: 80,
        width: 80,
        borderRadius: 20,
        alignItems: "center",
      }}
      onPress={() => handler(text)}
      activeOpacity={0.9}
      disabled={loading}
    >
      <Avatar.Icon
        size={50}
        color={colors.color2}
        style={{ backgroundColor: reverse ? colors.color1 : colors.color3 }}
        icon={icon}
      ></Avatar.Icon>
      <Text style={{ color: colors.color2, textAlign: "center" }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonBox;

const styles = StyleSheet.create({});
