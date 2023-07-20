import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, TextInput } from "react-native-paper";
import { colors } from "../styles/styles";
import Heading from "./Heading";
import { FontAwesome5 } from "@expo/vector-icons";
import AnimatedButton from "./AnimationButton";
import { useIsFocused } from "@react-navigation/native";

const SelectComponentEvening = ({
  setVisibleEvening,
  listproductMealsEvening,
  setListProductMealsEvening,
  products = [],
}) => {
  const selectProductforyHandler = (item) => {
    const newList = [...listproductMealsEvening];
    // Check if the selected item exists in the newList
    const existingItemIndex = newList.findIndex(
      (oldList) => oldList.product.id === item.id
    );
    if (existingItemIndex !== -1) {
      // Increment the amount of the existing item
      newList[existingItemIndex].amount += 1;
    } else {
      // Add the new item to the newList
      newList.push({
        amount: 1,
        product: item,
      });
    }

    setListProductMealsEvening(newList);

    setVisibleEvening(false);
  };

  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    setFilteredProducts(products);
  }, [products, isFocused]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.selectContainer}>
      <TouchableOpacity onPress={() => setVisibleEvening(false)}>
        <Avatar.Icon
          size={30}
          style={{ alignSelf: "flex-end", backgroundColor: colors.color1 }}
          icon={"close"}
        ></Avatar.Icon>
      </TouchableOpacity>

      <Heading style={styles.heading} text1="Our" text2="Products"></Heading>
      <TextInput
        style={styles.searchInput}
        placeholder="Search product"
        onChangeText={handleSearch}
        activeUnderlineColor={colors.color1}
        value={searchText}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ maxHeight: 560, paddingHorizontal: 2 }}
      >
        <View
          style={{
            minHeight: 500,
            marginTop: 10,
          }}
        >
          {filteredProducts?.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => selectProductforyHandler(item)}
            >
              <View style={styles.productContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 70, height: 70, marginLeft: 10 }}
                ></Image>

                <View
                  style={{
                    flex: 1,
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
                    {item.productName}
                  </Text>

                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "800",
                        marginLeft: 5,
                        color: colors.price,
                      }}
                    >
                      $ {item.price}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginRight: 10,
                  }}
                >
                  <AnimatedButton status={item.status} />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 15, marginRight: 2 }}>
                      Quantity:
                    </Text>
                    <Text style={styles.quantity}>{item.remainQuantity}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectComponentEvening;

const styles = StyleSheet.create({
  selectContainer: {
    backgroundColor: colors.color2,
    position: "absolute",
    padding: 20,
    borderRadius: 20,
    width: "100%",
    alignSelf: "center",
    borderColor: "#EBEBEB",
    shadowColor: "black",
    borderRadius: 8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 0.5,
    shadowOpacity: 0.15,
    top: 50,
    zIndex: 99999,
  },

  heading: {
    textAlign: "center",
    marginVertical: 10,
    backgroundColor: colors.color3,
    borderRadius: 5,
    padding: 3,
    color: colors.color2,
  },
  text: {
    fontSize: 17,
    fontWeight: "100",
    textTransform: "uppercase",
    marginVertical: 10,
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
  quantity: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.color1,
  },
  searchInput: {
    marginTop: 10,
    height: 50,
    borderWidth: 1,
    borderColor: colors.color3,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: colors.color2,
  },
});
