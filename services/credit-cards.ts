import { CreditCard, CreditCardInvoice } from "@/types/credit-card";
import { retrieveToken } from "./auth";
import { DataFields, deleteApi, getApi, postApi, putApi } from "./api";

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

interface CreditCardInvoiceResponse {
  data: CreditCardInvoice[];
}

export async function fetchCreditCards(): Promise<
  CreditCardResponse | undefined
> {
  const res = await getApi("credit-cards");

  if (!res.ok) {
    console.error("Fetching credit cards failed");
    return;
  }

  return await res.json();
}

export async function fetchInvoices(
  creditCardId: number,
): Promise<CreditCardInvoiceResponse | undefined> {
  const res = await getApi(`credit-cards/${creditCardId}/invoices`);

  if (!res.ok) {
    console.error("Fetching credit card invoices failed");
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
  const res = await deleteApi(`credit-cards/${id}`);

  if (!res.ok) {
    console.error("Deleting credit card failed");
    return;
  }

  return await res.json();
}
