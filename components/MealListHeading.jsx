import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../styles/styles";

const MealListHeading = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={{ ...styles.text, textAlign: "center" }}>Name</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ ...styles.text, textAlign: "center" }}>Status</Text>
      </View>
    </View>
  );
};

export default MealListHeading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color3,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    alignItems: "center",

    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },

  text: {
    // width: 40,
    color: colors.color2,
    fontWeight: "900",
  },
});
