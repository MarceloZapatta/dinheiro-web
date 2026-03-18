import { Account } from "./account";
import { Category } from "./category";

interface RelatedTransaction {
  id: number;
  conta: Account;
}

interface CreditCardInvoice {
  id: number;
  reference_date: string;
}

export interface Transaction {
  id: number;
  data_transacao: string;
  descricao: string;
  valor: number;
  conta: Account;
  movimentacao_relacao: RelatedTransaction | null;
  categoria: Category;
  credit_card_invoice: CreditCardInvoice | null;
  created_at: string;
  updated_at: string;
}

export enum TransactionType {
  BANK = "bank",
  CREDIT_CARD = "credit_card",
}
