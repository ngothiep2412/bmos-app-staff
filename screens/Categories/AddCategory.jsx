import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { FlashList } from "@shopify/flash-list";
import {
  colors,
  defaultImgFood,
  defaultImgMeal,
  defaultStyle,
  formHeading,
  inputOptions,
} from "../../styles/styles";
import Loader from "../../components/Loader";
import { Avatar, Button, TextInput } from "react-native-paper";

import {
  useMessageAndErrorBird,
  useMessageAndErrorCategory,
} from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Modal from "react-native-modal";

import plus from "../../assets/plus.png";
import mime from "mime";
import { createBird } from "../../redux/actions/birdAction";
import { createCategory } from "../../redux/actions/categoryAction";

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

const AddCategory = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState(null);

  const disableBtnCondition = !categoryName;

  const loading = useMessageAndErrorCategory(
    dispatch,
    navigation,
    "categories"
  );

  const submitHandler = () => {
    dispatch(createCategory(categoryName));
  };

  return (
    <View
      style={{
        ...defaultStyle,
        backgroundColor: colors.color5,
      }}
    >
      <Header back={true} color={colors.color3} editMeal={false}></Header>

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formHeading}>New Category</Text>
      </View>

      <ScrollView
        style={{
          padding: 20,
          elevation: 10,
          borderRadius: 10,
          maxHeight: 650,
          backgroundColor: colors.color3,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            minHeight: 600,
          }}
        >
          <Text style={{ color: "white" }}>Name</Text>
          <TextInput
            {...inputOptions}
            placeholder="Name"
            value={categoryName}
            onChangeText={setCategoryName}
          />
          <Button
            textColor={colors.color2}
            style={{
              backgroundColor: colors.color1,
              margin: 20,
              marginVertical: 30,
              padding: 6,
              //   marginBottom: 20,
            }}
            icon={"plus"}
            onPress={submitHandler}
            loading={loading}
            disabled={disableBtnCondition}
          >
            Add
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddCategory;

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
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    paddingVertical: 18,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 35,
    flexDirection: "row",
  },

  productContainer: {
    // width: "100%",
    // height: 100,
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
    // marginBottom: 30,
    // overflow: "hidden",
  },

  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.color5,
    width: "80%",
    height: 250,
    borderRadius: 8,
    padding: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
