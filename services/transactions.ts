import { retrieveToken } from "@/services/auth";
import { Transaction } from "@/types/transaction";
import {
  ApiResponse,
  DataFields,
  getApi,
  postApi,
  putApi,
} from "@/services/api";

interface CheckImportTransactionsResponse {
  movimentacoes: Transaction[];
}

export interface TransactionData extends DataFields {
  data_transacao: string;
  descricao: string;
  valor: number;
  conta_id: string;
  categoria_id: string;
  despesa: "1" | "0";
}

interface ImportTransactionsResponse {
  movimentacao_importacao: {
    id: number;
  };
}

export async function fetchTransactions(
  startPeriod: string,
  endPeriod: string
): Promise<ApiResponse<Transaction[]>> {
  const res = await getApi("transactions", {
    date_start: startPeriod,
    date_end: endPeriod,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return await res.json();
}

export async function storeTransaction(data: TransactionData) {
  const res = await postApi("transactions", data);

  if (!res.ok) {
    console.error("Storing transaction failed");
    return;
  }

  const result = await res.json();
  console.log(result);
}

export async function updateTransaction(id: number, data: TransactionData) {
  const res = await putApi(`transactions/${id}`, data);

  if (!res.ok) {
    console.error("Storing transaction failed");
    return;
  }

  const result = await res.json();
  console.log(result);
}

export async function deleteTransaction(id: number) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL is not defined");
    return;
  }

  const res = await fetch(`${apiUrl}/transactions/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${await retrieveToken()}`,
    },
  });

  if (!res.ok) {
    console.error("Storing transaction failed");
    return;
  }

  const result = await res.json();
  console.log(result);
}

export async function importTransactionsFile(
  file: File,
  type: "ofx" = "ofx"
): Promise<ApiResponse<ImportTransactionsResponse>> {
  console.log(file);

  const res = await postApi(
    `transactions/import/${type}`,
    {
      file: file,
    },
    true
  );

  if (!res.ok) {
    throw new Error("Importing transactions file failed");
  }

  return await res.json();
}

export async function fetchImportTransactions(
  importId: number
): Promise<ApiResponse<CheckImportTransactionsResponse>> {
  const res = await getApi(`transactions/import/${importId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch imported transactions");
  }

  return await res.json();
}

export async function confirmImportTransactions(
  importId: number
): Promise<void> {
  const res = await postApi(`transactions/import/${importId}/confirm`, {});

  if (!res.ok) {
    console.error("Confirming imported transactions failed");
    return;
  }

  const result = await res.json();
  console.log(result);
}
