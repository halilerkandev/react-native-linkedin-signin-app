import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "@/screens";
import { RootStackParamList } from "@/types";

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NativeStack.Navigator initialRouteName="HomeScreen">
      <NativeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: "Home" }}
      />
    </NativeStack.Navigator>
  );
};
