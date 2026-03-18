import { Transaction } from "./transaction";

export interface CreditCard {
  id: number;
  nome: string;
  cor: Cor;
  credit_limit: number;
  closing_day: number;
  due_day: number;
}

export interface CreditCardEdit {
  id: number;
  nome: string;
  cor_id: number;
}

export interface CreditCardInvoice {
  id: number;
  conta_id: number;
  reference_date: string;
  closing_date: string;
  total_amount: number;
  is_paid: boolean;
  transactions: Transaction[];
}
