import { configureStore } from "@reduxjs/toolkit";
import { productreducer } from "./slices/productSlice";

export const store = configureStore({
  //main reducer for the store
  reducer: {
    productSlice: productreducer,
  },
});
