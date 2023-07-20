import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAdminMeals } from "../redux/actions/mealAction";
import axios from "axios";
import { server } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAdminBirds } from "../redux/actions/birdAction";
import { getAdminProducts } from "../redux/actions/productAction";
import { Alert } from "react-native";
import { loadUser } from "../redux/actions/userAction";
import { getAllCategories } from "../redux/actions/categoryAction";

export const useMessageAndErrorUser = (
  navigation,
  dispatch,
  navigateTo = "login"
) => {
  const { loading, message, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      navigation.reset({
        index: 0,
        routes: [{ name: navigateTo }],
      });
      Alert.alert(
        //title
        "Success",
        //body
        message,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearMessage",
      });
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useMessageAndErrorOther = (
  dispatch,
  navigation,
  navigateTo,
  func
) => {
  const { loading, message, error } = useSelector((state) => state.other);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ]

        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      Alert.alert(
        //title
        "Success",
        //body
        message,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ]

        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearMessage",
      });

      navigateTo && navigation.navigate(navigateTo);

      func && dispatch(func());
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useMessageAndErrorCategory = (
  dispatch,
  navigation,
  navigateTo,
  func
) => {
  const { loading, message, error } = useSelector((state) => state.category);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ]

        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      Alert.alert(
        //title
        "Success",
        //body
        message,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ]

        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearMessage",
      });

      navigateTo && navigation.navigate(navigateTo);

      func && dispatch(func());
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useMessageAndErrorMeal = (
  dispatch,
  navigation,
  navigateTo,
  func
) => {
  const { loading, message, error } = useSelector((state) => state.meal);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      Alert.alert(
        //title
        "Success",
        //body
        message,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearMessage",
      });

      navigateTo && navigation.navigate(navigateTo);

      func && dispatch(func());
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useMessageAndErrorBird = (
  dispatch,
  navigation,
  navigateTo,
  func
) => {
  const { loading, message, error } = useSelector((state) => state.bird);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      Alert.alert(
        //title
        "Success",
        //body
        message,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearMessage",
      });

      navigateTo && navigation.navigate(navigateTo);

      func && dispatch(func());
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useMessageAndErrorProduct = (
  dispatch,
  navigation,
  navigateTo,
  func
) => {
  const { loading, message, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      Alert.alert(
        //title
        "Success",
        //body
        message,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearMessage",
      });

      navigateTo && navigation.navigate(navigateTo);

      func && dispatch(func());
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useAdminMeals = (dispatch, isFocused) => {
  const { meals, error, loading } = useSelector((state) => state.meal);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    dispatch(getAdminMeals());
  }, [dispatch, isFocused, error]);

  return {
    meals,
    loading,
  };
};

export const useAdminBird = (dispatch, isFocused) => {
  const { birds, error, loading } = useSelector((state) => state.bird);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    dispatch(getAdminBirds());
  }, [dispatch, isFocused, error]);

  return {
    birds,
    loading,
  };
};

export const useAdminProducts = (dispatch, isFocused) => {
  const { products, error, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    dispatch(getAdminProducts());
  }, [dispatch, isFocused, error]);

  return {
    products,
    loading,
  };
};

export const useCategories = (dispatch, isFocused) => {
  const { categories, error, loading } = useSelector((state) => state.category);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    dispatch(getAllCategories());
  }, [dispatch, isFocused, error]);

  return {
    categories,
    loading,
  };
};

export const useGetOrders = (setLoading, isFocused) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${server}/order/store`, { headers });
        setOrders(response.data.data);
        setLoading(false);
      } catch (error) {
        Alert.alert(
          //title
          "Error",
          //body
          error.response.data.message,
          [
            {
              text: "OK",
              onPress: () => console.log("Yes Pressed"),
            },
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [isFocused]);

  return {
    orders,
  };
};

export const getloadUser = (dispatch, isFocused) => {
  const { user, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      Alert.alert(
        //title
        "Error",
        //body
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("Yes Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
      dispatch({
        type: "clearError",
      });
    }

    dispatch(loadUser());
  }, [dispatch, isFocused, error]);

  return {
    user,
    loading,
  };
};

export const useSetMealProducts = (setProducts, isFocused) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${server}/product`, { headers });
        setProducts(response.data.data);
      } catch (error) {
        Alert.alert(
          //title
          "Error",
          //body
          error.response.data.message,
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

    fetchData();
  }, [isFocused]);
};

export const useSetMealBirds = (setBirds, isFocused) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${server}/bird`, { headers });
        setBirds(response.data.data);
      } catch (error) {
        Alert.alert(
          //title
          "Error",
          //body
          error.response.data.message,
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

    fetchData();
  }, [isFocused]);
};

export const useSetMealBirdName = (setBirdMeal, isFocused, id) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${server}/bird/${id}`, { headers });
        setBirdMeal(response.data.data);
      } catch (error) {
        Alert.alert(
          //title
          "Error",
          //body
          error.response.data.message,
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

    fetchData();
  }, [isFocused]);
};

export const useSetCategory = (setCategories, isFocused) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${server}/category`, { headers });
        setCategories(response.data.data);
      } catch (error) {
        Alert.alert(
          //title
          "Error",
          //body
          error.response.data.message,
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

    fetchData();
  }, [isFocused]);
};
