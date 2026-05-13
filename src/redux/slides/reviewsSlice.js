import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getReviewsApi, postReviewsApi } from "../../services/reviewsApi";

const defaultSummary = {
  averageRating: 0,
  reviewCount: 0,
};

const initialState = {
  reviews: [],
  summary: defaultSummary,
  loadingGet: false,
  loadingPost: false,
  error: null,
};

export const getReviewsThunk = createAsyncThunk(
  "reviews/getReviews",
  async (productHandle, thunkAPI) => {
    try {
      console.log("productHandle", productHandle);
      const data = await getReviewsApi(productHandle);
      console.log("data review", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Lấy danh sách đánh giá thất bại",
      );
    }
  },
);

export const postReviewThunk = createAsyncThunk(
  "reviews/postReview",
  async (payload, thunkAPI) => {
    try {
      const data = await postReviewsApi(payload);

      if (payload.productHandle) {
        thunkAPI.dispatch(getReviewsThunk(payload.productHandle));
      }

      return data;
    } catch (error) {
      const serverData = error?.response?.data;

      const errorMessage =
        serverData?.message ||
        serverData?.errors?.map((e) => e.message).join(", ") ||
        "Gửi đánh giá thất bại";

      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviewsError: (state) => {
      state.error = null;
    },
    resetReviewsState: () => ({
      ...initialState,
      summary: { ...defaultSummary },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsThunk.pending, (state) => {
        console.log("penđingggggggggggggg");
        state.loadingGet = true;
        state.error = null;
      })
      .addCase(getReviewsThunk.fulfilled, (state, action) => {
        console.log(
          "getReviewsThunkgetReviewsThunkgetReviewsThunkgetReviewsThunkgetReviewsThunkgetReviewsThunkgetReviewsThunkgetReviewsThunkgetReviewsThunkgetReviewsThunkgetReviewsThunkgetReviewsThunkgetReviewsThunkgetReviewsThunkgetReviewsThunkgetReviewsThunk",
        );
        console.log("action.pay", action.payload);
        state.loadingGet = false;
        state.reviews = action.payload.reviews ?? [];
        state.summary = action.payload.summary ?? { ...defaultSummary };
      })
      .addCase(getReviewsThunk.rejected, (state, action) => {
        console.log("rejectedddddddddddddđ");
        state.loadingGet = false;
        state.error = action.payload || "Lấy đánh giá thất bại";
      })

      .addCase(postReviewThunk.pending, (state) => {
        state.loadingPost = true;
        state.error = null;
      })
      .addCase(postReviewThunk.fulfilled, (state, action) => {
        state.loadingPost = false;

        if (action.payload.summary) {
          state.summary = action.payload.summary;
        }
      })
      .addCase(postReviewThunk.rejected, (state, action) => {
        state.loadingPost = false;
        state.error = action.payload || "Gửi đánh giá thất bại";
      });
  },
});

export const { clearReviewsError, resetReviewsState } = reviewsSlice.actions;
export default reviewsSlice.reducer;
