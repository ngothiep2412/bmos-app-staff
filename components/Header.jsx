import React from "react";
import { Avatar } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../styles/styles";

export default function Header({
  back,
  editMeal = false,
  color = colors.color3,
  id,
  updateMeal = false,
  updateProduct = false,
  updateBird = false,
}) {
  const route = useRoute();
  const navigate = useNavigation();

  return (
    <>
      {back && (
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 20,
            top: 40,
            zIndex: 10,
            borderColor: "#EBEBEB",
            borderRadius: 100,
            backgroundColor: colors.color1,
            borderWidth: 1,
          }}
          onPress={() => navigate.goBack()}
        >
          <View
            style={{
              backgroundColor: colors.color2,
              width: 50,
              height: 50,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar.Icon
              style={{ backgroundColor: colors.color4 }}
              icon={"arrow-left"}
              color={color}
            ></Avatar.Icon>
          </View>
        </TouchableOpacity>
      )}
      {editMeal && (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 20,
            top: 40,
            zIndex: 10,
            borderColor: "#EBEBEB",
            borderRadius: 100,
            backgroundColor: colors.color1,
            borderWidth: 1,
          }}
          onPress={() => {
            if (updateMeal) {
              navigate.navigate("updatemeal", { id });
            } else if (updateProduct) {
              navigate.navigate("updateproduct", { id });
            } else if (updateBird) {
              navigate.navigate("updatebird", { id });
            }
          }}
        >
          <View
            style={{
              backgroundColor: colors.color2,
              width: 50,
              height: 50,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5
              name="edit"
              size={24}
              color={colors.color1}
            ></FontAwesome5>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
