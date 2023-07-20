import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Avatar } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";

import { useIsFocused } from "@react-navigation/native";
import {
  colors,
  defaultImg,
  defaultProduct,
  defaultStyle,
  formStyles,
} from "../styles/styles";
import { getloadUser, useMessageAndErrorUser } from "../utils/hooks";
import { loadUser, logout } from "../redux/actions/userAction";
import Loader from "../components/Loader";
import ButtonBox from "../components/ButtonBox";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { updatePic } from "../redux/actions/otherAction";

const Profile = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await AsyncStorage.removeItem("token");
    navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
    Alert.alert(
      //title
      "Successfully",
      //body
      "Logout successfully",
      [
        {
          text: "OK",
          onPress: () => console.log("Yes Pressed"),
        },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  };

  const navigateHandler = (text) => {
    switch (text) {
      case "Profile":
        navigation.navigate("updateprofile");
        break;
      case "Password":
        navigation.navigate("changepassword");
        break;
      case "Sign Out":
        logoutHandler();
        break;
      default:
        break;
    }
  };

  const { loading, user } = getloadUser(dispatch, isFocused);

  return (
    <>
      <View style={defaultStyle}>
        {/* Heading */}
        <View style={formStyles.heading}>
          <Text style={formStyles.headingText}>Profile</Text>
        </View>
        {/* Loading */}

        {loading ? (
          <Loader></Loader>
        ) : (
          <>
            <View style={styles.container}>
              <Avatar.Image
                source={{
                  uri: user?.avatar,
                }}
                size={100}
                style={{ backgroundColor: colors.color1 }}
              ></Avatar.Image>

              <Text style={styles.name}>{user?.fullName}</Text>
              <Text style={{ fontWeight: "300", color: colors.color2 }}>
                {user?.email}
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-between",
                }}
              >
                <ButtonBox
                  handler={navigateHandler}
                  text={"Profile"}
                  icon={"pencil"}
                ></ButtonBox>
                <ButtonBox
                  handler={navigateHandler}
                  icon={"pencil"}
                  text={"Password"}
                ></ButtonBox>
                <ButtonBox
                  handler={navigateHandler}
                  text={"Sign Out"}
                  icon={"exit-to-app"}
                ></ButtonBox>
              </View>
            </View>
          </>
        )}
      </View>
      {/* <Footer activeRoute="adminusers"></Footer> */}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    elevation: 7,
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    color: colors.color2,
  },
});
