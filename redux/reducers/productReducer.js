import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer(
  {
    products: [],
    product: {},
  },
  (builder) => {
    builder
      .addCase("getAdminProductRequest", (state) => {
        state.loading = true;
      })
      .addCase("addProductRequest", (state) => {
        state.loading = true;
      })
      .addCase("getProductDetailsRequest", (state) => {
        state.loading = true;
      })
      .addCase("getProductDetailRequest", (state) => {
        state.loading = true;
      })
      .addCase("updateProductRequest", (state) => {
        state.loading = true;
      })

      .addCase("getAdminProductsSuccess", (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        // state.inStock = action.payload.inStock;
        // state.outOfStock = action.payload.outOfStock;
      })

      .addCase("getProductDetailsSuccess", (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase("getProductDetailSuccess", (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase("addProductSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("updateProductSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase("getAllProductsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("getAdminProductsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("addProductFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("getProductDetailFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("updateProductFail", (state, action) => {
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
