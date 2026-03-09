import { retrieveToken } from "./auth";

interface ColorResponse {
  data: Cor[];
}

export async function fetchColors(): Promise<ColorResponse | undefined> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL is not defined");
    return;
  }

  const res = await fetch(`${apiUrl}/cores`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${await retrieveToken()}`,
    },
  });

  if (!res.ok) {
    console.error("Fetching colors failed");
    return;
  }

  return await res.json();
}
