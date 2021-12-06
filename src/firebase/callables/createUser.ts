import { httpsCallable } from "firebase/functions";

import { functions } from "../config";

const CREATE_USER = "createUser";

interface ICreateUserRequestData {
  id: string;
  email: string;
  displayName: string;
  role: string;
  photoURL: string;
}

interface ICreateUserResponseData {
  success: boolean;
  data?: {
    token: string;
  };
  error?: any;
}

export const createUser = httpsCallable<
  ICreateUserRequestData,
  ICreateUserResponseData
>(functions, CREATE_USER);
