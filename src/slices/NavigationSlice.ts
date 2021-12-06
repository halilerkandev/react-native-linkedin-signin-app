import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { NavigationState } from "@react-navigation/native";

import type { RootState } from "@/store";

const navigationInitialState: {
  initialState: NavigationState | undefined;
} = {
  initialState: undefined,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: navigationInitialState,
  reducers: {
    setInitialState: (state, action) => {
      state.initialState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.initialState = undefined;
    });
  },
});

const { actions, reducer } = navigationSlice;

export const { setInitialState } = actions;

export const selectInitialState = (state: RootState) =>
  state.navigation.initialState;

export default reducer;
