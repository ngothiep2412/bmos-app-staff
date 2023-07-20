import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Avatar, Button } from "react-native-paper";

const MyModal = ({ id, status, updateHandler, setOpenModal }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 10, right: 10 }}
        onPress={() => setOpenModal(false)}
      >
        <Avatar.Icon
          icon={"close"}
          size={25}
          style={{ backgroundColor: colors.color1 }}
        ></Avatar.Icon>
      </TouchableOpacity>
      <Button
        textColor={colors.color1}
        onPress={() => updateHandler(id, !status)}
      >
        Change Status
      </Button>
    </View>
  );
};

export default MyModal;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 100,
    alignSelf: "center",
    justifyContent: "center",
    zIndex: 100,

    backgroundColor: colors.color2,
    padding: 20,
    borderRadius: 10,
    borderColor: "#EBEBEB",
    shadowColor: "black",
    borderRadius: 8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 0.5,
    shadowOpacity: 0.15,
  },

  text: {
    fontWeight: "900",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
