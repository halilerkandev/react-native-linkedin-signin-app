import { httpsCallable } from "firebase/functions";

import { functions } from "../config";

const DELETE_USER = "deleteUser";

interface IDeleteUserRequestData {
  id: string;
}

interface IDeleteUserResponseData {
  success: boolean;
  error?: any;
}

export const deleteUser = httpsCallable<
  IDeleteUserRequestData,
  IDeleteUserResponseData
>(functions, DELETE_USER);
