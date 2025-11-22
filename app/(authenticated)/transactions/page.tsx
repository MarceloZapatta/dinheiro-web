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
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Minus,
  Plus,
} from "lucide-react";
import { useEffect } from "react";
import { format, parse } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

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
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-4 bg-white dark:bg-black sm:items-start">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl pb-5">Movimentações</h1>
          <Popover>
            <PopoverTrigger>
              <Button>
                <Plus />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-32">
              <div className="flex flex-col gap-2">
                <Button
                  variant={"secondary"}
                  onClick={() => openAddNewTransactionModal()}
                >
                  <Minus /> Despesa
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() => openAddNewTransactionModal()}
                >
                  <Plus /> Receita
                </Button>
                <Link href={"/transactions/import"}>
                  <Button variant={"secondary"}>
                    <ArrowDown /> Importar
                  </Button>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
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
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  Nenhuma movimentação encontrada.
                </TableCell>
              </TableRow>
            )}
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                onClick={() => editTransaction(transaction)}
              >
                <TableCell className="font-medium">
                  {transaction.descricao}
                  <br />
                  <div className="flex gap-2">
                    <span className="flex">
                      <Circle
                        color={transaction.conta.cor.hexadecimal}
                        size={14}
                        className="mr-2 mt-1"
                      />
                      {transaction.conta.nome}
                    </span>
                    <span className="flex">
                      <Circle
                        color={transaction.categoria.cor.hexadecimal}
                        size={14}
                        className="mr-2 mt-1"
                      />
                      {transaction.categoria.nome}
                    </span>
                  </div>
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
