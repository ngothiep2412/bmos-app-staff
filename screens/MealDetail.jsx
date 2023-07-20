import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { colors, defaultStyle } from "../styles/styles";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getMealDetails } from "../redux/actions/mealAction";
import { FontAwesome5 } from "@expo/vector-icons";
import Loader from "../components/Loader";
import {
  useSetMealBirdName,
  useSetMealBirds,
  useSetMealProducts,
} from "../utils/hooks";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;
export const iconOptions = {
  size: 25,
  style: {
    borderRadius: 5,
    backgroundColor: colors.color5,
    weight: 30,
    height: 30,
  },
};

const MealDetail = ({ navigation, route: { params } }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [listproductMeals, setListProductMeals] = useState([]);
  const [visible, setVisible] = useState(false);

  const {
    loading,
    meal,
    meal: { id, title, description, image, productMeals, bird },
  } = useSelector((state) => state.meal);

  useEffect(() => {
    setListProductMeals(productMeals);
  }, [productMeals]);

  const tabs = [
    {
      dayName: "Morning",
      listproductMeals:
        productMeals?.Morning === null ? null : productMeals?.Morning,
    },
    {
      dayName: "Afternoon",
      listproductMeals:
        productMeals?.Afternoon === null ? null : productMeals?.Afternoon,
    },
    {
      dayName: "Evening",
      listproductMeals:
        productMeals?.Evening === null ? null : productMeals?.Evening,
    },
  ];
  const [selectedTab, setSelectedTab] = useState(0);

  let total = 0;
  const calculateTotalPrice = (productMeals) => {
    if (productMeals !== undefined) {
      total = Object.values(productMeals)
        .flat()
        .reduce((sum, productMeal) => {
          return sum + (productMeal.product?.price || 0) * productMeal.amount;
        }, 0);
    }
  };
  calculateTotalPrice(listproductMeals);

  useEffect(() => {
    dispatch(getMealDetails(params.id));
  }, [dispatch, isFocused]);

  const renderProductList = () => {
    const selectedTabData = tabs.find((tab, index) => index === selectedTab);

    if (selectedTabData && selectedTabData.listproductMeals) {
      return selectedTabData.listproductMeals.length === 0 ? (
        <View
          style={{
            width: Dimensions.get("screen").width / 1.2,
          }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 18, fontWeight: "700" }}
          >
            No products in this section
          </Text>
        </View>
      ) : (
        selectedTabData.listproductMeals.map((mealItem, index) => (
          <MealProductItem
            key={mealItem.product.id}
            productName={mealItem.product?.productName}
            expiredDate={mealItem.product?.expiredDate}
            price={mealItem.product?.price}
            image={mealItem.product?.image}
            amount={mealItem.amount}
            index={index}
          />
        ))
      );
    }
    return null;
  };

  return loading ? (
    <Loader></Loader>
  ) : (
    <View style={{ ...defaultStyle, padding: 0, paddingTop: 0 }}>
      {!visible && (
        <Header
          back={true}
          color={colors.color3}
          visible={true}
          editMeal={true}
          id={id}
          updateMeal={true}
        ></Header>
      )}
      <View style={styles.container}>
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        ></Image>
      </View>
      <View
        style={{
          backgroundColor: colors.color2,
          padding: 35,
          paddingHorizontal: 25,
          flex: 1,
          marginTop: -100,
          borderTopLeftRadius: 55,
          borderTopRightRadius: 55,
          borderColor: "#EBEBEB",
          shadowColor: "black",
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 2 },
          borderWidth: 0.2,
          shadowOpacity: 0.5,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              numberOfLines={2}
              style={{ fontSize: 25, fontWeight: "900", marginBottom: 10 }}
            >
              {title}
            </Text>
          </View>

          <View
            style={{
              marginBottom: 10,
              backgroundColor: colors.color1_light,
              borderRadius: 20,
              marginHorizontal: 40,
            }}
          >
            <Text
              style={{
                paddingVertical: 5,
                fontSize: 18,
                fontWeight: "600",
                marginLeft: 10,
                color: colors.color2,
                textAlign: "center",
              }}
            >
              {bird?.birdName}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginLeft: 10,
                color: colors.price,
              }}
            >
              $ {total}
            </Text>
          </View>
          <View style={{}}>
            <Text
              numberOfLines={8}
              style={{ letterSpacing: 1, lineHeight: 20, marginVertical: 15 }}
            >
              {description}
            </Text>
          </View>
          <Text
            numberOfLines={8}
            style={{
              letterSpacing: 1,
              lineHeight: 20,
              marginVertical: 15,
              fontWeight: "900",
              fontSize: 16,
            }}
          >
            Section Detail:
          </Text>
          <View style={{}}>
            <TabBar
              tabs={tabs}
              selectedTab={selectedTab}
              onTabPress={setSelectedTab}
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ paddingHorizontal: 2 }}
            >
              {renderProductList()}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const MealProductItem = ({ image, productName, amount, price, index }) => {
  return (
    <View style={styles.productContainer}>
      <Image
        source={{ uri: image, flex: 1 }}
        style={{ width: 80, height: 80, resizeMode: "contain", flex: 1 }}
      ></Image>

      <View
        style={{
          flexDirection: "column",

          justifyContent: "space-evenly",

          flex: 1,
          // width: "100%",
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            flex: 2,
            fontSize: 15,
            fontWeight: "600",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {productName}
        </Text>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "800",
              marginLeft: 5,
              textAlign: "center",
              color: colors.price,
            }}
          >
            $ {price}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "500", marginRight: 5 }}>
            Quantity:
          </Text>
          <Text
            style={{ fontSize: 14, fontWeight: "900", color: colors.color1 }}
          >
            {amount}
          </Text>
        </View>
      </View>
    </View>
  );
};

const TabBar = ({ tabs, selectedTab, onTabPress }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ height: 50, marginBottom: 20 }}
    >
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={{
            justifyContent: "center",
            alignItems: "center",
            // height: 50,
            width: 100,
            backgroundColor:
              selectedTab === index ? colors.color1 : colors.color2,
            borderRadius: 30,
            marginRight: 10,
            borderWidth: 1,
            borderColor: selectedTab === index ? colors.color1 : colors.color1,
          }}
          onPress={() => onTabPress(index)}
        >
          <Text
            style={{
              color: selectedTab === index ? colors.color2 : colors.color1,
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            {tab.dayName}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default MealDetail;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    // paddingVertical: 40,
    height: 380,
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: "contain",
    height: 200,
    marginTop: 20,
  },
  quantity: {
    backgroundColor: colors.color4,
    padding: 6,
    // textAlignVertical: "auto",
    // alignItems: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color5,
  },

  productContainer: {
    flex: 1,
    width: 150,
    height: 180,
    marginRight: 15,
    flexDirection: "column",
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
});
