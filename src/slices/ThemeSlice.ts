import { createSlice } from "@reduxjs/toolkit";
import type { ColorMode } from "native-base";
import { PURGE } from "redux-persist";

import type { RootState } from "@/store";

const themeInitialState: {
  colorMode: ColorMode;
} = {
  colorMode: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: themeInitialState,
  reducers: {
    setColorMode: (state, action) => {
      state.colorMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.colorMode = "light";
    });
  },
});

const { actions, reducer } = themeSlice;

export const { setColorMode } = actions;

export const selectColorMode = (state: RootState) => state.theme.colorMode;

export default reducer;
