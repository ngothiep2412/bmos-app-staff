import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { colors, defaultImgFood } from "../styles/styles";
import MyModal from "./Modal";
import { Avatar, Button } from "react-native-paper";
import { Circle } from "./SelectBirdComponent";
import { useNavigation } from "@react-navigation/native";

const BirdListItem = ({ birdColor, i, id, name, images }) => {
  // const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("birddetail", { id })}
        activeOpacity={0.9}
        style={{ marginTop: 20 }}
      >
        <View
          style={{
            borderColor: "#EBEBEB",
            shadowColor: "black",
            borderRadius: 8,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            borderWidth: 0.5,
            shadowOpacity: 0.15,
            width: 250,
            alignItems: "center",
            justifyContent: "space-between",
            margin: 20,
            marginRight: 30,
            borderRadius: 20,
            height: 400,
            backgroundColor: i % 2 === 0 ? colors.color1 : colors.color2,
          }}
        >
          <Image
            source={{
              uri: images === "string" ? defaultImgFood : images,
            }}
            style={{
              width: "100%",
              height: 200,
              resizeMode: "contain",
              position: "absolute",
              left: 40,
              top: 105,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              padding: 20,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text
              numberOfLines={2}
              style={{
                color: i % 2 === 0 ? colors.color2 : colors.color3,
                fontSize: 25,
                fontWeight: "300",
                width: "60%",
              }}
            >
              {name}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: i % 2 === 0 ? colors.color2 : colors.color3,
              borderRadius: 0,
              paddingVertical: 5,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginRight: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: i % 2 === 0 ? colors.color3 : colors.color2,
                  // marginRight: 5,
                  fontSize: 18,
                  fontWeight: "500",
                  marginRight: 5,
                }}
              >
                Colors:
              </Text>
              {birdColor.split(" ").map((item, index) => (
                <Circle key={index} item={item} size={15} />
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: 180,
    width: 160,
    marginRight: 20,
    marginBottom: 20,
    alignItems: "center",
    // padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    // marginVertical: 10,
  },
});

export default BirdListItem;
