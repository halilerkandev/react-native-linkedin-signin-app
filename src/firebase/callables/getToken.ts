import { httpsCallable } from "firebase/functions";

import { functions } from "../config";

const GET_TOKEN = "getToken";

interface IGetTokenRequestData {
  id: string;
}

interface IGetTokenResponseData {
  success: boolean;
  data?: {
    token: string;
  };
  error?: any;
}

export const getToken = httpsCallable<
  IGetTokenRequestData,
  IGetTokenResponseData
>(functions, GET_TOKEN);
