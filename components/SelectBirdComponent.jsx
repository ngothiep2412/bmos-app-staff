import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, TextInput } from "react-native-paper";
import { colors } from "../styles/styles";
import Heading from "./Heading";
import { FontAwesome5 } from "@expo/vector-icons";
import AnimatedButton from "./AnimationButton";
import { useIsFocused } from "@react-navigation/native";

const SelectBirdComponent = ({
  birds = [],
  setBirdID,
  setBird,
  visibleBird,
  setVisibleBird,
}) => {
  const selectProductforyHandler = (item) => {
    setBird(item);
    setBirdID(item.id);
    setVisibleBird(false);
  };

  const isFocused = useIsFocused();

  const [searchText, setSearchText] = useState("");
  const [filteredBirds, setFilteredBirds] = useState([]);

  useEffect(() => {
    setFilteredBirds(birds);
  }, [birds, isFocused]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = birds.filter((bird) =>
      bird.birdName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBirds(filtered);
  };

  return (
    visibleBird && (
      <View style={styles.selectContainer}>
        <TouchableOpacity onPress={() => setVisibleBird(false)}>
          <Avatar.Icon
            size={30}
            style={{ alignSelf: "flex-end", backgroundColor: colors.color1 }}
            icon={"close"}
          ></Avatar.Icon>
        </TouchableOpacity>

        <Heading style={styles.heading} text1="Our" text2="Birds"></Heading>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Bird"
          onChangeText={handleSearch}
          activeUnderlineColor={colors.color1}
          value={searchText}
        />
        <View
          style={{
            height: 550,
            marginTop: 10,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ height: "87%", paddingHorizontal: 2 }}
          >
            {filteredBirds?.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => selectProductforyHandler(item)}
              >
                <View style={[styles.productContainer, { flex: 2 }]}>
                  <Image
                    source={{ uri: item.images }}
                    style={{ width: 70, height: 70, marginLeft: 10 }}
                  ></Image>

                  <View
                    style={{
                      flex: 2,
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "space-evenly",
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        textTransform: "uppercase",
                      }}
                      numberOfLines={2}
                    >
                      {item.birdName}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginRight: 10,
                        // justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          //   textTransform: "uppercase",
                          marginRight: 10,
                        }}
                        numberOfLines={2}
                      >
                        Color:
                      </Text>
                      {item.birdColor.split(" ").map((item, index) => (
                        <Circle key={index} item={item} />
                      ))}
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 0,
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      marginRight: 10,
                    }}
                  >
                    <AnimatedButton status={item.status} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    )
  );
};

export const Circle = ({ item, size }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: 25,
      marginRight: 5,
      backgroundColor: item.toLowerCase(),
    }}
  />
);

export default SelectBirdComponent;

const styles = StyleSheet.create({
  selectContainer: {
    backgroundColor: colors.color2,
    position: "absolute",
    padding: 20,
    borderRadius: 20,
    width: "100%",
    height: "100%",
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
  productContainer: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderColor: "#EBEBEB",
    shadowColor: "black",
    borderRadius: 8,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 0.2,
    shadowOpacity: 0.5,
    backgroundColor: colors.color2,
    marginBottom: 30,
    // overflow: "hidden",
  },
  quantity: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.color1,
  },
  searchInput: {
    marginTop: 10,
    height: 50,
    borderWidth: 1,
    borderColor: colors.color3,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: colors.color2,
  },
});
