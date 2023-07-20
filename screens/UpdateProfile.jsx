import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultProduct,
  defaultStyle,
  formStyles,
  inputOptions,
} from "../styles/styles";
import { Avatar, Button, TextInput } from "react-native-paper";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useMessageAndErrorOther } from "../utils/hooks";
import { updateProfile } from "../redux/actions/otherAction";
import DateTimePicker from "@react-native-community/datetimepicker";
import mime from "mime";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";

const UpdateProfile = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.user);
  const isFocused = useIsFocused();

  const [fullName, setFullName] = useState(user?.fullName);
  const [dob, setDob] = useState(new Date(user?.dob));
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [avatar, setAvtar] = useState(user?.avatar);

  const disableBtn = !fullName || !dob || !phoneNumber;
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDob(currentDate);
  };
  const dispatch = useDispatch();

  const loading = useMessageAndErrorOther(dispatch, navigation, "profile");

  function isVietnamesePhoneNumber(phoneNumber) {
    // Biểu thức chính quy kiểm tra số điện thoại Việt Nam
    const vietnamesePhoneNumberRegex =
      /^(09|03|07|08|05)\d{8}$|^(\+84|84|0)(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/;

    return vietnamesePhoneNumberRegex.test(phoneNumber);
  }

  const submitHandler = () => {
    const dobString = dob.toISOString().split("T")[0];

    console.log(dobString);
    const id = user.id;
    const myForm = new FormData();

    myForm.append("file", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });

    if (isVietnamesePhoneNumber(phoneNumber)) {
      // console.log(id);
      dispatch(updateProfile(fullName, dobString, phoneNumber, id, myForm));
    } else {
      Alert.alert(
        //title
        "Error",
        //body
        "Your phone number is not in the correct format",
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
    }
  };

  useEffect(() => {
    if (route.params?.image) {
      setAvtar(route.params.image);
      // dispatch updatePic Here
    }
  }, [route.params, isFocused]);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={defaultStyle}>
        <Header back={true}></Header>
        {/* Heading */}
        <View
          style={{
            marginBottom: 20,
            height: 50,
            backgroundColor: colors.color3,
            width: "100%",
            marginTop: 60,
            justifyContent: "center",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <Text style={formStyles.headingText}>Edit Profile</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: 20,
            maxHeight: 660,
            borderRadius: 10,
            backgroundColor: colors.color3,
          }}
        >
          <View style={{ minHeight: 660 }}>
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
                  uri: avatar ? avatar : defaultProduct,
                }}
              />
            </View>

            <Button
              onPress={() =>
                navigation.navigate("camera", {
                  updateProfile: true,
                })
              }
              textColor={colors.color1}
            >
              Change image
            </Button>
            <Text style={{ color: "white" }}>Name</Text>
            <View>
              <TextInput
                {...inputOptions}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
              ></TextInput>
              <Text style={{ color: "white" }}>DOB</Text>
              <View
                style={{
                  height: 50,
                  backgroundColor: colors.color2,
                  marginVertical: 10,
                  marginHorizontal: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.color2,
                }}
              >
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dob}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                ></DateTimePicker>
              </View>
              <Text style={{ color: "white" }}>Phone Number</Text>
              <TextInput
                {...inputOptions}
                placeholder="Phone Number"
                keyboardType="number-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              ></TextInput>

              <Button
                textColor={colors.color2}
                style={{
                  backgroundColor: colors.color1,
                  margin: 20,
                  padding: 6,
                  marginBottom: 50,
                }}
                icon={"update"}
                onPress={submitHandler}
                loading={loading}
                disabled={disableBtn}
              >
                Update
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({});
