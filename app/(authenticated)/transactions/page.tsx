"use client";

import { Button } from "@/components/ui/button";
import { CircleFillIcon } from "@/components/ui/icons/akar-icons-circle-fill";
import { PlusIcon } from "@/components/ui/icons/akar-icons-plus";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchTransactions, Transaction } from "@/services/transactions";
import { useStoreActions } from "@/store/hooks";
import { useEffect, useState } from "react";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadTransactions = async () => {
    const response = await fetchTransactions();
    setTransactions(response.data);
  };

  const toggleTransactionModal = useStoreActions(
    (actions) => actions.toggleTransactionModal
  );

  useEffect(() => {
    (async () => {
      await loadTransactions();
    })();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl pb-5">Movimentações</h1>
          <Button onClick={() => toggleTransactionModal()}>
            <PlusIcon />
          </Button>
        </div>
        <Table>
          <TableCaption>Movimentações do mês</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Descrição</TableHead>
              <TableHead>Conta</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {transaction.descricao}
                </TableCell>
                <TableCell>{transaction.conta.nome}</TableCell>
                <TableCell>
                  <span className="flex">
                    <CircleFillIcon
                      color={transaction.categoria.cor.hexadecimal}
                      size={14}
                      className="mr-2 mt-1"
                    />
                    {transaction.categoria.nome}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {Number(transaction.valor).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
