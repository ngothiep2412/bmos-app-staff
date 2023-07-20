import { server, serverUrl } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import mime from "mime";

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAdminProductRequest",
    });

    // Get token
    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`${server}/product`, {
      withCredentials: true,
      headers: headers,
    });

    dispatch({
      type: "getAdminProductsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFail",
      payload: error.response.data.message,
    });
  }
};

export const updateProductForm =
  (
    id,
    productName,
    description,
    dateString,
    price,
    image,
    remainQuantity,
    categoryId,
    myForm
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateProductRequest",
      });

      const token = await AsyncStorage.getItem("token");

      const data1 = await axios.post(`${serverUrl}/user/uploadimg`, myForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log(data1.data.url);

      const response = await axios.put(
        `${server}/product/${id}`,
        {
          productName: productName,
          description: description,
          expiredDate: dateString,
          price: parseInt(price),
          image: data1.data.url,
          remainQuantity: parseInt(remainQuantity),
          categoryId: categoryId.toString(),
          status: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      dispatch({
        type: "updateProductSuccess",
        payload: response.data.message,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "updateProductFail",
        payload: error.response.data.message,
      });
    }
  };

export const createProduct =
  (
    productName,
    description,
    dateString,
    price,
    remainQuantity,
    categoryId,
    myForm
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "addProductRequest",
      });

      const token = await AsyncStorage.getItem("token");

      const data1 = await axios.post(`${serverUrl}/user/uploadimg`, myForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log(data1.data.url);

      const response = await axios.post(
        `${server}/product`,
        {
          productName: productName,
          description: description,
          expiredDate: dateString,
          price: parseInt(price),
          image: data1.data.url,
          remainQuantity: parseInt(remainQuantity),
          categoryId: categoryId.toString(),
          status: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      dispatch({
        type: "addProductSuccess",
        payload: response.data.message,
      });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: "addProductFail",
        payload: error.response.data.message,
      });
    }
  };

export const getProductDetail = (id) => async (dispatch) => {
  console.log("data id" + id);
  try {
    dispatch({
      type: "getProductDetailRequest",
    });

    const token = await AsyncStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`${server}/product/detail/${id}`, {
      withCredentials: true,
      headers: headers,
    });

    dispatch({
      type: "getProductDetailSuccess",
      payload: data.data[0],
    });
  } catch (error) {
    dispatch({
      type: "getProductDetailFail",
      payload: error.response.data.message,
    });
  }
};
