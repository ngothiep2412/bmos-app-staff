import {
  View,
  Text,
  ScrollView,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  colors,
  defaultImg,
  defaultImgFood,
  defaultImgMeal,
  defaultStyle,
  formHeading,
  inputOptions,
} from "../../styles/styles";
import Loader from "../../components/Loader";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useMessageAndErrorProduct, useSetCategory } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import DateTimePicker from "@react-native-community/datetimepicker";
import SelectComponentCate from "../../components/SelectComponentCate";
import mime from "mime";
import { createProduct } from "../../redux/actions/productAction";

const NewProduct = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageBird, setImageBird] = useState("");
  const [remainQuantity, setRemainQuantity] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("Your Category");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useSetCategory(setCategories, isFocused);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("empty");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append("file", {
      uri: imageBird,
      type: mime.getType(imageBird),
      name: imageBird.split("/").pop(),
    });
    const expiredDate = new Date(date).toISOString().split("T")[0];

    dispatch(
      createProduct(
        productName,
        description,
        expiredDate,
        price,
        remainQuantity,
        categoryId,
        myForm
      )
    );
  };

  const loadingOther = useMessageAndErrorProduct(
    dispatch,
    navigation,
    "products"
  );

  const disableBtnCondition =
    !productName || !description || !price || !remainQuantity || !categoryId;

  useEffect(() => {
    if (route.params?.image) {
      setImageBird(route.params.image);
      // dispatch updatePic Here
    }
  }, [route.params, isFocused]);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View
        style={{
          ...defaultStyle,
          backgroundColor: colors.color5,
        }}
      >
        {!visible ? (
          <Header back={true} color={colors.color3} editMeal={false}></Header>
        ) : null}
        {/* Heading */}
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={formHeading}>Add Product</Text>
        </View>
        <View style={{ height: 650 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              padding: 20,
              elevation: 10,
              borderRadius: 10,

              backgroundColor: colors.color3,
            }}
          >
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  alignSelf: "center",
                  marginBottom: 20,
                }}
              >
                <Avatar.Image
                  size={80}
                  style={{
                    backgroundColor: colors.color1,
                  }}
                  source={{
                    uri: imageBird ? imageBird : defaultImgMeal,
                  }}
                />
              </View>

              <Button
                onPress={() =>
                  navigation.navigate("camera", {
                    addProductImg: true,
                  })
                }
                textColor={colors.color1}
              >
                Change Image
              </Button>
              <Text style={{ color: "white" }}>Name</Text>
              <TextInput
                {...inputOptions}
                placeholder="Name"
                value={productName}
                onChangeText={setProductName}
              />
              <Text style={{ color: "white" }}>Description</Text>
              <TextInput
                {...inputOptions}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />
              <Text style={{ color: "white" }}>Expired Date</Text>

              <View
                style={{
                  height: 50,
                  backgroundColor: colors.color2,
                  marginVertical: 10,
                  marginHorizontal: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.color2,
                }}
              >
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                ></DateTimePicker>
              </View>

              <Text style={{ color: "white" }}>Price</Text>
              <TextInput
                {...inputOptions}
                placeholder="Price"
                keyboardType="number-pad"
                value={price}
                onChangeText={setPrice}
              />
              <Text style={{ color: "white" }}>Remain Quantity</Text>
              <TextInput
                {...inputOptions}
                placeholder="Remain Quantity"
                keyboardType="number-pad"
                value={remainQuantity}
                onChangeText={setRemainQuantity}
              />
              <Text style={{ color: "white" }}>Category</Text>
              <Pressable
                style={{
                  height: 50,
                  backgroundColor: colors.color2,
                  marginVertical: 10,
                  marginHorizontal: 20,
                  justifyContent: "center",

                  borderRadius: 3,
                }}
                onPress={() => setVisible(true)}
              >
                <Text style={{ textAlign: "center" }}>{category}</Text>
              </Pressable>

              <Button
                icon={"plus"}
                textColor={colors.color2}
                style={{
                  backgroundColor: colors.color1,
                  margin: 20,
                  padding: 6,
                  marginBottom: 50,
                }}
                onPress={submitHandler}
                loading={loadingOther}
                disabled={disableBtnCondition}
              >
                Add
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>

      <SelectComponentCate
        categories={categories}
        setCategoryId={setCategoryId}
        setCategory={setCategory}
        visible={visible}
        categoryId={categoryId}
        setVisible={setVisible}
      />
    </KeyboardAvoidingView>
  );
};

export default NewProduct;
