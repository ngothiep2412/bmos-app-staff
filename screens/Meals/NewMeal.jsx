import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  colors,
  defaultImgMeal,
  defaultStyle,
  formHeading,
  inputOptions,
} from "../../styles/styles";
import Loader from "../../components/Loader";
import { Avatar, Button, TextInput } from "react-native-paper";

import {
  useMessageAndErrorMeal,
  useMessageAndErrorOther,
  useSetMealBirds,
  useSetMealProducts,
} from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import plus from "../../assets/plus.png";
import mime from "mime";
import SelectBirdComponent, {
  Circle,
} from "../../components/SelectBirdComponent";
import SelectComponentMorning from "../../components/SelectComponentMorning";
import SelectComponentAfternoon from "../../components/SelectComponentAfternoon";
import SelectComponentEvening from "../../components/SelectComponent Evening";
import { addAMeal } from "../../redux/actions/mealAction";
import { KeyboardAvoidingView } from "react-native";

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

const NewMeal = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageMeal, setImageMeal] = useState("");
  const [products, setProducts] = useState([]);
  const [visibleMorning, setVisibleMorning] = useState(false);
  const [visibleAfternoon, setVisibleAfternoon] = useState(false);
  const [visibleEvening, setVisibleEvening] = useState(false);

  const [birdID, setBirdID] = useState("");
  const [bird, setBird] = useState();
  const [birds, setBirds] = useState([]);
  const [visibleBird, setVisibleBird] = useState(false);

  useSetMealProducts(setProducts, isFocused);
  const [listproductMealsMorning, setListProductMealsMorning] = useState([]);
  const [listproductMealsAfternoon, setListProductMealsAfternoon] = useState(
    []
  );
  const [listproductMealsEvening, setListProductMealsEvening] = useState([]);

  useSetMealProducts(setProducts, isFocused);
  useSetMealBirds(setBirds, isFocused);

  // const loadingOther = false;
  const loadingOther = useMessageAndErrorMeal(
    dispatch,
    navigation,
    "adminmeals"
  );

  const calculateTotalPrice = (productMeals) => {
    let total = 0;
    if (productMeals !== undefined) {
      total = Object.values(productMeals)
        .flat()
        .reduce((sum, productMeal) => {
          return sum + (productMeal.product?.price || 0) * productMeal.amount;
        }, 0);
    }
    return total;
  };

  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append("file", {
      uri: imageMeal,
      type: mime.getType(imageMeal),
      name: imageMeal.split("/").pop(),
    });

    let sections = [];

    if (listproductMealsMorning.length > 0) {
      let morningSection = {
        Morning: listproductMealsMorning.map((item) => {
          return {
            id: item.product.id,
            amount: item.amount,
          };
        }),
      };
      sections.push(morningSection);
    }

    if (listproductMealsAfternoon.length > 0) {
      let afternoonSection = {
        Afternoon: listproductMealsAfternoon.map((item) => {
          return {
            id: item.product.id,
            amount: item.amount,
          };
        }),
      };
      sections.push(afternoonSection);
    }

    if (listproductMealsEvening.length > 0) {
      let eveningSection = {
        Evening: listproductMealsEvening.map((item) => {
          return {
            id: item.product.id,
            amount: item.amount,
          };
        }),
      };
      sections.push(eveningSection);
    }

    if (sections.length === 0) {
      Alert.alert(
        //title
        "Warning",
        //body
        "You need to add at least one PRODUCT in your section",
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
    } else {
      const totalMorning = calculateTotalPrice(listproductMealsMorning);
      const totalAfternoon = calculateTotalPrice(listproductMealsAfternoon);
      const totalEvening = calculateTotalPrice(listproductMealsEvening);
      const total = totalMorning + totalAfternoon + totalEvening;
      Alert.alert(
        //title
        "Confirm",
        //body
        `Are you updated this meal with the total $${total}`,
        [
          {
            text: "No",
            onPress: () => console.log("Yes Pressed"),
          },
          {
            text: "Yes",
            onPress: () =>
              dispatch(addAMeal(title, description, birdID, myForm, sections)),
          },
        ],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    if (route.params?.image) {
      setImageMeal(route.params.image);
      // dispatch updatePic Here
    }
  }, [route.params, isFocused]);

  const incrementQty = (index, section) => {
    if (section === "Morning") {
      const updatedMeals = [...listproductMealsMorning];

      updatedMeals[index] = {
        ...updatedMeals[index],
        amount: updatedMeals[index].amount + 1,
      };

      setListProductMealsMorning(updatedMeals);
    } else if (section === "Afternoon") {
      const updatedMeals = [...listproductMealsAfternoon];

      updatedMeals[index] = {
        ...updatedMeals[index],
        amount: updatedMeals[index].amount + 1,
      };

      setListProductMealsAfternoon(updatedMeals);
    } else if (section === "Evening") {
      const updatedMeals = [...listproductMealsEvening];

      updatedMeals[index] = {
        ...updatedMeals[index],
        amount: updatedMeals[index].amount + 1,
      };

      setListProductMealsEvening(updatedMeals);
    }
  };

  const decrementQty = (index, section) => {
    if (section === "Morning") {
      const updatedMeals = [...listproductMealsMorning];

      if (updatedMeals[index].amount <= 1) {
        updatedMeals.splice(index, 1);
      } else {
        updatedMeals[index] = {
          ...updatedMeals[index],
          amount: updatedMeals[index].amount - 1,
        };
      }
      setListProductMealsMorning(updatedMeals);
    }
    if (section === "Afternoon") {
      const updatedMeals = [...listproductMealsAfternoon];

      if (updatedMeals[index].amount <= 1) {
        updatedMeals.splice(index, 1);
      } else {
        updatedMeals[index] = {
          ...updatedMeals[index],
          amount: updatedMeals[index].amount - 1,
        };
      }

      setListProductMealsAfternoon(updatedMeals);
    }
    if (section === "Evening") {
      const updatedMeals = [...listproductMealsEvening];

      if (updatedMeals[index].amount <= 1) {
        updatedMeals.splice(index, 1);
      } else {
        updatedMeals[index] = {
          ...updatedMeals[index],
          amount: updatedMeals[index].amount - 1,
        };
      }

      setListProductMealsEvening(updatedMeals);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View
        style={{
          ...defaultStyle,
          backgroundColor: colors.color5,
        }}
      >
        <Header back={true} color={colors.color3} editMeal={false}></Header>
        {/* Heading */}
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={formHeading}>Add Meal</Text>
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
                  uri: imageMeal ? imageMeal : defaultImgMeal,
                }}
              />
            </View>
            <Button
              onPress={() =>
                navigation.navigate("camera", {
                  addMealImg: true,
                })
              }
              textColor={colors.color1}
            >
              Change Image
            </Button>
            <Text style={{ color: "white" }}>Title</Text>
            <TextInput
              {...inputOptions}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <Text style={{ color: "white" }}>Description</Text>
            <TextInput
              {...inputOptions}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
            <Text style={{ color: "white" }}>Bird</Text>
            <Pressable
              style={{
                height: 90,
                backgroundColor: colors.color2,
                marginVertical: 10,
                marginHorizontal: 20,
                justifyContent: "center",
                borderRadius: 3,
              }}
              onPress={() => setVisibleBird(true)}
            >
              {!bird ? (
                <Text style={{ textAlign: "center" }}>Select your bird</Text>
              ) : (
                <View style={[styles.productContainer, { flex: 2 }]}>
                  <Image
                    source={{ uri: bird.images }}
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
                      {bird.birdName}
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
                      {bird.birdColor.split(" ").map((item, index) => (
                        <Circle key={index} item={item} />
                      ))}
                    </View>
                  </View>
                </View>
              )}
            </Pressable>
            {/* //buổi sáng */}
            <Text style={{ color: "white", marginBottom: 10 }}>Morning</Text>
            <Pressable
              style={{
                height: 50,
                height: 50,
                backgroundColor: colors.color1,
                marginHorizontal: 50,

                justifyContent: "center",
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
              onPress={() => setVisibleMorning(true)}
            >
              <Image
                source={plus}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: colors.color2,
                  marginRight: 10,
                }}
              ></Image>
              <Text style={{ textAlign: "center", color: colors.color2 }}>
                Add a new product
              </Text>
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                height: 150,
                marginBottom: 10,
              }}
            >
              {listproductMealsMorning.length !== 0 ? (
                <ScrollView
                  horizontal
                  contentContainerStyle={{
                    alignItems: "center",
                  }}
                  showsHorizontalScrollIndicator={false}
                >
                  {listproductMealsMorning?.map((item, index) => (
                    <MealProductItem
                      key={item.product.id}
                      productName={item.product?.productName}
                      expiredDate={item.product?.expiredDate}
                      price={item.product?.price}
                      image={item.product?.image}
                      amount={item.amount}
                      index={index}
                      section="Morning"
                      incrementQty={incrementQty}
                      decrementQty={decrementQty}
                    ></MealProductItem>
                  ))}
                </ScrollView>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setVisibleMorning(true)}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: colors.color2,
                    borderWidth: 1,
                    borderStyle: "dashed",
                  }}
                >
                  <Text style={{ color: colors.color2, fontSize: 18 }}>
                    No Product in this session
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {/* // buổi chiều */}
            <Text style={{ color: "white", marginBottom: 10 }}>Afternoon</Text>
            <Pressable
              style={{
                height: 50,
                height: 50,
                backgroundColor: colors.color1,
                marginHorizontal: 50,

                justifyContent: "center",
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
              onPress={() => setVisibleAfternoon(true)}
            >
              <Image
                source={plus}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: colors.color2,
                  marginRight: 10,
                }}
              ></Image>
              <Text style={{ textAlign: "center", color: colors.color2 }}>
                Add a new product
              </Text>
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                height: 150,
                marginBottom: 10,
              }}
            >
              {listproductMealsAfternoon.length !== 0 ? (
                <ScrollView
                  horizontal
                  contentContainerStyle={{
                    alignItems: "center",
                  }}
                  showsHorizontalScrollIndicator={false}
                >
                  {listproductMealsAfternoon?.map((item, index) => (
                    <MealProductItem
                      key={item.product.id}
                      productName={item.product?.productName}
                      expiredDate={item.product?.expiredDate}
                      price={item.product?.price}
                      image={item.product?.image}
                      amount={item.amount}
                      index={index}
                      section="Afternoon"
                      incrementQty={incrementQty}
                      decrementQty={decrementQty}
                    ></MealProductItem>
                  ))}
                </ScrollView>
              ) : (
                <TouchableOpacity
                  onPress={() => setVisibleAfternoon(true)}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: colors.color2,
                    borderStyle: "dashed",
                  }}
                >
                  <Text style={{ color: colors.color2, fontSize: 18 }}>
                    No Product in this session
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* // buổi tối */}
            <Text style={{ color: "white", marginBottom: 10 }}>Evening</Text>
            <Pressable
              style={{
                height: 50,
                height: 50,
                backgroundColor: colors.color1,
                marginHorizontal: 50,

                justifyContent: "center",
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
              onPress={() => setVisibleEvening(true)}
            >
              <Image
                source={plus}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: colors.color2,
                  marginRight: 10,
                }}
              ></Image>
              <Text style={{ textAlign: "center", color: colors.color2 }}>
                Add a new product
              </Text>
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                height: 150,
                marginBottom: 10,
              }}
            >
              {listproductMealsEvening.length !== 0 ? (
                <ScrollView
                  horizontal
                  contentContainerStyle={{
                    alignItems: "center",
                  }}
                  showsHorizontalScrollIndicator={false}
                >
                  {listproductMealsEvening?.map((item, index) => (
                    <MealProductItem
                      key={item.product.id}
                      productName={item.product?.productName}
                      expiredDate={item.product?.expiredDate}
                      price={item.product?.price}
                      image={item.product?.image}
                      amount={item.amount}
                      index={index}
                      section="Evening"
                      incrementQty={incrementQty}
                      decrementQty={decrementQty}
                    ></MealProductItem>
                  ))}
                </ScrollView>
              ) : (
                <TouchableOpacity
                  onPress={() => setVisibleEvening(true)}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: colors.color2,
                    borderStyle: "dashed",
                  }}
                >
                  <Text style={{ color: colors.color2, fontSize: 18 }}>
                    No Product in this session
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <Button
              textColor={colors.color2}
              style={{
                backgroundColor: colors.price,
                margin: 20,
                marginVertical: 30,
                padding: 6,
                //   marginBottom: 20,
              }}
              icon={"plus"}
              onPress={submitHandler}
              loading={loadingOther}
              disabled={title === "" || description === "" || birdID === ""}
            >
              Add
            </Button>
          </View>
        </ScrollView>

        {visibleMorning && (
          <SelectComponentMorning
            products={products}
            listproductMealsMorning={listproductMealsMorning}
            setListProductMealsMorning={setListProductMealsMorning}
            setVisibleMorning={setVisibleMorning}
          />
        )}
        {visibleAfternoon && (
          <SelectComponentAfternoon
            products={products}
            listproductMealsAfternoon={listproductMealsAfternoon}
            setListProductMealsAfternoon={setListProductMealsAfternoon}
            setVisibleAfternoon={setVisibleAfternoon}
          />
        )}
        {visibleEvening && (
          <SelectComponentEvening
            products={products}
            listproductMealsEvening={listproductMealsEvening}
            setListProductMealsEvening={setListProductMealsEvening}
            setVisibleEvening={setVisibleEvening}
          />
        )}
        <SelectBirdComponent
          birds={birds}
          setBirdID={setBirdID}
          setBird={setBird}
          visibleBird={visibleBird}
          setVisibleBird={setVisibleBird}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const MealProductItem = ({
  image,
  productName,
  expiredDate,
  decrementQty,
  incrementQty,
  amount,
  price,
  index,
  section,
}) => {
  return (
    <View
      style={{
        backgroundColor: colors.color2,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 10,
        width: 150,
        flex: 1,
        marginRight: 10,
      }}
    >
      <Image
        source={{ uri: image }}
        style={{ resizeMode: "contain", height: 50, width: 50, flex: 2 }}
      ></Image>

      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            flex: 1,
            fontWeight: "500",
            textAlign: "center",
          }}
          numberOfLines={2}
        >
          {productName}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            textAlign: "center",
            color: colors.price,
          }}
          numberOfLines={2}
        >
          $ {price}
        </Text>
      </View>
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",

          flex: 1,
        }}
      >
        <View
          style={{
            // width: 80,

            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ marginRight: 5 }}
            onPress={() => decrementQty(index, section)}
          >
            <Avatar.Icon icon={"minus"} {...iconOptions}></Avatar.Icon>
          </TouchableOpacity>

          <Text style={styles.quantity}>{amount}</Text>

          <TouchableOpacity
            style={{ marginLeft: 5 }}
            onPress={() => incrementQty(index, section)}
          >
            <Avatar.Icon icon={"plus"} {...iconOptions}></Avatar.Icon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewMeal;

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
});
