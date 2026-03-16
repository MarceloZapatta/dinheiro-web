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
