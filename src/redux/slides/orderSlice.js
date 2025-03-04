import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiCreateOrder,
  apiGetOrders,
  apiGetOrderById,
  apiCreatePaymentWithVnpay,
} from "../../services/OrderService";

export const fetchCreateOrderToolkit = createAsyncThunk(
  "order/fetchCreateOrderToolkit",
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
  "order/fetchGetOrdersToolkit",
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
  "order/fetchGetOrderByIdToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetOrderById();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPaymentWithVnpay = createAsyncThunk(
  "order/createPaymentWithVnpay",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiCreatePaymentWithVnpay({
        amount: data.amount,
        bankCode: "NCB",
      });
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
    builder.addCase(fetchGetOrdersToolkit.fulfilled, (state, action) => {
      state.listOrders = action.payload;
    });
    builder.addCase(fetchGetOrderByIdToolkit.fulfilled, (state, action) => {
      state.listOrderById = action.payload.orderData;
    });
    builder.addCase(createPaymentWithVnpay.fulfilled, (state, action) => {
      if (action.payload.paymentUrl) {
        window.location.href = action.payload.paymentUrl;
      }
    });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
