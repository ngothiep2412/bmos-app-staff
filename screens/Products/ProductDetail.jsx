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

import { colors, defaultStyle } from "../../styles/styles";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
// import { getMealDetails } from "../redux/actions/mealAction";
import { FontAwesome5 } from "@expo/vector-icons";
import Loader from "../../components/Loader";
import { getProductDetail } from "../../redux/actions/productAction";
import { useSetCategory } from "../../utils/hooks";

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

const ProductDetail = ({ navigation, route: { params } }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [categories, setCategories] = useState([]);
  useSetCategory(setCategories, isFocused);
  // useSetMealProducts(setProducts, isFocused);

  const {
    loading,
    product: {
      id,
      productName,
      description,
      price,
      image,
      remainQuantity,
      categoryId,
    },
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetail(params.id));
  }, [dispatch, isFocused]);

  const CategoryComponent = (categoryId) => {
    // Tìm danh mục trong categories có id trùng khớp với categoryId
    const foundCategory = categories.find(
      (category) => category.id === categoryId
    );

    // Kiểm tra nếu tìm thấy danh mục, thì hiển thị tên của danh mục đó
    const categoryName = foundCategory ? foundCategory.name : "";

    return (
      <Text
        style={{
          fontSize: 14,
          color: colors.color2,
        }}
      >
        {categoryName}
      </Text>
    );
  };

  return loading ? (
    <Loader></Loader>
  ) : (
    <View style={{ ...defaultStyle, padding: 0, paddingTop: 0 }}>
      <Header
        back={true}
        color={colors.color3}
        visible={true}
        editMeal={true}
        id={id}
        updateProduct={true}
      ></Header>

      <View style={styles.container}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        ></Image>
      </View>
      <View
        style={{
          backgroundColor: colors.color2,
          padding: 35,
          paddingHorizontal: 25,
          flex: 1,
          marginTop: -30,
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
        <ScrollView>
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
              {productName}
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
              $ {price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,

                marginLeft: 10,
                color: colors.color3,
                height: "100%",
              }}
            >
              Remain Quantity:
            </Text>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginLeft: 10,
                color: colors.color1,
                height: "100%",
              }}
            >
              {remainQuantity}
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
            Category:
          </Text>

          <View
            style={{
              backgroundColor: colors.color1,
              borderRadius: 100,
              margin: 5,
              height: 40,
              // width: 120,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: colors.color2,
              }}
            >
              {CategoryComponent(categoryId)}
            </Text>
          </View>
          <View>
            <Text
              numberOfLines={8}
              style={{ letterSpacing: 1, lineHeight: 20, marginVertical: 15 }}
            >
              {description}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    // paddingVertical: 40,

    flex: 1,
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: "contain",
    height: "100%",
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
});
