import axios from "axios";
import { server, serverUrl } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateMealProduct =
  (
    id,
    status = "true",
    title,
    birdId = "2e5d8f00-14f0-4333-b1b9-6739cbaf4478",
    description,
    image,
    products
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateMealProductRequest",
      });

      const token = await AsyncStorage.getItem("token");
      // console.log("data" + token);
      const { data } = await axios.put(
        `${server}/meal/update}`,
        {
          id: id,
          status: status,
          title: title,
          description: description,
          birdId: birdId,
          image: image,
          products: products,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "updateMealProductSuccess",
        payload: data.message,
      });
    } catch (error) {
      console.log("data" + error.response.data.message);
      dispatch({
        type: "updateMealProductFail",
        payload: error.response.data.message,
      });
    }
  };

export const processOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: "processOrderRequest",
    });
    let url;
    console.log("status: " + status);
    if (status === "confirmed") {
      url = `${server}/order/update-delivery/${id}`;
    } else if (status === "delivering") {
      url = `${server}/order/update-complete/${id}`;
    }
    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.put(
      url,
      {},
      {
        headers,
      }
    );

    dispatch({
      type: "processOrderSuccess",
      payload: response.data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "processOrderFail",
      payload: error.response.data.message,
    });
  }
};

export const getOrderDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getOrderDetailRequest",
    });

    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`${server}/order/${id}`, {
      withCredentials: true,
      headers: headers,
    });

    dispatch({
      type: "getOrderDetailSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "getOrderDetailFail",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    console.log(oldPassword);
    console.log(newPassword);
    console.log(confirmNewPassword);

    try {
      dispatch({
        type: "updatePasswordRequest",
      });
      const token = await AsyncStorage.getItem("token");

      const { data } = await axios.post(
        `${server}/account/change-password`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: "updatePasswordFail",
        payload: "Check your password",
      });
    }
  };

export const loadOrder = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadOrderRequest",
    });

    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const { data } = await axios.get(`${server}/order/store`, { headers });

    dispatch({
      type: "loadOrderSuccess",
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "loadOrderFail",
      payload: error.response.data.message,
    });
  }
};

export const updateProfile =
  (fullName, dobString, phoneNumber, id, myForm) => async (dispatch) => {
    try {
      dispatch({
        type: "updateProfileRequest",
      });
      const token = await AsyncStorage.getItem("token");
      const data1 = await axios.post(`${serverUrl}/user/uploadimg`, myForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const avtar = data1.data.url;

      const phoneString = phoneNumber.toString();

      const { data } = await axios.put(
        `${server}/account/profile`,
        {
          fullName: fullName,
          dob: dobString,
          phoneNumber: phoneString,
          avatar: avtar,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "updateProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateProfileFail",
        payload: error.response.data.message,
      });
    }
  };
