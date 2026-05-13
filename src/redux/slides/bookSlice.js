import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetBooks, apiGetBookItem } from "../../services/book.services";

export const getListBooks = createAsyncThunk(
  "books/getListBooks",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetBooks(data);
      console.log("response", response);
      return response.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getBookItem = createAsyncThunk(
  "books/getBookItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetBookItem(data);
      console.log("response", response);
      return response.product;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    listBooks: [],
    loading: false,
    error: null,
    loadingBookItem: false,
    errorBookItem: null,
    bookItem: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getListBooks.fulfilled, (state, action) => {
      state.listBooks = action.payload;
      state.loading = false;
    });

    builder.addCase(getListBooks.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getListBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getBookItem.fulfilled, (state, action) => {
      state.bookItem = action.payload;
      state.loadingBookItem = false;
    });

    builder.addCase(getBookItem.pending, (state, action) => {
      state.loadingBookItem = true;
      state.errorBookItem = null;
    });

    builder.addCase(getBookItem.rejected, (state, action) => {
      state.loadingBookItem = false;
      state.errorBookItem = action.payload;
    });
  },
});

export default bookSlice.reducer;
