import React from "react";
import { NativeBaseProvider, ColorMode } from "native-base";
import type { StorageManager } from "native-base";

import { CustomTheme } from "@/themes";
import { selectColorMode, setColorMode } from "@/slices/ThemeSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";

export const NativeBaseContainer: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const colorMode = useAppSelector(selectColorMode);

  const colorModeManager: StorageManager = {
    get: async () => {
      return colorMode;
    },
    set: async (value: ColorMode) => {
      await dispatch(setColorMode(value));
    },
  };

  return (
    <NativeBaseProvider
      config={{ strictMode: "warn" }}
      theme={CustomTheme}
      colorModeManager={colorModeManager}
    >
      {children}
    </NativeBaseProvider>
  );
};
