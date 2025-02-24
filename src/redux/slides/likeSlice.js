import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apitoggleLike } from "../../services/LikeService";

export const toggleLike = createAsyncThunk(
  "comment/fetchComments",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apitoggleLike(data.commentId);
      return { res: response };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeSlice = createSlice({
  name: "like",
  initialState: {
    isLoading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(toggleLike.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(toggleLike.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(toggleLike.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const {} = likeSlice.actions;
export default likeSlice.reducer;
