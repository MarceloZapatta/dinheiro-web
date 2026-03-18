export interface Account {
  id: number;
  nome: string;
  cor: Cor;
  saldo_inicial: number;
  account_type: AccountType;
}

export interface AccountEdit {
  id: number;
  nome: string;
  cor_id: number;
  account_type: AccountType;
}

export enum AccountType {
  BANK = "bank",
  INVESTMENT = "investment",
  CREDIT_CARD = "credit_card",
}
