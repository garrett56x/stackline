import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./features/dataSlice.ts";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;