import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle, formStyles } from "../../styles/styles";
import ButtonBox from "../../components/ButtonBox";
import Chart from "../../components/Chart";

import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import MealListHeading from "../../components/MealListHeading";
import MealListItem from "../../components/MealListItem";
import { useAdminMeals } from "../../utils/hooks";
import Loader from "../../components/Loader";

const AdminUsers = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { loading, meals } = useAdminMeals(dispatch, isFocused);

  let totals = [];
  const calculateTotalPrice = (meals) => {
    totals = meals.map((item) => {
      const totalPrice = item.productMeals.reduce((sum, meal) => {
        return sum + meal.product.price * meal.amount;
      }, 0);
      return { totalPrice };
    });
  };
  calculateTotalPrice(meals);

  const navigationHandler = (text) => {
    switch (text) {
      case "Category":
        navigation.navigate("categories");
        break;
      case "All Orders":
        navigation.navigate("adminorders");
        break;
      case "Product":
        navigation.navigate("newproduct");
        break;

      default:
        navigation.navigate("adminorders");
        break;
    }
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  // const loadingDelete = useMessageAndErrorOther(
  //   dispatch,
  //   null,
  //   null,
  //   getAdminProducts
  // );

  const loadingDelete = false;

  return (
    <>
      <View style={defaultStyle}>
        {/* Heading */}
        <View style={formStyles.heading}>
          <Text style={formStyles.headingText}>Profile</Text>
        </View>

        {loading ? (
          <Loader />
        ) : (
          <>
            <View
              style={{
                backgroundColor: colors.color3,
                borderRadius: 20,
                alignItems: "center",
              }}
            >
              <Chart
                inStock={meals.length}
                outOfStock={0}
                backgroundColor={colors.color3}
                legendFontColor={colors.color2}
              />
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-between",
                }}
              >
                <ButtonBox
                  icon={"format-list-bulleted-square"}
                  text={"Products"}
                  handler={navigationHandler}
                />

                <ButtonBox
                  icon={"plus"}
                  text={"Add Meal"}
                  handler={navigationHandler}
                  reverse={true}
                />
                <ButtonBox
                  icon={"plus"}
                  text={"Category"}
                  handler={navigationHandler}
                />
              </View>
            </View>

            <MealListHeading />

            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                {!loadingDelete &&
                  meals.map((item, index) => (
                    <MealListItem
                      navigate={navigation}
                      deleteHandler={deleteProductHandler}
                      key={item.id}
                      id={item.id}
                      i={index}
                      price={totals}
                      stock={20}
                      name={item.title}
                      // category={item.category?.category}
                      imgSrc={item.image}
                    />
                  ))}
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </>
  );
};

export default AdminUsers;
