import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { colors } from "../styles/styles";
import MyModal from "./Modal";

const CategoryListItem = ({ navigate, updateHandler, i, id, name, status }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setOpenModal((prev) => !prev)}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor: i % 2 === 0 ? colors.color1 : colors.color3,
            flex: 1,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: colors.color2,
              }}
              numberOfLines={1}
            >
              {name}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                color: colors.color2,
              }}
              numberOfLines={1}
            >
              {status.toString().toUpperCase()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {openModal && (
        <MyModal
          status={status}
          id={id}
          updateHandler={updateHandler}
          navigate={navigate}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default CategoryListItem;
