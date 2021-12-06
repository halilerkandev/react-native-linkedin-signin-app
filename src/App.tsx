import "react-native-gesture-handler";
import React from "react";
import { LogBox } from "react-native";
import { registerRootComponent } from "expo";
import { polyfillWebCrypto } from "expo-standard-web-crypto";

import {
  ReduxContainer,
  NativeBaseContainer,
  RootNavigationContainer,
} from "@/containers";

polyfillWebCrypto();

export default function App() {
  LogBox.ignoreLogs([
    "Require cycle:",
    "Random.getRandomBytes is not supported",
    "SerializableStateInvariantMiddleware took",
    "ImmutableStateInvariantMiddleware took",
    "Unexpected key",
    "not found in theme scale of sizes",
    "should be passed as a string.",
    "not found in theme scale of lineHeights.",
    "not found in theme scale of fontSizes.",
    "NativeBase: The contrast ratio of",
    "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
    "Token 2px not found in theme scale of space.",
  ]);

  return (
    <ReduxContainer>
      <NativeBaseContainer>
        <RootNavigationContainer />
      </NativeBaseContainer>
    </ReduxContainer>
  );
}

registerRootComponent(App);
