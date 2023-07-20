import React, { useEffect } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
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
import { getBirdDetail } from "../../redux/actions/birdAction";
import { Circle } from "../../components/SelectBirdComponent";

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

const DetailBird = ({ navigation, route: { params } }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // useSetMealProducts(setProducts, isFocused);

  const {
    loading,
    bird,
    bird: { id, birdName, birdColor, images },
  } = useSelector((state) => state.bird);

  useEffect(() => {
    dispatch(getBirdDetail(params.id));
  }, [dispatch, isFocused]);

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
        updateBird={true}
      ></Header>

      <View style={styles.container}>
        <Image
          source={{ uri: images }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="center"
        ></Image>
      </View>
      <View
        style={{
          backgroundColor: colors.color2,
          padding: 35,
          paddingHorizontal: 25,
          flex: 1,
          marginTop: -50,
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
              style={{
                flex: 1,
                fontSize: 25,
                fontWeight: "900",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              {birdName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginRight: 10,
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.color3,
                // marginRight: 5,
                fontSize: 20,
                fontWeight: "500",
                marginRight: 5,
              }}
            >
              Colors:
            </Text>
            {birdColor &&
              birdColor
                .split(" ")
                .map((item, index) => (
                  <Circle key={index} item={item} size={20} />
                ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailBird;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    // paddingVertical: 40,

    flex: 3,
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
