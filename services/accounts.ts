import { Account } from "@/types/account";
import { retrieveToken } from "./auth";

interface AccountResponse {
  data: Account[];
}

export async function fetchAccounts(): Promise<AccountResponse | undefined> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL is not defined");
    return;
  }

  const res = await fetch(`${apiUrl}/contas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${await retrieveToken()}`,
    },
  });

  if (!res.ok) {
    console.error("Fetching accounts failed");
    return;
  }

  return await res.json();
}
