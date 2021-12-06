import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface IUser {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
}

import type { RootState } from "@/store";

const firebaseInitialState: {
  user: IUser | null;
} = {
  user: null,
};

export const firebaseSlice = createSlice({
  name: "firebase",
  initialState: firebaseInitialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.user = null;
    });
  },
});

const { actions, reducer } = firebaseSlice;

export const { login, logout } = actions;

export const selectUser = (state: RootState) => state.firebase.user;

export default reducer;
