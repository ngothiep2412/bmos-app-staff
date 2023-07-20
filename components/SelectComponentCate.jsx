import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { colors } from "../styles/styles";
import Heading from "./Heading";

const SelectComponentCate = ({
  visible,
  setVisible,
  setCategory,
  setCategoryId,
  categoryId,
  categories = [],
}) => {
  const selectCateforyHandler = (item) => {
    console.log(item);
    setCategory(item.name);
    setCategoryId(item.id);
    setVisible(false);
  };

  return (
    visible && (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Avatar.Icon
            size={30}
            style={{ alignSelf: "flex-end", backgroundColor: colors.color1 }}
            icon={"close"}
          ></Avatar.Icon>
        </TouchableOpacity>

        <Heading style={styles.heading} text1="Our" text2="Categories">
          Select a Category
        </Heading>
        <ScrollView>
          {categories.map((i) => (
            <Text
              key={i.id}
              onPress={() => selectCateforyHandler(i)}
              style={[
                styles.text,
                { color: categoryId === i.id ? colors.color1 : colors.color3 },
              ]}
            >
              {i.name}
            </Text>
          ))}
        </ScrollView>
      </View>
    )
  );
};

export default SelectComponentCate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color2,
    position: "absolute",
    padding: 35,
    borderRadius: 20,
    width: "90%",
    height: "92%",
    alignSelf: "center",
    borderColor: "#EBEBEB",
    shadowColor: "black",
    borderRadius: 8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 0.5,
    shadowOpacity: 0.15,
    top: 50,
  },

  heading: {
    textAlign: "center",
    marginVertical: 10,
    backgroundColor: colors.color3,
    borderRadius: 5,
    padding: 3,
    color: colors.color2,
  },
  text: {
    fontSize: 17,
    fontWeight: "100",
    textTransform: "uppercase",
    marginVertical: 10,
  },
});
