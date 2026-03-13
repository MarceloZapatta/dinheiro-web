export interface Transaction {
  id: number;
  data_transacao: string;
  descricao: string;
  valor: number;
  conta: Account;
  conta_relacao: Account;
  categoria: Category;
  created_at: string;
  updated_at: string;
}
