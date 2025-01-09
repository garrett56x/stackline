import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../services/api.ts";
import { Product } from "../types/Product.ts";

export interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

export const fetchProductData = createAsyncThunk("data/fetch", async () => {
  return await fetchData();
});

const productsSlice = createSlice({
  name: "data",
  initialState: { products: [], status: "idle" } as ProductsState,
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

export default productsSlice.reducer;
