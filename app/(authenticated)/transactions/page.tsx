"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStoreActions, useStoreState } from "@/store/hooks";
import { ChevronLeft, ChevronRight, Circle, Plus } from "lucide-react";
import { useEffect } from "react";
import { format, parse } from "date-fns";

export default function Transactions() {
  const transactions = useStoreState((state) => state.transactions);
  const transactionsStartPeriod = useStoreState(
    (state) => state.transactionsStartPeriod
  );
  const moveNextTransactionsPeriod = useStoreActions(
    (actions) => actions.moveNextTransactionsPeriod
  );
  const movePreviousTransactionsPeriod = useStoreActions(
    (actions) => actions.movePreviousTransactionsPeriod
  );
  const editTransaction = useStoreActions((actions) => actions.editTransaction);

  const fetchTransactions = useStoreActions(
    (actions) => actions.fetchTransactions
  );

  const openAddNewTransactionModal = useStoreActions(
    (actions) => actions.openAddNewTransactionModal
  );

  const handleNextPeriod = () => {
    moveNextTransactionsPeriod();
  };

  const handlePreviousPeriod = () => {
    movePreviousTransactionsPeriod();
  };

  const currentPeriod = format(
    parse(transactionsStartPeriod, "yyyy-MM-dd", new Date()),
    "MMMM yyyy"
  );

  const capitalizedPeriod =
    currentPeriod.charAt(0).toUpperCase() + currentPeriod.slice(1);

  useEffect(() => {
    (async () => {
      await fetchTransactions();
    })();
  }, [fetchTransactions]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl pb-5">Movimentações</h1>
          <Button onClick={() => openAddNewTransactionModal()}>
            <Plus />
          </Button>
        </div>
        <div className="flex justify-between w-full p-4">
          <Button variant={"ghost"} onClick={handlePreviousPeriod}>
            <ChevronLeft />
          </Button>
          <span>{capitalizedPeriod}</span>
          <Button variant={"ghost"} onClick={handleNextPeriod}>
            <ChevronRight />
          </Button>
        </div>
        <Table>
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
              <TableRow
                key={transaction.id}
                onClick={() => editTransaction(transaction)}
              >
                <TableCell className="font-medium">
                  {transaction.descricao}
                </TableCell>
                <TableCell>{transaction.conta.nome}</TableCell>
                <TableCell>
                  <span className="flex">
                    <Circle
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
