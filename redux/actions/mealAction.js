import axios from "axios";
import { server, serverUrl } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAdminMeals = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAdminMealRequest",
    });

    // Get token
    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`${server}/meal/title`, {
      withCredentials: true,
      headers: headers,
    });

    dispatch({
      type: "getAdminMealsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllMealsFail",
      payload: error.response.data.message,
    });
  }
};

export const getMealDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getMealDetailsRequest",
    });

    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`${server}/meal/detail/${id}`, {
      withCredentials: true,
      headers: headers,
    });

    dispatch({
      type: "getMealDetailsSuccess",
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "getMealDetailsFail",
      payload: error.response.data.message,
    });
  }
};

export const addAMeal =
  (title, description, birdID, myForm, sections) => async (dispatch) => {
    console.log(myForm);
    try {
      dispatch({
        type: "addMealRequest",
      });

      // Get token
      const token = await AsyncStorage.getItem("token");
      const data1 = await axios.post(`${serverUrl}/user/uploadimg`, myForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const images = data1.data.url;

      console.log(title);
      console.log(description);
      console.log(birdID);
      console.log(images);
      console.log(sections);

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const { data } = await axios.post(
        `${server}/meal/create`,
        {
          title: title,
          description: description,
          birdId: birdID,
          image: images,
          sections: sections,
        },
        {
          withCredentials: true,
          headers: headers,
        }
      );

      dispatch({
        type: "addMealSuccess",
        payload: data.message,
      });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: "addMealFail",
        payload: error.response.data.message,
      });
    }
  };

export const updateMeal =
  (id, status, title, description, birdID, myForm, sections) =>
  async (dispatch) => {
    console.log(myForm);
    try {
      dispatch({
        type: "updateMealRequest",
      });

      // Get token
      const token = await AsyncStorage.getItem("token");
      const data1 = await axios.post(`${serverUrl}/user/uploadimg`, myForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const images = data1.data.url;

      console.log(title);
      console.log(description);
      console.log(birdID);
      console.log(typeof images);
      console.log(sections);
      console.log(status);

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const { data } = await axios.put(
        `${server}/meal/update`,
        {
          id: id,
          status: status,
          title: title,
          description: description,
          birdId: birdID,
          image: images,
          sections: sections,
        },
        {
          withCredentials: true,
          headers: headers,
        }
      );

      console.log(data.data);

      dispatch({
        type: "updateMealSuccess",
        payload: data.message,
      });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: "updateMealFail",
        payload: error.response.data.message,
      });
    }
  };
