import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddCart,
  apiGetCart,
  apiUpdateCheckedBooksInCart,
  apiDeleteBookInCart,
  apiCheckedAllBookCart,
  apiDeleteAllBookCart,
  apiGetBookInCartChecked,
  apiQuantityBookInCart,
} from "../../services/CartService";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetCart();
      return { res: response.cartData };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCheckedBooksInCart = createAsyncThunk(
  "cart/fetchCheckedBooksInCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetBookInCartChecked();
      return { res: response.cartData };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAddCartToolkit = createAsyncThunk(
  "cart/fetchAddCartToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAddCart(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCheckedBooksInCart = createAsyncThunk(
  "cart/updateCheckedBooksInCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiUpdateCheckedBooksInCart(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchToggleCheckedAllBooksInCart = createAsyncThunk(
  "cart/fetchToggleCheckedAllBooksInCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiCheckedAllBookCart(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDeleteCheckedBooksInCart = createAsyncThunk(
  "cart/fetchDeleteCheckedBooksInCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiDeleteAllBookCart();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRemoveBookFromCart = createAsyncThunk(
  "cart/fetchRemoveBookFromCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiDeleteBookInCart(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDecrementQuantityBookInCart = createAsyncThunk(
  "cart/fetchDecrementQuantityBookInCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiQuantityBookInCart(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchIncrementQuantityBookInCart = createAsyncThunk(
  "cart/fetchIncrementQuantityBookInCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiQuantityBookInCart(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    totalPrice: 0,
    cartToTalBook: 0,
    bookIds: [],
    isCheckedAll: false,
    cartsChecked: [],
    listBookInCartChecked: [],
    listCart: [],
    isLoadingCart: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (item) => item?.bookId == action.payload.bookId
      );

      if (itemIndex !== -1) {
        state.carts[itemIndex] = {
          bookId: action.payload.bookId,
          quantity: action.payload.quantity,
          price: action.payload.price,
          isChecked: false,
          image: action.payload.image,
        };
      } else {
        const temBook = {
          bookId: action.payload.bookId,
          quantity: action.payload.quantity,
          price: action.payload.price,
          isChecked: false,
          image: action.payload.image,
        };
        state.carts.push(temBook);
      }
    },

    decrementItem: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (item) => item.bookId == action.payload.bookId
      );
      state.carts[itemIndex].quantity = action.payload.quantity - 1;
    },

    incrementItem: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (item) => item.bookId == action.payload.bookId
      );
      state.carts[itemIndex].quantity = action.payload.quantity + 1;
    },

    getTotalPrice: (state) => {
      const totalPrice = state.carts.reduce((total, book) => {
        if (book.isChecked == true) {
          return total + +book.price * +book.quantity;
        } else {
          return total;
        }
      }, 0);
      const cartToTalBook = state.carts.reduce((total, book) => {
        if (book.isChecked == true) {
          return total + +book.quantity;
        } else {
          return total;
        }
      }, 0);
      state.totalPrice = totalPrice;
      state.cartToTalBook = cartToTalBook;
    },
  },

  extraReducers: (builder) => {
    //add create new book

    builder.addCase(fetchAddCartToolkit.pending, (state, action) => {
      // Add user to the state array
      return {
        ...state,
        statusLoading: true,
      };
    });

    //add create new book
    builder.addCase(fetchAddCartToolkit.fulfilled, (state, action) => {
      // Add user to the state array
      return {
        ...state,
        statusLoading: false,
      };
    });

    builder.addCase(fetchCart.rejected, (state, action) => {
      state.listCart = [];
      state.isLoadingCart = false;
    });
    builder.addCase(fetchCart.pending, (state, action) => {
      state.isLoadingCart = true;
    });

    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.listCart = action.payload.res;
      state.isLoadingCart = false;
    });

    builder.addCase(fetchCheckedBooksInCart.pending, (state, action) => {
      state.isLoadingCart = true;
    });

    builder.addCase(fetchCheckedBooksInCart.fulfilled, (state, action) => {
      state.listBookInCartChecked = action.payload.res;
      state.isLoadingCart = false;
    });

    builder.addCase(fetchCheckedBooksInCart.rejected, (state, action) => {
      state.isLoadingCart = false;
    });
  },
});

export const {
  addToCart,
  decrementItem,
  incrementItem,
  checkedItem,
  getTotalPrice,
  checkedAllItem,
  getCartsChecked,
  removeItemCarts,
  removeItemCheckedCarts,
  removeAllItemCheckedCarts,
} = cartSlice.actions;
export default cartSlice.reducer;
