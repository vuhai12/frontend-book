import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetCollections } from "../../services/collectionsService";

export const getCollections = createAsyncThunk(
  "collections/getCollections",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetCollections();
      console.log("response", response);
      return response.collections;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const collectionsSlice = createSlice({
  name: "collections",
  initialState: {
    collections: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getCollections.pending, (state, action) => {
      state.collections = action.payload;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCollections.fulfilled, (state, action) => {
      state.collections = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getCollections.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default collectionsSlice.reducer;
