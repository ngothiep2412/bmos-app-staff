import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { colors, defaultStyle, formHeading } from "../../styles/styles";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { useCategories, useMessageAndErrorCategory } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import MealListHeading from "../../components/MealListHeading";
import CategoryListItem from "../../components/CategoryListItem";
import {
  getAllCategories,
  updateCategory,
} from "../../redux/actions/categoryAction";
import { useEffect } from "react";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const Categories = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { loading, categories } = useCategories(dispatch, isFocused);

  const [filteredCategoris, setFilteredCategoris] = useState([]);

  useEffect(() => {
    const clonedCategories = [...categories];
    if (
      categories &&
      categories.length > 0 &&
      categories[0].hasOwnProperty("status")
    ) {
      clonedCategories.sort((category1, category2) => {
        return category1.status === true
          ? -1
          : category2.status === true
          ? 1
          : 0;
      });
    }
    setFilteredCategoris(clonedCategories);
  }, [categories, isFocused]);

  const navigateAdd = () => {
    navigation.navigate("addcategory");
  };

  const updateHandler = (id, status) => {
    // console.log(id, status);
    dispatch(updateCategory(id, status));
  };

  const loadingUpdate = useMessageAndErrorCategory(
    dispatch,
    null,
    null,
    getAllCategories
  );

  return (
    <View style={defaultStyle}>
      <Header back={true} />
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formHeading}>All Categories</Text>
      </View>

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
          bottom: 80,
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

      {loading ? (
        <Loader />
      ) : (
        <>
          <MealListHeading />

          {filteredCategoris.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "600" }}>
                Empty list!
              </Text>
              <Text>You have no news at this moment</Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                {!loadingUpdate &&
                  filteredCategoris.map((item, index) => (
                    <CategoryListItem
                      navigate={navigation}
                      updateHandler={updateHandler}
                      key={item.id}
                      id={item.id}
                      i={index}
                      name={item.name}
                      status={item.status}
                    />
                  ))}
              </View>
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default Categories;
