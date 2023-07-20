import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle, formStyles } from "../../styles/styles";
import ButtonBox from "../../components/ButtonBox";

import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import MealListItem from "../../components/MealListItem";
import { useAdminMeals, useSetMealBirds } from "../../utils/hooks";
import Loader from "../../components/Loader";
import { TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { server } from "../../redux/store";
import axios from "axios";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";

const AdminMeals = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { loading, meals } = useAdminMeals(dispatch, isFocused);
  const [birds, setBirds] = useState([]);
  useSetMealBirds(setBirds, isFocused);

  const navigationHandler = (text) => {
    switch (text) {
      case "Add Meal":
        navigation.navigate("newmeal");
        break;
      case "Birds":
        navigation.navigate("birds");
        break;
      case "Products":
        navigation.navigate("products");
        break;
      case "Categories":
        navigation.navigate("categories");
        break;
      default:
        navigation.navigate("adminmeals");
        break;
    }
  };
  const [searchText, setSearchText] = useState("");

  const [filteredMeals, setFilteredMeals] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [selectedBird, setSelectedBird] = useState(null);

  const handleSearch = async (text) => {
    setSearchText(text);
    setLoadingSearch(true);

    try {
      const token = await AsyncStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let url;

      if (selectedBird === null) {
        url = `${server}/meal/title?title=${text}`;
      } else {
        url = `${server}/meal/title?title=${text}&idBird=${selectedBird}`;
      }

      const response = await axios.get(url, {
        headers,
      });
      setLoadingSearch(false);
      setFilteredMeals(response.data.data);
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
      setLoadingSearch(false);
    }
  };

  useEffect(() => {
    setFilteredMeals(meals);
    setSearchText(null);
    setSelectedBird(null);
  }, [meals, isFocused]);

  const renderBirdItem = ({ item }) => (
    <TouchableOpacity
      style={{
        height: 40,
        borderRadius: 20,
        marginBottom: 20,
        padding: 10,
        marginRight: 10,
        backgroundColor: item.id === selectedBird ? colors.color1 : "white",
      }}
      onPress={() => handleBirdPress(item)}
    >
      <Text>{item.birdName}</Text>
    </TouchableOpacity>
  );

  const handleBirdPress = (bird) => {
    setLoadingSearch(true);
    if (selectedBird === bird.id) {
      setSelectedBird(null);

      if (searchText === null && selectedBird === bird.id) {
        console.log(meals);
        setFilteredMeals(meals);
      }
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem("token");

          const headers = {
            Authorization: `Bearer ${token}`,
          };
          console.log(searchText);
          if (searchText !== null && selectedBird === bird.id) {
            url = `${server}/meal/title?title=${searchText}`;
            const response = await axios.get(url, {
              headers,
            });
            console.log(url);
            setFilteredMeals(response.data.data);
          }

          setLoadingSearch(false);
        } catch (error) {
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
          setLoadingSearch(false);
        }
      };
      fetchData();
    } else {
      setSelectedBird(bird.id);
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem("token");

          const headers = {
            Authorization: `Bearer ${token}`,
          };
          let url;

          if (searchText === null) {
            url = `${server}/meal/title?idBird=${bird.id}`;
          } else {
            url = `${server}/meal/title?title=${searchText}&idBird=${bird.id}`;
          }
          const response = await axios.get(url, {
            headers,
          });
          setFilteredMeals(response.data.data);
          setLoadingSearch(false);
        } catch (error) {
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
          setLoadingSearch(false);
        }
      };
      fetchData();
    }
  };

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
        {/* Heading */}
        <View style={formStyles.heading}>
          <Text style={formStyles.headingText}>All Meals</Text>
        </View>

        {loading ? (
          <Loader />
        ) : (
          <>
            <View
              style={{
                backgroundColor: colors.color3,
                borderRadius: 20,
                alignItems: "center",
              }}
            ></View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-between",
                }}
              >
                <ButtonBox
                  icon={"format-list-bulleted-square"}
                  text={"Products"}
                  handler={navigationHandler}
                />

                <ButtonBox
                  icon={"plus"}
                  text={"Add Meal"}
                  handler={navigationHandler}
                  reverse={true}
                />
                <ButtonBox
                  icon={"format-list-bulleted-square"}
                  text={"Birds"}
                  handler={navigationHandler}
                />

                <ButtonBox
                  icon={"format-list-bulleted-square"}
                  text={"Categories"}
                  handler={navigationHandler}
                />
              </View>
            </View>

            <View style={{ marginBottom: 20, marginTop: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                List Meals
              </Text>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Search Meal"
              onChangeText={handleSearch}
              activeUnderlineColor={colors.color1}
              value={searchText}
            />
            <View>
              <FlatList
                data={birds}
                showsHorizontalScrollIndicator={false}
                renderItem={renderBirdItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
              />
            </View>

            <View
              style={{
                width: "100%",
                height: Dimensions.get("window").height / 2.3,
              }}
            >
              {loadingSearch ? (
                <Loader></Loader>
              ) : filteredMeals.length === 0 ? (
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
                  <Text>You have no meals at this moment</Text>
                </View>
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={filteredMeals}
                  numColumns={2} // Chia thành 2 cột
                  renderItem={({ item, index }) => (
                    <MealListItem
                      navigate={navigation}
                      key={item.id}
                      id={item.id}
                      i={index}
                      name={item.title}
                      imgSrc={item.image}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              )}
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default AdminMeals;

const styles = StyleSheet.create({
  searchInput: {
    height: 50,

    borderWidth: 1,
    borderColor: colors.color3,
    marginBottom: 16,

    paddingHorizontal: 30,

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
