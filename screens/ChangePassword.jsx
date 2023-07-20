import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { updatePassword } from "../redux/actions/otherAction";
import { useMessageAndErrorOther } from "../utils/hooks";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const loading = useMessageAndErrorOther(dispatch, null, null, null);

  const submitHandler = () => {
    dispatch(updatePassword(oldPassword, newPassword, confirmNewPassword));
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={defaultStyle}>
        <Header back={true} />
        {/* Heading */}
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={formHeading}>Change Password</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            maxHeight: 660,
            padding: 20,
            borderRadius: 10,
            backgroundColor: colors.color3,
          }}
        >
          <View style={{ justifyContent: "center", minHeight: 660 }}>
            <TextInput
              {...inputOptions}
              placeholder="Old Password"
              secureTextEntry={true}
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              {...inputOptions}
              placeholder="New Password"
              secureTextEntry={true}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              {...inputOptions}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
            />

            <Button
              loading={loading}
              textColor={colors.color2}
              disabled={
                oldPassword === "" ||
                newPassword === "" ||
                confirmNewPassword === ""
              }
              icon={"update"}
              style={styles.btn}
              onPress={submitHandler}
            >
              Update
            </Button>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
