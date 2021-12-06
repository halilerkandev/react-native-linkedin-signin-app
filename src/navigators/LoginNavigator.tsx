import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton, ChevronLeftIcon, ChevronRightIcon } from "native-base";

import {
  selectID,
  selectDisplayName,
  selectPhotoURL,
  selectEmail,
} from "@/slices/LinkedinSlice";
import { useAppSelector } from "@/hooks";
import {
  LoginScreen,
  LinkedinLoginModalScreen,
  RoleSelectionScreen,
} from "@/screens";
import { LoginStackParamList, LoginScreenNavigationProp } from "@/types";

const NativeStack = createNativeStackNavigator<LoginStackParamList>();

export const LoginNavigator = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const ID = useAppSelector(selectID);
  const displayName = useAppSelector(selectDisplayName);
  const photoURL = useAppSelector(selectPhotoURL);
  const email = useAppSelector(selectEmail);

  return (
    <NativeStack.Navigator initialRouteName="LoginScreen">
      <NativeStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerTitle: "Login",
          headerRight: () => {
            return ID && displayName && photoURL && email ? (
              <IconButton
                icon={<ChevronRightIcon />}
                _icon={{
                  color: "black",
                  size: "7",
                }}
                alignItems="center"
                justifyContent="center"
                onPress={() => navigation.navigate("RoleSelectionScreen")}
              />
            ) : null;
          },
        }}
      />
      <NativeStack.Screen
        name="LinkedinLoginModalScreen"
        component={LinkedinLoginModalScreen}
        options={{
          headerTitle: "Sign in with Linkedin",
          presentation: "fullScreenModal",
          headerLeft: ({ canGoBack }) => {
            return canGoBack ? (
              <IconButton
                icon={<ChevronLeftIcon />}
                _icon={{
                  color: "black",
                  size: "7",
                }}
                alignItems="center"
                justifyContent="center"
                onPress={() => navigation.goBack()}
              />
            ) : null;
          },
        }}
      />
      <NativeStack.Screen
        name="RoleSelectionScreen"
        component={RoleSelectionScreen}
        options={{
          headerTitle: "Role Selection",
          headerLeft: ({ canGoBack }) => {
            return canGoBack ? (
              <IconButton
                icon={<ChevronLeftIcon />}
                _icon={{
                  color: "black",
                  size: "7",
                }}
                alignItems="center"
                justifyContent="center"
                onPress={() => navigation.goBack()}
              />
            ) : null;
          },
        }}
      />
    </NativeStack.Navigator>
  );
};
