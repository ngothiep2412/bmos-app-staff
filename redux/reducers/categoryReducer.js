import { createReducer } from "@reduxjs/toolkit";

export const categoryReducer = createReducer(
  {
    categories: [],
  },
  (builder) => {
    builder
      .addCase("getAllCategoriesRequest", (state) => {
        state.loading = true;
      })
      .addCase("addCategoryRequest", (state) => {
        state.loading = true;
      })
      .addCase("updateCategoryRequest", (state) => {
        state.loading = true;
      })
      .addCase("getAllCategoriesSuccess", (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase("addCategorySuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("updateCategorySuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("getAllCategoriesFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("updateCategoryFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("addCategoryFail", (state, action) => {
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
