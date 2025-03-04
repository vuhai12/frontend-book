import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apigetConversations,
  apigetListUserChatWithAdmin,
  apisendMessage,
} from "../../services/MessageService";

export const fetchlistConversations = createAsyncThunk(
  "message/fetchlistConversations",
  async (data, { rejectWithValue, signal }) => {
    try {
      const response = await apigetConversations(data?.userId);
      return {
        data: response.listConversations,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchlistUsersChatWithAdmin = createAsyncThunk(
  "message/fetchlistUsersChatWithAdmin",
  async (data, { rejectWithValue, signal }) => {
    try {
      const response = await apigetListUserChatWithAdmin();
      return {
        data: response.userListWithLastMessage,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apisendMessage(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    listConversations: [],
    isLoading: false,
    listUsersChatWithAdmin: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchlistUsersChatWithAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listUsersChatWithAdmin = action.payload.data;
    });
    builder.addCase(fetchlistUsersChatWithAdmin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchlistUsersChatWithAdmin.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(fetchlistConversations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listConversations = action.payload.data;
    });
    builder.addCase(fetchlistConversations.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchlistConversations.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(sendMessage.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(sendMessage.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = messageSlice.actions;

export default messageSlice.reducer;
