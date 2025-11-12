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

export async function fetchTransactions(
  startPeriod: string,
  endPeriod: string
): Promise<TransactionResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }

  const res = await fetch(
    `${apiUrl}/transactions?date_start=${startPeriod}&date_end=${endPeriod}`,
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
