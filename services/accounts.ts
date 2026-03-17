import { Account } from "@/types/account";
import { DataFields, deleteApi, getApi, postApi, putApi } from "./api";

export interface AccountData extends DataFields {
  nome: string;
  saldo_inicial: number;
  cor_id: number;
}

interface AccountResponse {
  data: Account[];
}

export async function fetchAccounts(): Promise<AccountResponse | undefined> {
  const res = await getApi("contas");

  if (!res.ok) {
    console.error("Fetching accounts failed");
    return;
  }

  return await res.json();
}

export async function storeAccount(data: AccountData) {
  const res = await postApi("contas", data);

  if (!res.ok) {
    console.error("Storing account failed");
    return;
  }

  const result = await res.json();
  console.log(result);
}

export async function updateAccount(id: number, data: AccountData) {
  const res = await putApi(`contas/${id}`, data);

  if (!res.ok) {
    console.error("Updating account failed");
    return;
  }

  const result = await res.json();
  console.log(result);
}

export async function deleteAccount(id: number) {
  const res = await deleteApi(`contas/${id}`);

  if (!res.ok) {
    console.error("Deleting account failed");
    return;
  }

  const result = await res.json();
  console.log(result);
}
