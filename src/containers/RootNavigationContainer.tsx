import React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { useColorMode, useColorModeValue, useTheme } from "native-base";

import { selectInitialState, setInitialState } from "@/slices/NavigationSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { LoginNavigator, RootNavigator } from "@/navigators";
import { useAuth } from "@/hooks";

export const RootNavigationContainer: React.VFC = () => {
  const { colorMode } = useColorMode();
  const dispatch = useAppDispatch();
  const initialState = useAppSelector(selectInitialState);
  const theme = useTheme();
  const { user } = useAuth();

  const RootNavigationTheme: Theme = {
    dark: colorMode === "dark",
    colors: {
      background: useColorModeValue("#fafaf9", "#1f2937"),
      border: useColorModeValue("#fafaf9", "#1f2937"),
      text: useColorModeValue(theme.colors.darkText, theme.colors.lightText),
      card: useColorModeValue("#fafaf9", "#1f2937"),
      primary: useColorModeValue("#fafaf9", "#1f2937"),
      notification: useColorModeValue("#fafaf9", "#1f2937"),
    },
  };

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) => dispatch(setInitialState(state))}
      theme={RootNavigationTheme}
    >
      {user ? <RootNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};
