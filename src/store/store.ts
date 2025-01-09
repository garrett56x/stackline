import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/productsSlice.ts";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
