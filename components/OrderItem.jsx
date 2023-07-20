import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Button } from "react-native-paper";

export function formatCurrency(number) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(number);
}

const OrderItem = ({
  navigation,
  id,
  name,
  phone,
  price,
  orderCode,
  shippingAddress,
  status,
  paymentMethod,
  orderDate,
  i = 0,
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("orderdetail", { id })}
      style={{
        ...styles.container,
        backgroundColor: i % 2 === 0 ? colors.color2 : colors.color3,
        overflow: "hidden",
      }}
    >
      <Text
        style={{
          ...styles.text,
          backgroundColor: i % 2 === 0 ? colors.color3 : colors.color1,
        }}
      >
        ID - #{orderCode}
      </Text>
      <TextBox title={"Customer Name"} value={name} i={i}></TextBox>
      <TextBox title={"Phone"} value={phone} i={i}></TextBox>
      <TextBox title={"Price"} value={price} i={i}></TextBox>
      <TextBox title={"Status"} value={status} i={i}></TextBox>
      <TextBox title={"Payment Method"} value={paymentMethod} i={i}></TextBox>
      <TextBox title={"Order Date"} value={orderDate} i={i}></TextBox>
      <TextBox title={"Address"} value={shippingAddress} i={i}></TextBox>
    </TouchableOpacity>
  );
};

const TextBox = ({ title, value, i }) => (
  <Text
    style={{
      marginVertical: 6,
      color: i % 2 === 0 ? colors.color3 : colors.color2,
    }}
  >
    <Text style={{ fontWeight: "900" }}>{title} - </Text>
    {typeof value === "number" ? formatCurrency(value) : value}
  </Text>
);

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  text: {
    color: colors.color2,
    fontSize: 16,
    fontWeight: "900",
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
