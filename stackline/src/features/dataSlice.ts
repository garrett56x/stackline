import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../services/api.ts";
import { Product } from "../types/Product";

interface DataState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

export const fetchProductData = createAsyncThunk("data/fetch", async () => {
  return await fetchData();
});

const dataSlice = createSlice({
  name: "data",
  initialState: { products: [], status: "idle" } as DataState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default dataSlice.reducer;
