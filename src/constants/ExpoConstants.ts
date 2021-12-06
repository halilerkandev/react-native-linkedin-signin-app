import Constants from "expo-constants";

export const LINKEDIN_CLIENT_ID = Constants?.manifest?.extra?.linkedinClientId;

export const LINKEDIN_CLIENT_SECRET =
  Constants?.manifest?.extra?.linkedinClientSecret;

export const LINKEDIN_REDIRECT_URI = `https://${Constants?.manifest?.extra?.webAPIKey}.firebaseapp.com`;
