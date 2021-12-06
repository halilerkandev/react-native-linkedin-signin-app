import { httpsCallable } from "firebase/functions";
import { User } from "firebase/auth";

import { functions } from "../config";

const GET_USER = "getUser";

interface IGetUserRequestData {
  id: string;
}

interface IGetUserResponseData {
  success: boolean;
  data?: {
    user: User;
  };
  error?: any;
}

export const getUser = httpsCallable<IGetUserRequestData, IGetUserResponseData>(
  functions,
  GET_USER
);
