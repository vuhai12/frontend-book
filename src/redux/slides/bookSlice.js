import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiGetBookById,
  apiGetBook,
  apiCreateBook,
  apiDeleteBook,
  apiUpdateBook,
} from "../../services/BookService";

export const fetchListBooks = createAsyncThunk(
  "books/fetchListBooks",
  async (data, { rejectWithValue, signal, getState }) => {
    try {
      const { book } = getState();
      const cacheKey = `${data.pageCurent}-${data.limitListBook}`;
      if (book.cacheListBooks[cacheKey]?.length > 0 && !data.searchString) {
        console.log("vào đây");
        return {
          pageCurent: data.pageCurent,
          data: book.cacheListBooks[cacheKey],
          count: book.totalBooks,
          searchString: book.searchString,
          limitListBook: data.limitListBook,
        };
      }
      const response = await apiGetBook({ ...data, signal });
      console.log("response", response);
      return {
        pageCurent: data.pageCurent,
        data: response?.bookData.rows,
        count: response?.bookData.count,
        searchString: data?.searchString,
        limitListBook: data.limitListBook,
      };
    } catch (error) {
      if (signal.aborted) {
        return rejectWithValue({ message: "Request was aborted" });
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetBookById(data);
      return response.bookData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiUpdateBook(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBook = createAsyncThunk(
  "books/createBook",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiCreateBook(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
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
    listBookAdmin: [],
    cacheListBooks: {},
    edittingBook: {},
    isShowModal: false,
    totalBooks: 0,
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

    showModal: (state, action) => {
      state.isShowModal = true;
    },

    hideModal: (state, action) => {
      state.isShowModal = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBookById.fulfilled, (state, action) => {
      state.bookDataById = action.payload;
    });

    builder.addCase(fetchListBooks.pending, (state, action) => {
      (state.searchString = ""), (state.isLoading = true);
    });

    builder.addCase(fetchListBooks.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(fetchListBooks.fulfilled, (state, action) => {
      const cacheKey = `${action.payload.pageCurent}-${action.payload.limitListBook}`;
      if (action.payload.pageCurent === 1) {
        state.listBook = action.payload?.data; // 🔹 Trang đầu: Reset danh sách
      } else {
        state.listBook = [...state.listBook, ...action.payload?.data]; // 🔹 Load thêm: Giữ sách cũ
      }
      (state.cacheListBooks[cacheKey] = action.payload?.data),
        (state.totalBooks = action.payload?.count),
        (state.searchString = action.payload?.searchString),
        (state.pageCurent = action.payload.pageCurent),
        (state.isLoading = false);
    });

    builder.addCase(createBook.pending, (state, action) => {
      state.isLoadingAddBook = true;
    });

    builder.addCase(createBook.fulfilled, (state, action) => {
      state.isLoadingAddBook = false;
    });

    builder.addCase(createBook.rejected, (state, action) => {
      state.error = action.payload.message;
      state.isLoadingAddBook = false;
    });

    builder.addCase(deleteBook.fulfilled, (state, action) => {});

    builder.addCase(updateBook.pending, (state, action) => {
      state.isLoadingEditBook = true;
    });

    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.isLoadingEditBook = false;
    });
    builder.addCase(updateBook.rejected, (state, action) => {
      state.isLoadingEditBook = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { startEdittingPostBook, showModal, hideModal, searchBooks } =
  bookSlice.actions;

export default bookSlice.reducer;
