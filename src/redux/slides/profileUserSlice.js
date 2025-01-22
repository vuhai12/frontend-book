import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetProfileUser } from "../../services/ProfileUserService";

export const fetchGetProfileUserToolkit = createAsyncThunk(
  "User/fetchGetProfileUserToolkit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetProfileUser();
      return response.profileUserData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profileUserSlice = createSlice({
  name: "profileUser",
  initialState: {
    address: "",
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    builder.addCase(fetchGetProfileUserToolkit.fulfilled, (state, action) => {
      state.address = action.payload.address;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = profileUserSlice.actions;

export default profileUserSlice.reducer;
