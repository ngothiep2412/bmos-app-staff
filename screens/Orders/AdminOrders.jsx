import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  formStyles,
} from "../../styles/styles";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import OrderItem from "../../components/OrderItem";
import { useGetOrders, useMessageAndErrorOther } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { Headline, Provider } from "react-native-paper";
import { useDispatch } from "react-redux";
import { loadOrder, processOrder } from "../../redux/actions/otherAction";
import DropDown from "react-native-paper-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { server } from "../../redux/store";

const AdminOrders = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { orders } = useGetOrders(setLoading, true);

  const [ordersRender, setOrdersRender] = useState([]);

  useEffect(() => {
    setStatus("");
    setOrdersRender(orders);
  }, [isFocused]);

  const [showDropDown, setShowDropDown] = useState(false);

  const [status, setStatus] = useState("");

  const statusList = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Created",
      value: "Created",
    },
    {
      label: "Confirmed",
      value: "Confirmed",
    },
    {
      label: "Delivering",
      value: "Delivering",
    },
    {
      label: "Completed",
      value: "Completed",
    },
    {
      label: "Canceled",
      value: "Canceled",
    },
  ];

  useEffect(() => {
    let url = `${server}/order/store?status=${status}`;
    if (status === "") {
      url = `${server}/order/store`;
    }
    setLoading(true);
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(url, { headers });
        setOrdersRender(response.data.data);
        setLoading(false);
      } catch (error) {
        Alert.alert(
          //title
          "Error",
          //body
          error.response.data.message,
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
  }, [status]);

  return (
    <Provider>
      <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
        {/* Heading */}
        <View style={formStyles.heading}>
          <Text style={formStyles.headingText}>All Orders</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              flex: 0,
              fontSize: 16,
              fontWeight: "700",
              marginRight: 10,
            }}
          >
            Status:
          </Text>
          <View style={{ flex: 1 }}>
            <DropDown
              label={"Status"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={status}
              setValue={setStatus}
              list={statusList}
            />
          </View>
        </View>

        <View style={styles.spacerStyle} />
        {loading ? (
          <Loader></Loader>
        ) : (
          <View style={{ padding: 10, flex: 1 }}>
            {ordersRender.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 30, fontWeight: "600" }}>
                  Empty list!
                </Text>
                <Text>You have no orders at this moment</Text>
              </View>
            ) : (
              <ScrollView
                style={{ maxHeight: 700 }}
                showsVerticalScrollIndicator={false}
              >
                <View
                  style={{
                    justifyContent: "center",
                    minHeight: 500,
                  }}
                >
                  {ordersRender.map((item, index) => (
                    <OrderItem
                      key={item.id}
                      id={item.id}
                      i={index}
                      name={item.name}
                      phone={item.phone}
                      price={item.totalPrice}
                      orderCode={item.orderCode}
                      status={item.orderStatus}
                      paymentMethod={item.transactions[0]?.paymentType}
                      shippingAddress={item?.shippingAddress}
                      orderDate={item.orderDate}
                      navigation={navigation}
                    ></OrderItem>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        )}
      </View>
    </Provider>
  );
};

export default AdminOrders;

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: "red",
  },
  pickerIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    marginTop: -6,
  },
  pickerText: {
    fontSize: 16,
    color: "#333",
  },
});
