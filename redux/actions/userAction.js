import axios from "axios";
import { server } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "registerRequest",
    });

    const { data } = await axios.post(`${server}/user/new`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    dispatch({
      type: "registerSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "registerFail",
      payload: error.response.data.message,
    });
  }
};

export const login =
  (email, password, role = "staff") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "loginRequest",
      });

      //    Axios here
      const { data } = await axios.post(
        `${server}/auth/login`,
        {
          email,
          password,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      AsyncStorage.setItem("token", data.data.accessToken);

      dispatch({
        type: "loginSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "loginFail",
        payload: error.response.data.message,
      });
      console.log(error);
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });

    // Get token
    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    //    Axios here
    const { data } = await axios.get(`${server}/account/profile`, {
      withCredentials: true,
      headers: headers,
    });

    dispatch({
      type: "loadUserSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });

    await AsyncStorage.removeItem("token");

    dispatch({
      type: "logoutSuccess",
      payload: "Logout Successfully",
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};
