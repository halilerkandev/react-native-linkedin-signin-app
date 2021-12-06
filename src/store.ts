import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";
import { setupListeners } from "@reduxjs/toolkit/query";

import themeReducer from "@/slices/ThemeSlice";
import navigationReducer from "@/slices/NavigationSlice";
import linkedinReducer from "@/slices/LinkedinSlice";
import firebaseReducer from "@/slices/FirebaseSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  navigation: navigationReducer,
  linkedin: linkedinReducer,
  firebase: firebaseReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage: ExpoFileSystemStorage,
    whitelist: ["theme", "navigation"],
  },
  rootReducer
);

let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupListeners(store.dispatch);

export let persistor = persistStore(store);

export const { purge } = persistor;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
