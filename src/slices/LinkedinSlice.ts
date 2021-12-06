import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { v4 } from "uuid";
import { LINKEDIN_CLIENT_ID, LINKEDIN_REDIRECT_URI } from "@/constants";

import type { RootState } from "@/store";

const linkedinInitialState: {
  id: string | undefined;
  code: string | undefined;
  state: string | undefined;
  displayName: string | undefined;
  email: string | undefined;
  photoURL: string | undefined;
  permissions: string[];
  isLoading: boolean;
} = {
  id: undefined,
  code: undefined,
  state: undefined,
  displayName: undefined,
  email: undefined,
  photoURL: undefined,
  permissions: ["r_liteprofile", "r_emailaddress", "w_member_social"],
  isLoading: false,
};

export const linkedinSlice = createSlice({
  name: "linkedin",
  initialState: linkedinInitialState,
  reducers: {
    setCode: (state, action: PayloadAction<string | undefined>) => {
      state.code = action.payload;
    },
    genState: (state) => {
      state.state = v4();
    },
    setID: (state, action: PayloadAction<string | undefined>) => {
      state.id = action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string | undefined>) => {
      state.displayName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string | undefined>) => {
      state.email = action.payload;
    },
    setPhotoURL: (state, action: PayloadAction<string | undefined>) => {
      state.photoURL = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.code = undefined;
      state.state = undefined;
      state.id = undefined;
      state.displayName = undefined;
      state.email = undefined;
      state.photoURL = undefined;
      state.isLoading = false;
    });
  },
});

const { actions, reducer } = linkedinSlice;

export const {
  genState,
  setCode,
  setEmail,
  setDisplayName,
  setID,
  setPhotoURL,
  setLoading,
} = actions;

export const selectCode = (state: RootState) => state.linkedin.code;

export const selectState = (state: RootState) => state.linkedin.state;

export const selectID = (state: RootState) => state.linkedin.id;

export const selectDisplayName = (state: RootState) =>
  state.linkedin.displayName;

export const selectEmail = (state: RootState) => state.linkedin.email;

export const selectPhotoURL = (state: RootState) => state.linkedin.photoURL;

export const selectIsLoading = (state: RootState) => state.linkedin.isLoading;

export const selectAuthorizationURI = (state: RootState) => {
  return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURI(
    LINKEDIN_REDIRECT_URI
  )}&state=${state.linkedin.state}&scope=${state.linkedin.permissions
    .join("%20")
    .trim()}`;
};

export default reducer;
