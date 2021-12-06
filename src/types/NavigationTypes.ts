import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  HomeScreen: undefined;
};

export type LoginStackParamList = {
  LinkedinLoginModalScreen: undefined;
  LoginScreen: undefined;
  RoleSelectionScreen: undefined;
};

// HomeScreen
export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "HomeScreen"
>;

export type HomeScreenNavigationProp = HomeScreenProps["navigation"];

export type HomeScreenRouteProp = HomeScreenProps["route"];

// LinkedinLoginModalScreen
export type LinkedinLoginModalScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  "LinkedinLoginModalScreen"
>;

export type LinkedinLoginModalScreenNavigationProp =
  LinkedinLoginModalScreenProps["navigation"];

export type LinkedinLoginModalScreenRouteProp =
  LinkedinLoginModalScreenProps["route"];

// LoginScreen
export type LoginScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  "LoginScreen"
>;

export type LoginScreenNavigationProp = LoginScreenProps["navigation"];

export type LoginScreenRouteProp = LoginScreenProps["route"];

// RoleSelectionScreen
export type RoleSelectionScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  "RoleSelectionScreen"
>;

export type RoleSelectionScreenNavigationProp =
  RoleSelectionScreenProps["navigation"];

export type RoleSelectionScreenRouteProp = RoleSelectionScreenProps["route"];
