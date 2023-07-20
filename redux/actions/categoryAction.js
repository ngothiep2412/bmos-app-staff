import axios from "axios";
import { server } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllCategoriesRequest",
    });

    // Get token
    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`${server}/category`, {
      withCredentials: true,
      headers: headers,
    });

    dispatch({
      type: "getAllCategoriesSuccess",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "getAllCategoriesFail",
      payload: error.response.data.message,
    });
  }
};

export const updateCategory = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCategoryRequest",
    });

    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const { data } = await axios.put(
      `${server}/category/${id}/status/${status}`,
      {},
      {
        headers: headers,
        withCredentials: true,
      }
    );
    dispatch({
      type: "updateCategorySuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCategoryFail",
      payload: error.response.data.message,
    });
  }
};

export const createCategory = (categoryName) => async (dispatch) => {
  try {
    dispatch({
      type: "addCategoryRequest",
    });

    const token = await AsyncStorage.getItem("token");

    const response = await axios.post(
      `${server}/category`,
      {
        categoryName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: "addCategorySuccess",
      payload: response.data.message,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: "addCategoryFail",
      payload: error.response.data.message,
    });
  }
};
