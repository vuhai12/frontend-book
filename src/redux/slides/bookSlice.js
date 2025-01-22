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
      console.log("response", response);
      return {
        response,
        data,
      };
    } catch (error) {
      if (signal.aborted) {
        // Trường hợp request bị hủy bỏ
        console.log("Request aborted");
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
  async (data, { rejectWithValue }) => {
    try {
      const res = await apiDeleteBook(data.bid);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    access_token: "",
    refresh_token: "",
    listBook: [],
    auth: false,
    edittingBook: {},
    isShowModal: false,
    totalBooks: 0,
    statusLoading: false,
    searchString: "",
    pageCurent: 1,
    listUsers: [],
    error: null,
    bookDataById: {},
    quantityBook: 1,
    countAllBook: 0,
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
      (state.statusLoading = true), (state.searchString = "");
    });

    builder.addCase(fetchGetListBookToolkit.fulfilled, (state, action) => {
      (state.listBook = action.payload?.response?.bookData?.rows),
        (state.totalBooks = action.payload?.response.bookData?.count),
        (state.statusLoading = false),
        (state.searchString = action.payload?.data?.searchString),
        (state.pageCurent = action.payload?.data?.pageCurent);
    });

    builder.addCase(fetchCreatNewBookToolkit.pending, (state, action) => {
      state.statusLoading = true;
    });

    builder.addCase(fetchCreatNewBookToolkit.fulfilled, (state, action) => {
      state.statusLoading = false;
    });

    builder.addCase(fetchCreatNewBookToolkit.rejected, (state, action) => {
      state.error = action.payload.message;
    });

    builder.addCase(fetchDeleteNewBookToolkit.fulfilled, (state, action) => {});

    builder.addCase(fetchUpdateNewBookToolkit.pending, (state, action) => {
      state.statusLoading = true;
    });

    builder.addCase(fetchUpdateNewBookToolkit.fulfilled, (state, action) => {
      state.statusLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { startEdittingPostBook, showModal, hideModal } =
  bookSlice.actions;

export default bookSlice.reducer;
