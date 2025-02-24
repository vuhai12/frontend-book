import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apicreateComment,
  apigetComments,
} from "../../services/CommentService";

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apigetComments(
        data.idBook,
        data.limit,
        data.pageCurrent
      );
      return { res: response };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apicreateComment({
        bookId: data.bookId,
        content: data.content,
        parentId: data.parentId,
      });

      return { res: response };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cartSlice = createSlice({
  name: "comment",
  initialState: {
    listComment: [],
    isLoading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.listComment = action.payload.res.comments;
      state.isLoading = false;
    });

    builder.addCase(fetchComments.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchComments.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(createComment.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(createComment.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createComment.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
