import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { colors, defaultImgFood } from "../styles/styles";

const MealListItem = ({ navigate, i, id, name, imgSrc }) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          paddingTop: i % 2 !== 0 ? 20 : 0,
          paddingLeft: 2,
          paddingRight: 2,
        }}
        onPress={() => navigate.navigate("mealdetails", { id })}
      >
        <View
          style={{
            ...styles.container,

            backgroundColor: colors.color2,
            shadowColor: "black",
            borderRadius: 20,

            overflow: "hidden",
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 2 },

            shadowOpacity: 0.15,
          }}
        >
          <Image
            source={{
              uri: imgSrc === null ? defaultImgFood : imgSrc,
            }}
            style={{
              width: "100%",
              flex: 2,
              resizeMode: "cover",
            }}
          />
          <Text
            style={{
              flex: 1,
              color: colors.color3,
              alignSelf: "flex-start",
              marginTop: 20,
              textAlign: "center",
              marginLeft: 10,
              textTransform: "uppercase",
              fontSize: 14,
              fontWeight: "600",
            }}
            numberOfLines={2}
          >
            {name}
          </Text>
        </View>
      </TouchableOpacity>

      {/* {openModal && (
        <MyModal
          id={id}
          deleteHandler={deleteHandler}
          navigate={navigate}
          setOpenModal={setOpenModal}
        />
      )} */}
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

export default MealListItem;
