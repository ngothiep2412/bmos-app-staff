import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { mealReducer } from "./reducers/meaReducer";
import { otherReducer } from "./reducers/otherReducer";
import { birdReducer } from "./reducers/birdReducer";
import { productReducer } from "./reducers/productReducer";
import { categoryReducer } from "./reducers/categoryReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    meal: mealReducer,
    other: otherReducer,
    bird: birdReducer,
    product: productReducer,
    product: productReducer,
    category: categoryReducer,
  },
});

export const server = "http://13.212.177.158:6969/api/v1";
export const serverUrl = "https://mern-stack-server-y2sn.onrender.com/api/v1";
