import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiAddCart,
  apiGetCart,
  apiRemoveCartLines,
} from "../../services/cartService";

const initialState = {
  cart: null,
  loading: false,
  error: null,
};

export const addCartThunk = createAsyncThunk(
  "cart/addCart",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await apiAddCart(payload.cartId, payload.lines);
      if (!result.success) {
        return rejectWithValue(result.message || "Add cart failed");
      }
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Add cart failed");
    }
  },
);

export const getCartThunk = createAsyncThunk(
  "cart/getCart",
  async (cartId, { rejectWithValue }) => {
    try {
      const result = await apiGetCart(cartId);
      if (!result.success) {
        return rejectWithValue(result.message || "Get cart failed");
      }
      return result.cart;
    } catch (error) {
      return rejectWithValue(error.message || "Get cart failed");
    }
  },
);

export const removeCartLinesThunk = createAsyncThunk(
  "cart/removeCartLines",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await apiRemoveCartLines(payload.cartId, payload.lineIds);

      if (!result.success) {
        return rejectWithValue(result.message || "Remove cart lines failed");
      }

      return result.cart;
    } catch (error) {
      return rejectWithValue(error.message || "Remove cart lines failed");
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(removeCartLinesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartLinesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(removeCartLinesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.error = null;
      })
      .addCase(addCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
