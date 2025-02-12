import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiGetBookById,
  apiGetBook,
  apiCreateBook,
  apiDeleteBook,
  apiUpdateBook,
} from "../../services/BookService";

export const fetchGetListBookToolkit = createAsyncThunk(
  "users/fetchGetListBookToolkit",
  async (data, { rejectWithValue, signal }) => {
    try {
      const response = await apiGetBook({ ...data, signal });
      return {
        response,
        data,
      };
    } catch (error) {
      if (signal.aborted) {
        // Trường hợp request bị hủy bỏ
        return rejectWithValue({ message: "Request was aborted" });
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetBookByIdToolkit = createAsyncThunk(
  "users/fetchGetBookByIdToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetBookById(data);
      return response.bookData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUpdateNewBookToolkit = createAsyncThunk(
  "users/fetchUpdateNewBookToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiUpdateBook(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCreatNewBookToolkit = createAsyncThunk(
  "users/fetchCreatNewBookToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiCreateBook(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDeleteNewBookToolkit = createAsyncThunk(
  "users/fetchDeleteNewBookToolkit",
  async (bid, { rejectWithValue }) => {
    try {
      const res = await apiDeleteBook(bid);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    listBook: [],
    auth: false,
    edittingBook: {},
    isShowModal: false,
    totalBooks: 0,
    statusLoading: false,
    searchString: "",
    listUsers: [],
    error: null,
    bookDataById: {},
    quantityBook: 1,
    countAllBook: 0,
    isLoading: false,
    isLoadingAddBook: false,
    isLoadingEditBook: false,
  },
  reducers: {
    startEdittingPostBook: (state, action) => {
      state.edittingBook = {
        title: action.payload.title,
        available: action.payload.available,
        price: action.payload.price,
        image: action.payload.image,
        filename: action.payload.filename,
        bid: action.payload.id,
        category_code: action.payload.category_code,
        description: action.payload.description,
      };
    },

    globalLoading: (action, state) => {
      state.statusLoading = action.payload;
    },

    showModal: (state, action) => {
      state.isShowModal = true;
    },

    hideModal: (state, action) => {
      state.isShowModal = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetBookByIdToolkit.fulfilled, (state, action) => {
      state.bookDataById = action.payload;
    });

    builder.addCase(fetchGetListBookToolkit.pending, (state, action) => {
      (state.statusLoading = true),
        (state.searchString = ""),
        (state.isLoading = true);
    });

    builder.addCase(fetchGetListBookToolkit.fulfilled, (state, action) => {
      (state.listBook = action.payload?.response?.bookData?.rows),
        (state.totalBooks = action.payload?.response.bookData?.count),
        (state.statusLoading = false),
        (state.searchString = action.payload?.data?.searchString),
        (state.pageCurent = action.payload?.data?.pageCurent),
        (state.isLoading = false);
    });

    builder.addCase(fetchCreatNewBookToolkit.pending, (state, action) => {
      state.statusLoading = true;
      state.isLoadingAddBook = true;
    });

    builder.addCase(fetchCreatNewBookToolkit.fulfilled, (state, action) => {
      state.statusLoading = false;
      state.isLoadingAddBook = false;
    });

    builder.addCase(fetchCreatNewBookToolkit.rejected, (state, action) => {
      state.error = action.payload.message;
      state.isLoadingAddBook = false;
    });

    builder.addCase(fetchDeleteNewBookToolkit.fulfilled, (state, action) => {});

    builder.addCase(fetchUpdateNewBookToolkit.pending, (state, action) => {
      state.statusLoading = true;
      state.isLoadingEditBook = true;
    });

    builder.addCase(fetchUpdateNewBookToolkit.fulfilled, (state, action) => {
      state.statusLoading = false;
      state.isLoadingEditBook = false;
    });
    builder.addCase(fetchUpdateNewBookToolkit.rejected, (state, action) => {
      state.isLoadingEditBook = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { startEdittingPostBook, showModal, hideModal } =
  bookSlice.actions;

export default bookSlice.reducer;
