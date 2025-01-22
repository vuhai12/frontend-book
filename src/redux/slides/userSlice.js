import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRegister, apiLogin } from "../../services/AuthService";
import { apiGetCategory } from "../../services/CategoryService";
import {
  apiDeleteUser,
  apiUpdateUser,
  apiGetUsers,
  apiCreateUser,
  apiGetUserById,
  apiLogout,
} from "../../services/UserService";

export const fetchLoginToolkit = createAsyncThunk(
  "users/fetchLoginToolkit",
  async (body, { rejectWithValue }) => {
    try {
      const response = await apiLogin(body.email, body.password);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLogoutToolkit = createAsyncThunk(
  "users/fetchLogoutToolkit",
  async (body, { rejectWithValue }) => {
    try {
      const response = await apiLogout();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRegisterToolkit = createAsyncThunk(
  "users/fetchRegisterToolkit",
  async (body, { rejectWithValue }) => {
    try {
      const response = await apiRegister(body.email, body.password);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetListUserToolkit = createAsyncThunk(
  "users/fetchGetListUserToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetUsers(
        data.limitListUser,
        data.currentPage,
        data.searchString,
        data.field,
        data.sort
      );

      return { response, data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetListCategoryToolkit = createAsyncThunk(
  "users/fetchGetListCategoryToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetCategory();
      return response?.categoryData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUpdateNewUserToolkit = createAsyncThunk(
  "users/fetchUpdateNewUserToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiUpdateUser(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCreatNewUserToolkit = createAsyncThunk(
  "users/fetchCreatNewUserToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiCreateUser(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDeleteNewUserToolkit = createAsyncThunk(
  "users/fetchDeleteNewUserToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiDeleteUser();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetUserByIdToolkit = createAsyncThunk(
  "users/fetchGetUserByIdToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetUserById();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    access_token: "",
    refresh_token: "",
    auth: false,
    isShowModal: false,
    statusLoading: false,
    limit: 3,
    searchString: "",
    totalUsers: 0,
    currentPage: 1,
    listUsers: [],
    listCategory: [],
    bookDataById: {},
    quantityBook: 1,
    isOpenSideBarMenu: false,
    userData: [],
  },
  reducers: {
    openSideBarMenu: (state, action) => {
      state.isOpenSideBarMenu = action.payload;
    },
    globalLoading: (state, action) => {
      state.statusLoading = action.payload;
    },

    showModal: (state, action) => {
      state.isShowModal = true;
      state.listCategory = [1, 9, 9];
    },

    hideModal: (state, action) => {
      state.isShowModal = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetUserByIdToolkit.fulfilled, (state, action) => {
      state.userData = action.payload.userData;
      // Add user to the state array
    });

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchLoginToolkit.pending, (state, action) => {
      // Add user to the state array
      state.statusLoading = true;
      state.auth = false;
    });

    builder.addCase(fetchLoginToolkit.fulfilled, (state, action) => {
      // Add user to the state array
      localStorage.setItem("access_token", action.payload?.access_token);
      localStorage.setItem("refresh_token", action.payload?.refresh_token);
      (state.access_token = action.payload.access_token),
        (state.refresh_token = action.payload.refresh_token),
        (state.auth = true),
        (state.statusLoading = false);
    });

    builder.addCase(fetchRegisterToolkit.fulfilled, (state, action) => {
      // Add user to the state array
      state.statusLoading = false;
    });

    builder.addCase(fetchGetListUserToolkit.pending, (state, action) => {});

    builder.addCase(fetchGetListUserToolkit.fulfilled, (state, action) => {
      console.log("action,", action);
      state.listUsers = action.payload.response.userData.rows;
      state.totalUsers = action.payload.response.userData.count;
    });

    builder.addCase(fetchGetListCategoryToolkit.fulfilled, (state, action) => {
      // Add user to the state array
      state.listCategory = action.payload;
    });

    builder.addCase(fetchCreatNewUserToolkit.pending, (state, action) => {
      // Add user to the state array
      state.statusLoading = true;
    });

    //add create new book
    builder.addCase(fetchCreatNewUserToolkit.fulfilled, (state, action) => {
      // Add user to the state array
      state.statusLoading = false;
    });

    builder.addCase(fetchUpdateNewUserToolkit.pending, (state, action) => {
      state.statusLoading = true;
    });

    builder.addCase(fetchUpdateNewUserToolkit.fulfilled, (state, action) => {
      state.statusLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { startEdittingPostBook, showModal, hideModal, openSideBarMenu } =
  userSlice.actions;

export default userSlice.reducer;
