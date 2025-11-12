export interface Transaction {
  id: string;
  descricao: string;
  valor: number;
  conta: Account;
  categoria: Category;
  created_at: string;
  updated_at: string;
}
