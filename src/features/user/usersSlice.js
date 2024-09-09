import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

import { signInUserAuthWithEmailAndPassword } from "../../utils/firebase.utils";

const cookies = new Cookies();

export const signInUser = createAsyncThunk(
  'users/signInUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userRef = await signInUserAuthWithEmailAndPassword(email, password);

      cookies.set('user', userRef.user.uid);

      return {
        uid: userRef.user.uid
      };
    } catch (error) {
      toast.error("Failed to sign in a user");
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;