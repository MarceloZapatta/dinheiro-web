import { CreditCard } from "@/types/credit-card";
import { retrieveToken } from "./auth";
import { DataFields, postApi, putApi } from "./api";

export interface CreditCardData extends DataFields {
  nome: string;
  credit_limit: number;
  closing_day: number;
  due_day: number;
  cor_id: number;
}

interface CreditCardResponse {
  data: CreditCard[];
}

export async function fetchCreditCards(): Promise<
  CreditCardResponse | undefined
> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL is not defined");
    return;
  }

  const res = await fetch(`${apiUrl}/credit-cards`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${await retrieveToken()}`,
    },
  });

  if (!res.ok) {
    console.error("Fetching credit cards failed");
    return;
  }

  return await res.json();
}

export async function storeCreditCard(data: CreditCardData) {
  const res = await postApi("credit-cards", data);

  if (!res.ok) {
    console.error("Storing credit card failed");
    return;
  }

  const result = await res.json();
  console.log(result);
}

export async function updateCreditCard(id: number, data: CreditCardData) {
  const res = await putApi(`credit-cards/${id}`, data);

  if (!res.ok) {
    console.error("Updating credit card failed");
    return;
  }

  const result = await res.json();
  console.log(result);
}

export async function deleteCreditCard(id: number) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL is not defined");
    return;
  }

  const res = await fetch(`${apiUrl}/credit-cards/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${await retrieveToken()}`,
    },
  });

  if (!res.ok) {
    console.error("Deleting credit card failed");
    return;
  }

  return await res.json();
}
