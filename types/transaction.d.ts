export interface Transaction {
  id: number;
  data_transacao: string;
  descricao: string;
  valor: number;
  conta: Account;
  categoria: Category;
  created_at: string;
  updated_at: string;
}
