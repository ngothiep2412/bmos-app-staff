import axios from "axios";
import { server, serverUrl } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mime from "mime";

export const getAdminBirds = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAdminBirdRequest",
    });

    // Get token
    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`${server}/bird`, {
      withCredentials: true,
      headers: headers,
    });

    dispatch({
      type: "getAdminBirdsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllBirdsFail",
      payload: error.response.data.message,
    });
  }
};

export const createBird = (birdName, birdColor, myForm) => async (dispatch) => {
  try {
    dispatch({
      type: "addBirdRequest",
    });

    const token = await AsyncStorage.getItem("token");

    const data1 = await axios.post(`${serverUrl}/user/uploadimg`, myForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    const images = data1.data.url;
    console.log(images);
    const response = await axios.post(
      `${server}/bird/create`,
      {
        birdName,
        birdColor,
        images,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: "addBirdSuccess",
      payload: response.data.message,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: "addBirdFail",
      payload: error.response.data.message,
    });
  }
};

export const getBirdDetail = (id) => async (dispatch) => {
  console.log("data id" + id);
  try {
    dispatch({
      type: "getBirdDetailRequest",
    });

    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`${server}/bird/${id}`, {
      withCredentials: true,
      headers: headers,
    });

    dispatch({
      type: "getBirdDetailSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "getBirdDetailFail",
      payload: error.response.data.message,
    });
  }
};

export const getUpdateBird =
  (id, birdName, birdColor, myForm, statusBird) => async (dispatch) => {
    try {
      dispatch({
        type: "updateBirdRequest",
      });

      const token = await AsyncStorage.getItem("token");

      const data1 = await axios.post(`${serverUrl}/user/uploadimg`, myForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const image = data1.data.url;
      const response = await axios.put(
        `${server}/bird/${id}`,
        {
          birdName: birdName,
          birdColor: birdColor,
          status: statusBird,
          images: image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: "updateBirdSuccess",
        payload: response.data.message,
      });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: "updateBirdFail",
        payload: error.response.data.message,
      });
    }
  };
