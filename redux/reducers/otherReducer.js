import { createReducer } from "@reduxjs/toolkit";

export const otherReducer = createReducer({ order: {} }, (builder) => {
  builder
    .addCase("updateProfileRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateMealProductRequest", (state) => {
      state.loading = true;
    })
    .addCase("processOrderRequest", (state) => {
      state.loading = true;
    })
    .addCase("getOrderDetailRequest", (state, action) => {
      state.loading = true;
    })
    .addCase("updatePasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("loadOrderRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateProfileSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateMealProductSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("processOrderSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("getOrderDetailSuccess", (state, action) => {
      state.loading = false;
      state.order = action.payload;
    })
    .addCase("updatePasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("loadOrderSuccess", (state, action) => {
      state.loading = false;
      state.order = action.payload;
    })
    .addCase("updateProfileFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("getOrderDetailFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("updateMealProductFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("updatePasswordFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("loadOrderFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("processOrderFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  builder.addCase("clearError", (state) => {
    state.error = null;
  });

  builder.addCase("clearMessage", (state) => {
    state.message = null;
  });
});
