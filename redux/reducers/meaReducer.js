import { createReducer } from "@reduxjs/toolkit";

export const mealReducer = createReducer(
  {
    meals: [],
    meal: {},
  },
  (builder) => {
    builder
      .addCase("getAdminMealRequest", (state) => {
        state.loading = true;
      })
      .addCase("getMealDetailsRequest", (state) => {
        state.loading = true;
      })
      .addCase("addMealRequest", (state) => {
        state.loading = true;
      })
      .addCase("updateMealRequest", (state) => {
        state.loading = true;
      })
      .addCase("getAdminMealsSuccess", (state, action) => {
        state.loading = false;
        state.meals = action.payload.data;
        // state.inStock = action.payload.inStock;
        // state.outOfStock = action.payload.outOfStock;
      })
      .addCase("getMealDetailsSuccess", (state, action) => {
        state.loading = false;
        state.meal = action.payload;
      })
      .addCase("addMealSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("updateMealSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("getAllMealsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("addMealFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("updateMealFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("getAdminMealsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("getMealDetailsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder.addCase("clearError", (state) => {
      state.error = null;
    });
    builder.addCase("clearMessage", (state) => {
      state.message = null;
    });
  }
);
