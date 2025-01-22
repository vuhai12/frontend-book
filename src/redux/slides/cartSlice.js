import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddCart,
  apiGetCart,
  apiCheckedBookCart,
  apiDeleteBookInCart,
  apiCheckedAllBookCart,
  apiDeleteAllBookCart,
  apiGetBookInCartChecked,
  apiQuantityBookInCart,
} from "../../services/CartService";

export const fetchGetCartToolkit = createAsyncThunk(
  "users/fetchGetCartToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetCart();
      return { res: response.cartData };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetBookInCartChecked = createAsyncThunk(
  "users/fetchGetBookInCartChecked",
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
  "users/fetchAddCartToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiAddCart(data);
      console.log("response cart", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCheckedBookCartToolkit = createAsyncThunk(
  "users/fetchCheckedBookCartToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiCheckedBookCart(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCheckedAllBookCartToolkit = createAsyncThunk(
  "users/fetchCheckedAllBookCartToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiCheckedAllBookCart(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDeleteAllBookCartToolkit = createAsyncThunk(
  "users/fetchDeleteAllBookCartToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiDeleteAllBookCart();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDeleteBookInCartToolkit = createAsyncThunk(
  "users/fetchDeleteBookInCartToolkit",
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
  "users/fetchDecrementQuantityBookInCart",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const response = await apiQuantityBookInCart(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchIncrementQuantityBookInCart = createAsyncThunk(
  "users/fetchIncrementQuantityBookInCart",
  async (data, { rejectWithValue }) => {
    try {
      console.log("dataIncre", data);
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

    builder.addCase(fetchGetCartToolkit.rejected, (state, action) => {
      state.listCart = [];
    });

    builder.addCase(fetchGetCartToolkit.fulfilled, (state, action) => {
      state.listCart = action.payload.res;
    });

    builder.addCase(fetchGetBookInCartChecked.fulfilled, (state, action) => {
      state.listBookInCartChecked = action.payload.res;
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
