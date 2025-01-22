import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiCreateOrder,
  apiGetOrders,
  apiGetOrderById,
} from "../../services/OrderService";

export const fetchCreateOrderToolkit = createAsyncThunk(
  "users/fetchCreateOrderToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiCreateOrder(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetOrdersToolkit = createAsyncThunk(
  "users/fetchGetOrdersToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetOrders();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetOrderByIdToolkit = createAsyncThunk(
  "users/fetchGetOrderByIdToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetOrderById();
      console.log("response order", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    listOrders: [],
    listOrderById: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchCreateOrderToolkit.fulfilled, (state, action) => {});
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetOrdersToolkit.fulfilled, (state, action) => {
      state.listOrders = action.payload;
    });
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetOrderByIdToolkit.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      state.listOrderById = action.payload.orderData;
    });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
