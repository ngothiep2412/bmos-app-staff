import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getOrderDetail, processOrder } from "../../redux/actions/otherAction";
import {
  colors,
  defaultImgFood,
  defaultStyle,
  formHeading,
} from "../../styles/styles";
import Header from "../../components/Header";
import { Image } from "react-native";
import { Button } from "react-native-paper";
import { useMessageAndErrorOther } from "../../utils/hooks";
import Loader from "../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { server } from "../../redux/store";
import { formatCurrency } from "../../components/OrderItem";

const OrdersDetail = ({ navigation, route: { params } }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [id, setId] = useState();
  // const { loading, order } = useSelector((state) => state.other);
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState({});

  const processOrderLoading = useMessageAndErrorOther(
    dispatch,
    navigation,
    "adminorders"
  );

  const updateHandler = (id, status) => {
    dispatch(processOrder(params.id, status));
  };

  useEffect(() => {
    setId(params.id);
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const { data } = await axios.get(`${server}/order/${params.id}`, {
          withCredentials: true,
          headers: headers,
        });
        setOrder(data.data);
        setLoading(false);
        console.log(data.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, isFocused]);
  return loading ? (
    <Loader></Loader>
  ) : (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      <Header back={true}></Header>

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formHeading}>Order Detail</Text>

        <ScrollView
          style={{
            maxHeight:
              order.orderStatus === "confirmed"
                ? 600
                : order.orderStatus === "delivering"
                ? 600
                : 650,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ minHeight: 600 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 16, fontWeight: "800" }}>
                  {order.orderCode}
                </Text>
                <Text style={{ fontSize: 14, marginTop: 5 }}>
                  {order.orderDate}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color:
                      order.orderStatus === "canceled"
                        ? colors.color1
                        : colors.price,
                  }}
                >
                  {order.orderStatus}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{ marginTop: 20, fontSize: 16, color: colors.color3 }}
              >
                Name
              </Text>
              <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "800" }}>
                {order.name}
              </Text>
            </View>

            <View>
              <Text
                style={{ marginTop: 20, fontSize: 16, color: colors.color3 }}
              >
                Phone
              </Text>
              <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "800" }}>
                {order.phone}
              </Text>
            </View>
            <Text style={{ marginTop: 20, fontSize: 16, color: colors.color3 }}>
              Delivery To
            </Text>
            <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "800" }}>
              {order.shippingAddress}
            </Text>
            <Text style={{ marginTop: 20, fontSize: 16, color: colors.color3 }}>
              Payment Method
            </Text>
            <Text
              style={{
                marginTop: 5,
                fontSize: 16,
                fontWeight: "800",
                color:
                  order.transactions[0]?.paymentType === "MOMO"
                    ? "#A00061"
                    : colors.color3,
              }}
            >
              {order.transactions[0]?.paymentType}
            </Text>

            <View
              style={{ borderWidth: 1, borderColor: "#B1AEAD", marginTop: 30 }}
            ></View>
            <Text
              style={{
                marginTop: 20,
                fontSize: 16,
                color: colors.color3,
                marginBottom: 20,
              }}
            >
              Meal
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                elevation: 5,
                borderRadius: 10,
                backgroundColor: colors.color2,
                height: 120,
                paddingHorizontal: 20,
              }}
            >
              <Image
                source={{
                  uri: order.orderDetails[0].meal.image,
                }}
                style={{ height: 100, resizeMode: "contain", flex: 1 }}
              ></Image>
              <View
                style={{
                  marginLeft: 20,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.color3,
                    fontWeight: 500,
                    marginBottom: 20,
                  }}
                >
                  {order.orderDetails[0].meal.title}
                </Text>

                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      marginLeft: 2,
                      fontSize: 16,
                      color: colors.color3,
                      fontWeight: 700,
                      marginRight: 2,
                    }}
                  >
                    {formatCurrency(order.totalPrice)}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{ borderWidth: 1, borderColor: "#B1AEAD", marginTop: 30 }}
            ></View>
            <Text
              style={{
                marginTop: 20,
                fontSize: 16,
                color: colors.color3,
                marginBottom: 20,
              }}
            >
              Product Detail
            </Text>

            {order.orderDetails[0]?.meal?.productMeals.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  elevation: 5,
                  borderRadius: 10,
                  backgroundColor: colors.color2,
                  height: 120,
                  paddingHorizontal: 20,
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{
                    uri: item.product.image,
                  }}
                  style={{ height: 100, resizeMode: "contain", flex: 1 }}
                ></Image>
                <View
                  style={{
                    marginLeft: 20,
                    flex: 3,
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 16,
                      color: colors.color3,
                      fontWeight: 500,
                      marginBottom: 20,
                    }}
                  >
                    {item.product.productName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.color1,
                      fontWeight: 500,
                      marginBottom: 20,
                    }}
                  >
                    x {item.amount}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.color1,
                      fontWeight: 700,
                    }}
                  >
                    $
                  </Text>
                  <Text
                    style={{
                      marginLeft: 2,
                      fontSize: 16,
                      color: colors.color3,
                      fontWeight: 700,
                    }}
                  >
                    {item.product.price}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      {order.orderStatus === "confirmed" ? (
        <Button
          icon={"update"}
          mode={"contained"}
          textColor={colors.color2}
          style={{
            bottom: 50,
            position: "absolute",
            left: 20,
            width: "100%",
            backgroundColor: colors.color3,
          }}
          onPress={() => updateHandler(id, order.orderStatus)}
          loading={processOrderLoading}
        >
          Update
        </Button>
      ) : order.orderStatus === "delivering" ? (
        <Button
          icon={"update"}
          mode={"contained"}
          textColor={colors.color2}
          style={{
            bottom: 50,
            position: "absolute",
            left: 20,
            width: "100%",
            backgroundColor: colors.color3,
          }}
          onPress={() => updateHandler(id, order.orderStatus)}
          loading={processOrderLoading}
        >
          Update
        </Button>
      ) : null}
    </View>
  );
};

export default OrdersDetail;

const styles = StyleSheet.create({});
