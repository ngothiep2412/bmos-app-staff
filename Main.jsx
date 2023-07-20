import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Animated, View } from "react-native";
import { Dimensions } from "react-native";
import { useDispatch } from "react-redux";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRef } from "react";

import { loadUser } from "./redux/actions/userAction";
import Login from "./screens/Login";
import CameraComponent from "./components/CameraComponent";
import { colors } from "./styles/styles";
import Profile from "./screens/Profile";
import Home from "./screens/Home";
import AdminMeals from "./screens/Meals/AdminMeals";
import AdminOrders from "./screens/Orders/AdminOrders";
import MealDetail from "./screens/MealDetail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpdateMeal from "./screens/Meals/UpdateMeal";
import NewMeal from "./screens/Meals/NewMeal";
import Birds from "./screens/Birds/Birds";
import NewBird from "./screens/Birds/NewBird";
import Products from "./screens/Products/Products";
import NewProduct from "./screens/Products/NewProduct";
import ProductDetail from "./screens/Products/ProductDetail";
import UpdateProduct from "./screens/Products/UpdateProduct";
import OrdersDetail from "./screens/Orders/OrdersDetail";
import SplashScreen from "./screens/SplashScreen";
import ChangePassword from "./screens/ChangePassword";
import UpdateProfile from "./screens/UpdateProfile";
import OnboardingScreen from "./screens/OnBoardingScreen";
import { useState } from "react";
import GetCategories from "./screens/Categories/GetCategories";
import AddCategory from "./screens/Categories/AddCategory";
import DetailBird from "./screens/Birds/DetailBird";
import UpdateBird from "./screens/Birds/UpdateBird";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function Main() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      // AsyncStorage.removeItem("onboarded");

      if (storedToken) {
        dispatch(loadUser());
      }
    }

    fetchToken();
  }, []);

  function TabBottom({ route }) {
    return (
      <>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            // Floating Tab Bar...
            style: {
              backgroundColor: "white",
              position: "absolute",
              bottom: 40,
              marginHorizontal: 20,
              // Max Height...
              height: 60,
              borderRadius: 10,
              // Shadow...
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowOffset: {
                width: 10,
                height: 10,
              },
              paddingHorizontal: 20,
            },
          }}
        >
          {
            // Tab Screens....
            // Tab ICons....
          }
          <Tab.Screen
            name={"home"}
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    // centring Tab Button...
                    position: "absolute",
                    top: 20,
                  }}
                >
                  <FontAwesome5
                    name="home"
                    size={20}
                    color={focused ? colors.color1 : colors.color3}
                  ></FontAwesome5>
                </View>
              ),
            }}
            listeners={({ navigation, route }) => ({
              // Onpress Update....
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: 0,
                  useNativeDriver: true,
                }).start();
              },
            })}
          ></Tab.Screen>

          <Tab.Screen
            name={"adminmeals"}
            component={AdminMeals}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    // centring Tab Button...
                    position: "absolute",
                    top: 20,
                  }}
                >
                  <FontAwesome5
                    name="clipboard-list"
                    size={20}
                    color={focused ? colors.color1 : colors.color3}
                  ></FontAwesome5>
                </View>
              ),
            }}
            listeners={({ navigation, route }) => ({
              // Onpress Update....
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 1.2,
                  useNativeDriver: true,
                }).start();
              },
            })}
          ></Tab.Screen>

          <Tab.Screen
            name={"adminorders"}
            component={AdminOrders}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    // centring Tab Button...
                    position: "absolute",
                    top: 20,
                  }}
                >
                  <FontAwesome5
                    name="paperclip"
                    size={20}
                    color={focused ? colors.color1 : colors.color3}
                  ></FontAwesome5>
                </View>
              ),
            }}
            listeners={({ navigation, route }) => ({
              // Onpress Update....
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 2.5,
                  useNativeDriver: true,
                }).start();
              },
            })}
          ></Tab.Screen>

          <Tab.Screen
            name={"profile"}
            component={Profile}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    // centring Tab Button...
                    position: "absolute",
                    top: 20,
                  }}
                >
                  <FontAwesome5
                    name="user-alt"
                    size={20}
                    color={focused ? colors.color1 : colors.color3}
                  ></FontAwesome5>
                </View>
              ),
            }}
            listeners={({ navigation, route }) => ({
              // Onpress Update....
              tabPress: (e) => {
                Animated.spring(tabOffsetValue, {
                  toValue: getWidth() * 3.75,
                  useNativeDriver: true,
                }).start();
              },
            })}
          ></Tab.Screen>
        </Tab.Navigator>
        <Animated.View
          style={{
            width: getWidth() - 25,
            height: 2,
            backgroundColor: colors.color1,
            position: "absolute",
            bottom: 78,
            // Horizontal Padding = 20...
            left: 25,
            borderRadius: 20,
            transform: [{ translateX: tabOffsetValue }],
          }}
        ></Animated.View>
      </>
    );
  }

  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await AsyncStorage.getItem("onboarded");
    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="onboarding"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Group>
            <Stack.Screen
              name="onboarding"
              options={{ headerShown: false }}
              component={OnboardingScreen}
            />
            <Stack.Screen name="splash" component={SplashScreen}></Stack.Screen>
            <Stack.Screen name="BottomTab" component={TabBottom} />
            <Stack.Screen name="login" component={Login}></Stack.Screen>

            <Stack.Screen
              name="camera"
              component={CameraComponent}
            ></Stack.Screen>

            <Stack.Screen
              name="changepassword"
              component={ChangePassword}
            ></Stack.Screen>

            <Stack.Screen
              name="mealdetails"
              component={MealDetail}
            ></Stack.Screen>
            <Stack.Screen
              name="updatemeal"
              component={UpdateMeal}
            ></Stack.Screen>
            <Stack.Screen name="newmeal" component={NewMeal}></Stack.Screen>

            <Stack.Screen name="birds" component={Birds}></Stack.Screen>
            <Stack.Screen name="newbird" component={NewBird}></Stack.Screen>
            <Stack.Screen
              name="updatebird"
              component={UpdateBird}
            ></Stack.Screen>
            <Stack.Screen
              name="birddetail"
              component={DetailBird}
            ></Stack.Screen>

            <Stack.Screen name="products" component={Products}></Stack.Screen>
            <Stack.Screen
              name="productdetail"
              component={ProductDetail}
            ></Stack.Screen>
            <Stack.Screen
              name="newproduct"
              component={NewProduct}
            ></Stack.Screen>
            <Stack.Screen
              name="updateproduct"
              component={UpdateProduct}
            ></Stack.Screen>

            <Stack.Screen
              name="orderdetail"
              component={OrdersDetail}
            ></Stack.Screen>

            <Stack.Screen
              name="updateprofile"
              component={UpdateProfile}
            ></Stack.Screen>
            <Stack.Screen
              name="categories"
              component={GetCategories}
            ></Stack.Screen>
            <Stack.Screen
              name="addcategory"
              component={AddCategory}
            ></Stack.Screen>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Group>
            <Stack.Screen name="splash" component={SplashScreen}></Stack.Screen>
            <Stack.Screen name="BottomTab" component={TabBottom} />
            <Stack.Screen name="login" component={Login}></Stack.Screen>

            <Stack.Screen
              name="camera"
              component={CameraComponent}
            ></Stack.Screen>

            <Stack.Screen
              name="changepassword"
              component={ChangePassword}
            ></Stack.Screen>
            <Stack.Screen
              name="updateprofile"
              component={UpdateProfile}
            ></Stack.Screen>
            <Stack.Screen
              name="mealdetails"
              component={MealDetail}
            ></Stack.Screen>
            <Stack.Screen
              name="updatemeal"
              component={UpdateMeal}
            ></Stack.Screen>
            <Stack.Screen name="newmeal" component={NewMeal}></Stack.Screen>

            <Stack.Screen name="birds" component={Birds}></Stack.Screen>
            <Stack.Screen name="newbird" component={NewBird}></Stack.Screen>
            <Stack.Screen
              name="updatebird"
              component={UpdateBird}
            ></Stack.Screen>
            <Stack.Screen
              name="birddetail"
              component={DetailBird}
            ></Stack.Screen>

            <Stack.Screen name="products" component={Products}></Stack.Screen>
            <Stack.Screen
              name="productdetail"
              component={ProductDetail}
            ></Stack.Screen>
            <Stack.Screen
              name="newproduct"
              component={NewProduct}
            ></Stack.Screen>
            <Stack.Screen
              name="updateproduct"
              component={UpdateProduct}
            ></Stack.Screen>

            <Stack.Screen
              name="orderdetail"
              component={OrdersDetail}
            ></Stack.Screen>
            <Stack.Screen
              name="categories"
              component={GetCategories}
            ></Stack.Screen>
            <Stack.Screen
              name="addcategory"
              component={AddCategory}
            ></Stack.Screen>
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function getWidth() {
  let width = Dimensions.get("window").width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total five Tabs...
  return width / 4;
}

export default Main;
