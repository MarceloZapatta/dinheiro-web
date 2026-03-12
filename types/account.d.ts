export interface Account {
  id: number;
  nome: string;
  cor: Cor;
  saldo_inicial: number;
}

export interface AccountEdit {
  id: number;
  nome: string;
  cor_id: number;
}
