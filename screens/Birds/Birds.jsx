import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  formStyles,
} from "../../styles/styles";
import ButtonBox from "../../components/ButtonBox";
import Chart from "../../components/Chart";
import { FlashList } from "@shopify/flash-list";

import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import MealListHeading from "../../components/MealListHeading";
import MealListItem from "../../components/MealListItem";
import { useAdminBird, useAdminMeals } from "../../utils/hooks";
import Loader from "../../components/Loader";
import BirdListItem from "../../components/BirdListItem";
import Header from "../../components/Header";
import { TextInput } from "react-native-paper";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Birds = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { loading, birds } = useAdminBird(dispatch, isFocused);

  const [searchText, setSearchText] = useState("");
  const [filteredBirds, setFilteredBirds] = useState([]);
  const navigateAdd = () => {
    navigation.navigate("newbird");
  };

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

  const loadingDelete = false;

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
        <Header back={true}></Header>

        {/* Heading */}
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={formHeading}>All Birds</Text>
        </View>

        {loading ? (
          <Loader />
        ) : (
          <>
            <View
              style={{
                margin: 10,
                height: 70,
                width: 70,
                borderRadius: 100,
                backgroundColor: colors.color1,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                zIndex: 9999,
                right: 20,
                bottom: 30,
                borderColor: "#EBEBEB",
                shadowColor: colors.color1,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
              }}
            >
              {/* Nội dung màn hình */}
              <TouchableOpacity onPress={navigateAdd}>
                <Ionicons size={35} color={"white"} name="add"></Ionicons>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 20, marginTop: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                List Birds
              </Text>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Search Bird"
              onChangeText={handleSearch}
              activeUnderlineColor={colors.color1}
              value={searchText}
            />
            <View
              style={{ height: 500, width: Dimensions.get("screen").width }}
            >
              <FlatList
                data={filteredBirds}
                horizontal
                estimatedItemSize={47}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <BirdListItem
                    navigate={navigation}
                    key={item.id}
                    id={item.id}
                    i={index}
                    name={item.birdName}
                    birdColor={item.birdColor}
                    images={item.images}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default Birds;

const styles = StyleSheet.create({
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.color3,
    marginBottom: 16,
    marginHorizontal: 10,

    backgroundColor: colors.color2,
    overflow: "hidden",
    shadowColor: "black",
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 0.5,
    shadowOpacity: 0.15,
  },
});
