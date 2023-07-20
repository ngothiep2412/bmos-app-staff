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
import {
  getProductDetail,
  updateProductForm,
} from "../../redux/actions/productAction";

const UpdateProduct = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const {
    product,
    product: { image },
  } = useSelector((state) => state.product);

  const [id] = useState(route.params.id);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageBird, setImageBird] = useState("");
  const [remainQuantity, setRemainQuantity] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("empty");

  useSetCategory(setCategories, isFocused);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  useEffect(() => {
    setImageBird(image);
  }, [image]);

  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append("file", {
      uri: imageBird,
      type: mime.getType(imageBird),
      name: imageBird.split("/").pop(),
    });
    const expiredDate = new Date(date).toISOString().split("T")[0];

    dispatch(
      updateProductForm(
        id,
        productName,
        description,
        expiredDate,
        price,
        image,
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

  useEffect(() => {
    if (route.params?.image) {
      setImageBird(route.params.image);
      // dispatch updatePic Here
    }
  }, [route.params, isFocused]);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id, isFocused]);

  useEffect(() => {
    if (product) {
      setProductName(product.productName);
      setDescription(product.description);
      setPrice(String(product.price));
      setRemainQuantity(String(product.remainQuantity));
      const expiredDateString = new Date(product.expiredDate)
        .toISOString()
        .split("T")[0];
      setDate(new Date(expiredDateString));
      setCategory(
        categoryId === 1
          ? "Straight Bird Food"
          : categoryId === 2
          ? "Suet Bird Food"
          : categoryId === 3
          ? "Wild Bird Seed Mixes"
          : "Live Bird Food"
      );
      setCategoryId(product.categoryId);
    }
  }, [product]);

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
          <Text style={formHeading}>Update Product</Text>
        </View>

        <ScrollView
          style={{
            padding: 20,
            elevation: 10,
            borderRadius: 10,

            backgroundColor: colors.color3,
          }}
        >
          <View
            style={{
              maxHeight: 900,
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
              {imageBird && (
                <Avatar.Image
                  size={80}
                  style={{
                    backgroundColor: colors.color1,
                  }}
                  source={{
                    uri: imageBird,
                  }}
                />
              )}
            </View>

            <Button
              onPress={() =>
                navigation.navigate("camera", {
                  updatedProductImg: true,
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
              textColor={colors.color2}
              style={{
                backgroundColor: colors.color1,
                margin: 20,
                padding: 6,
              }}
              icon={"update"}
              onPress={submitHandler}
              loading={loadingOther}
              disabled={loadingOther}
            >
              Update
            </Button>
          </View>
        </ScrollView>
      </View>

      <SelectComponentCate
        categories={categories}
        setCategoryId={setCategoryId}
        setCategory={setCategory}
        visible={visible}
        setVisible={setVisible}
      />
    </KeyboardAvoidingView>
  );
};

export default UpdateProduct;
