import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultStyle,
  formStyles,
  inputOptions,
} from "../styles/styles";
import { Button, TextInput } from "react-native-paper";
import { login } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { useMessageAndErrorUser } from "../utils/hooks";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loading = useMessageAndErrorUser(navigation, dispatch, "BottomTab");

  const submitHandler = () => {
    dispatch(login(email, password, (role = "staff")));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={defaultStyle}>
        {/* Heading */}

        <View style={formStyles.heading}>
          <Text style={formStyles.headingText}>Login</Text>
        </View>

        <View style={formStyles.container}>
          <TextInput
            {...inputOptions}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          ></TextInput>

          <TextInput
            {...inputOptions}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          ></TextInput>

          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => navigation.navigate("forgetpassword")}
          >
            <Text style={formStyles.forget}>Forget Password?</Text>
          </TouchableOpacity>

          <Pressable
            style={formStyles.btn}
            disabled={email === "" || password === ""}
            onPress={submitHandler}
          >
            <Button
              loading={loading}
              textColor={colors.color2}
              disabled={email === "" || password === ""}
              style={styles.btn}
              onPress={submitHandler}
            >
              Log In
            </Button>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
