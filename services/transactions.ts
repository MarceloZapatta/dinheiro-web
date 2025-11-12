import { retrieveToken } from "@/services/auth";
import { Transaction } from "@/types/transaction";

interface TransactionResponse {
  data: Transaction[];
}

export interface TransactionData {
  data_transacao: string;
  descricao: string;
  valor: number;
  conta_id: string;
  categoria_id: string;
  despesa: "1" | "0";
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
    throw new Error("Failed to fetch transactions");
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
