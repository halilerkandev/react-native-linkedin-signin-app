import {
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
  LINKEDIN_REDIRECT_URI,
} from "@/constants";

export const fetchAccessToken = async (code: string) => {
  const response = await fetch(
    `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${encodeURI(
      LINKEDIN_REDIRECT_URI
    )}&client_id=${LINKEDIN_CLIENT_ID}&client_secret=${LINKEDIN_CLIENT_SECRET}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const result: {
    access_token: string;
    expires_in: number;
  } = await response.json();

  return {
    accessToken: result.access_token,
    expiresIn: result.expires_in,
  };
};
