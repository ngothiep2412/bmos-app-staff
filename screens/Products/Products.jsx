import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { colors, defaultStyle, formHeading } from "../../styles/styles";
import Loader from "../../components/Loader";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  useAdminCategory,
  useAdminProducts,
  useSetCategory,
} from "../../utils/hooks";
import { MasonryFlashList } from "@shopify/flash-list";
import { BlurView } from "expo-blur";
import { TextInput } from "react-native-paper";
import { server } from "../../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AnimatedButton from "../../components/AnimationButton";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";

const Products = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { loading, products } = useAdminProducts(dispatch, isFocused);
  const [searchText, setSearchText] = useState("");

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const navigateAdd = () => {
    navigation.navigate("newproduct");
  };

  const handleSearch = async (text) => {
    setSearchText(text);
    setLoadingSearch(true);

    try {
      const token = await AsyncStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let url;

      if (selectedCategory === null) {
        url = `${server}/product/search?name=${text}`;
      } else {
        url = `${server}/product/search?name=${text}&categoryId=${selectedCategory}`;
      }

      const response = await axios.get(url, {
        headers,
      });
      setLoadingSearch(false);
      setFilteredProducts(response.data.data);
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

      setLoadingSearch(false);
    }
  };

  const [categories, setCategories] = useState([]);

  useSetCategory(setCategories, isFocused);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setFilteredProducts(products);
    setSearchText(null);
    setSelectedCategory(null);
  }, [products, isFocused]);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={{
        height: 40,
        borderRadius: 20,
        marginBottom: 20,
        padding: 10,
        marginRight: 10,
        backgroundColor: item.id === selectedCategory ? colors.color1 : "white",
      }}
      onPress={() => handleCategoryPress(item)}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {}, [filteredProducts]);

  const handleCategoryPress = (category) => {
    setLoadingSearch(true);
    if (selectedCategory === category.id) {
      setSelectedCategory(null);

      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem("token");

          const headers = {
            Authorization: `Bearer ${token}`,
          };

          if (searchText !== null && selectedCategory === category.id) {
            url = `${server}/product/search?name=${searchText}`;
            const response = await axios.get(url, {
              headers,
            });
            setFilteredProducts(response.data.data);
          }
          if (searchText === null && selectedCategory === category.id) {
            setFilteredProducts(products);
          }
          setLoadingSearch(false);
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

          setLoadingSearch(false);
        }
      };
      fetchData();
    } else {
      setSelectedCategory(category.id);
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem("token");

          const headers = {
            Authorization: `Bearer ${token}`,
          };
          let url;

          if (searchText === null) {
            url = `${server}/product/search?categoryId=${category.id}`;
          } else {
            url = `${server}/product/search?name=${searchText}&categoryId=${category.id}`;
          }
          const response = await axios.get(url, {
            headers,
          });
          setFilteredProducts(response.data.data);
          setLoadingSearch(false);
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

          setLoadingSearch(false);
        }
      };
      fetchData();
    }
  };

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      <Header back={true}></Header>

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formHeading}>All Products</Text>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <>
          <View
            style={{
              margin: 10,
              height: 70,
              width: 70,
              borderRadius: 100,
              backgroundColor: colors.color1,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: 9999,
              right: 20,
              bottom: 80,
              borderColor: "#EBEBEB",
              shadowColor: colors.color1,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
            }}
          >
            {/* Nội dung màn hình */}
            <TouchableOpacity onPress={navigateAdd}>
              <Ionicons size={35} color={"white"} name="add"></Ionicons>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <FlatList
              data={categories}
              showsHorizontalScrollIndicator={false}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
            />

            <TextInput
              style={styles.searchInput}
              placeholder="Search Product"
              onChangeText={handleSearch}
              activeUnderlineColor={colors.color1}
              value={searchText}
            />

            <View
              style={{
                width: "100%",
                height: Dimensions.get("window").height / 1.5,
              }}
            >
              {loadingSearch ? (
                <Loader></Loader>
              ) : filteredProducts.length === 0 ? (
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
                  <Text>You have no products at this moment</Text>
                </View>
              ) : (
                <MasonryFlashList
                  showsVerticalScrollIndicator={false}
                  data={filteredProducts}
                  contentContainerStyle={{ paddingHorizontal: 10 }}
                  numColumns={2}
                  renderItem={({ item, i }) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("productdetail", { id: item.id })
                      }
                    >
                      <View style={{ padding: 6 }}>
                        <View
                          style={{
                            aspectRatio: i === 0 ? 1 : 2 / 3,
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: 24,
                          }}
                        >
                          <Image
                            source={{
                              uri: item.image,
                            }}
                            resizeMode="cover"
                            style={StyleSheet.absoluteFill}
                          />
                          <TouchableOpacity
                            style={{
                              top: 10,
                              right: 10,
                              alignSelf: "center",
                              position: "absolute",
                            }}
                          >
                            {item.status ? (
                              <AnimatedButton status={item.status} />
                            ) : (
                              <AnimatedButton status={item.status} />
                            )}
                          </TouchableOpacity>
                          <View
                            style={[
                              StyleSheet.absoluteFill,
                              {
                                padding: 12,
                              },
                            ]}
                          >
                            <View style={{ flex: 1 }} />
                            <BlurView
                              style={{
                                flexDirection: "row",
                                backgroundColor: "rgba(0,0,0,0.5)",
                                alignItems: "center",
                                padding: 6,
                                borderRadius: 100,
                                overflow: "hidden",
                              }}
                              intensity={20}
                            >
                              <Text
                                style={{
                                  flex: 1,
                                  fontSize: 16,
                                  fontWeight: "600",
                                  color: colors.price,
                                  marginLeft: 8,
                                  textAlign: "center",
                                }}
                                numberOfLines={1}
                              >
                                $ {item.price}
                              </Text>
                            </BlurView>
                          </View>
                        </View>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 16,
                            fontWeight: "600",
                            color: colors.color3,
                          }}
                        >
                          {item.productName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  estimatedItemSize={200}
                />
              )}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  searchInput: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.color3,
    marginBottom: 16,
    marginHorizontal: 10,

    backgroundColor: colors.color2,
    overflow: "hidden",
    shadowColor: "black",
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 0.5,
    shadowOpacity: 0.15,
  },
});
