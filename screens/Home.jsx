import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, defaultStyle } from "../styles/styles";
import Heading from "../components/Heading";
import Chart from "../components/Chart";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import Loader from "../components/Loader";
import { server } from "../redux/store";
import { Alert } from "react-native";

const Home = () => {
  const isFocused = useIsFocused();

  const [totalProduct, setTotalProduct] = useState(0);
  const [totalMeal, setTotalMeal] = useState(0);
  const [createdOrder, setCreatedOrder] = useState(0);
  const [confirmedOrder, setConfirmedOrder] = useState(0);
  const [orderCompleted, setOrderCompleted] = useState(0);
  const [orderCancel, setOrderCancel] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${server}/store/staff-dashboard`, {
          headers,
        });

        setTotalProduct(response.data.data.TotalProduct);
        setTotalMeal(response.data.data.TotalMeal);

        setCreatedOrder(response.data.data.CreatedOrder);
        setConfirmedOrder(response.data.data.ConfirmedOrder);
        setOrderCompleted(response.data.data.OrderCompleted);
        setOrderCancel(response.data.data.OrderCancel);

        const totalOrder =
          response.data.data.CreatedOrder +
          response.data.data.ConfirmedOrder +
          response.data.data.OrderCompleted +
          response.data.data.OrderCancel;
        setTotalOrder(totalOrder);
        setLoading(false);
      } catch (error) {
        console.log(error);
        Alert.alert(
          //title
          "Error",
          //body
          error,
          [
            {
              text: "OK",
              onPress: () => console.log("Yes Pressed"),
            },
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
        dispatch({
          type: "clearError",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [isFocused]);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
          <View
            style={{
              paddingTop: 50,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            {/* Heading */}
            <Heading text1="Our" text2="Dashboard" />
          </View>
          <ScrollView
            showsVerticalScrollIndicator="false"
            // style={{ height: 400 }}
          >
            <View
              style={{
                flex: 1,
                marginTop: 20,
              }}
            >
              <View style={styles.container}>
                <View style={[styles.card, styles.card2]}>
                  <View style={styles.cardContainer}>
                    <FontAwesome5
                      name="cheese"
                      size={30}
                      color={colors.color1}
                    ></FontAwesome5>
                    <Text style={[styles.cardTextNumber, { color: "#0D337E" }]}>
                      {totalProduct}
                    </Text>
                    <Text style={[styles.cardText, { color: "#0D337E" }]}>
                      Total Product
                    </Text>
                  </View>
                </View>
                <View style={[styles.card, styles.card4]}>
                  <View style={styles.cardContainer}>
                    <FontAwesome5
                      name="paperclip"
                      size={20}
                      color={colors.color1}
                    ></FontAwesome5>
                    <Text style={[styles.cardTextNumber, { color: "#B42A56" }]}>
                      {totalOrder}
                    </Text>
                    <Text style={[styles.cardText, { color: "#B42A56" }]}>
                      Total Order
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.container}>
                <View style={[styles.card, styles.card3]}>
                  <View style={styles.cardContainer}>
                    <FontAwesome5
                      name="clipboard-list"
                      size={30}
                      color={colors.color1}
                    ></FontAwesome5>
                    <Text style={[styles.cardTextNumber, { color: "#B37904" }]}>
                      {totalMeal}
                    </Text>
                    <Text style={[styles.cardText, { color: "#B37904" }]}>
                      Total Meal
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.chartContainer}>
              <Text
                style={[
                  styles.cardText,

                  {
                    color: "#56348D",
                    fontSize: 20,
                    fontWeight: "800",
                    textAlign: "center",
                  },
                ]}
              >
                Number of type order in total order
              </Text>
              <Chart
                createdOrder={createdOrder}
                confirmOrder={confirmedOrder}
                orderCompleted={orderCompleted}
                orderCancel={orderCancel}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: Dimensions.get("window").width / 2.4,
    height: 120,
    borderRadius: 20,
    marginBottom: 20,
  },
  card1: {
    backgroundColor: "#C9FACD",
  },
  card2: {
    backgroundColor: "#D0F2FE",
  },
  card3: {
    backgroundColor: "#FFF8CE",
  },
  card4: {
    backgroundColor: "#FADFE8",
  },

  cardContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%",
  },

  cardTextNumber: {
    fontWeight: "900",
    fontSize: 18,
  },

  cardText: {
    fontWeight: "500",
    fontSize: 16,
  },

  chartContainer: {
    backgroundColor: colors.color2,
    height: 300,
    elevation: 5,
    borderColor: "#EBEBEB",
    shadowColor: "black",
    borderRadius: 8,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    borderWidth: 0.2,
    shadowOpacity: 0.1,
    margin: 5,
    padding: 15,
    paddingHorizontal: 10,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
  },
});
