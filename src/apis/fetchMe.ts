import { IMeResponse } from "@/types";

export const fetchMe = async (accessToken: string) => {
  const response = await fetch(
    `https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const result: IMeResponse = await response.json();

  const elements = result.profilePicture["displayImage~"]["elements"];

  const photoURL =
    result.profilePicture["displayImage~"].elements[elements.length - 1]
      .identifiers[0].identifier;

  const displayName = `${Object.values(result.firstName.localized)[0]} ${
    Object.values(result.lastName.localized)[0]
  }`;

  return {
    ID: result.id,
    displayName,
    photoURL,
  };
};
