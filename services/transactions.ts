import { Account } from "@/types/account";
import { retrieveToken } from "./auth";
import { Category } from "@/types/category";

export interface Transaction {
  id: string;
  descricao: string;
  valor: number;
  conta: Account;
  categoria: Category;
  created_at: string;
  updated_at: string;
}

interface TransactionResponse {
  data: Transaction[];
}

export interface TransactionData {
  descricao: string;
  valor: number;
  conta_id: string;
  categoria_id: string;
}

export async function fetchTransactions(): Promise<TransactionResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }

  console.log(await retrieveToken());

  const res = await fetch(
    `${apiUrl}/transactions?date_start=2025-11-01&date_end=2025-11-30`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${await retrieveToken()}`,
      },
    }
  );

  if (!res.ok) {
    console.error("Fetching transactions failed");
    return;
  }

  return await res.json();
}

export async function storeTransaction(data: TransactionData) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL is not defined");
    return;
  }

  const res = await fetch(`${apiUrl}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${await retrieveToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error("Storing transaction failed");
    return;
  }

  const result = await res.json();
  console.log(result);
}
