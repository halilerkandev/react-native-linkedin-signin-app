import { IEmailResponse } from "@/types";

export const fetchEmail = async (accessToken: string) => {
  const response = await fetch(
    `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const result: IEmailResponse = await response.json();

  const email = result.elements[0]["handle~"].emailAddress;

  return { email };
};
