interface RelatedTransaction {
  id: number;
  conta: Account;
}

export interface Transaction {
  id: number;
  data_transacao: string;
  descricao: string;
  valor: number;
  conta: Account;
  movimentacao_relacao: RelatedTransaction | null;
  categoria: Category;
  created_at: string;
  updated_at: string;
}
