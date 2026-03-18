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
  ArrowLeftRight,
  ArrowRight,
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
import { MonthFilter } from "@/components/ui/month-filter";
import { Transaction } from "@/types/transaction";
import { Badge } from "@/components/ui/badge";

export default function Transactions() {
  const { transactions, transactionsStartPeriod } = useStoreState(
    (state) => state.transactions,
  );

  const {
    moveNextTransactionsPeriod,
    movePreviousTransactionsPeriod,
    editTransaction,
    fetchTransactions,
    openAddNewTransactionModal,
  } = useStoreActions((actions) => actions.transactions);

  const handleNextPeriod = () => {
    moveNextTransactionsPeriod();
  };

  const handlePreviousPeriod = () => {
    movePreviousTransactionsPeriod();
  };

  const currentPeriod = format(
    parse(transactionsStartPeriod, "yyyy-MM-dd", new Date()),
    "MMMM yyyy",
  );

  useEffect(() => {
    (async () => {
      await fetchTransactions();
    })();
  }, [fetchTransactions]);

  const handleClickTransferTransaction = () => {
    const isTransfer = true;
    openAddNewTransactionModal(isTransfer);
  };

  const mapCategoryName = (transaction: Transaction) => {
    if (transaction.categoria.nome === "Transferência") {
      return transaction.valor < 0
        ? "Transferência (Saída)"
        : "Transferência (Entrada)";
    }
    return transaction.categoria.nome;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-4 bg-white dark:bg-black sm:items-start">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl pb-5">Movimentações</h1>
          <Popover>
            <PopoverTrigger>
              <Button asChild>
                <Plus />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <div className="flex flex-col gap-2">
                <Button
                  variant={"secondary"}
                  onClick={() => openAddNewTransactionModal()}
                  className="w-full"
                >
                  <Minus /> Despesa
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() => openAddNewTransactionModal()}
                  className="w-full"
                >
                  <Plus /> Receita
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() => handleClickTransferTransaction()}
                  className="w-full"
                >
                  <ArrowLeftRight /> Transferência
                </Button>
                <Link href={"/transactions/import"}>
                  <Button variant={"secondary"} className="w-full">
                    <ArrowDown /> Importar
                  </Button>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <MonthFilter
          currentPeriod={currentPeriod}
          onNextPeriod={handleNextPeriod}
          onPreviousPeriod={handlePreviousPeriod}
        />
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
                  <small>
                    {format(new Date(transaction.data_transacao), "dd/MM")}
                  </small>
                  <br />
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
                      {transaction.credit_card_invoice && (
                        <Badge className="mx-2">
                          Fatura:{" "}
                          {format(
                            new Date(
                              transaction.credit_card_invoice.reference_date,
                            ),
                            "MM/yyyy",
                          )}
                        </Badge>
                      )}
                    </span>
                    {transaction.movimentacao_relacao && (
                      <span className="flex">
                        <ArrowRight size={18} className="mr-2" />
                        <Circle
                          color={
                            transaction.movimentacao_relacao.conta.cor
                              .hexadecimal
                          }
                          size={14}
                          className="mr-2 mt-1"
                        />
                        {transaction.movimentacao_relacao.conta.nome}
                      </span>
                    )}
                    <span className="flex">
                      <Circle
                        color={transaction.categoria.cor.hexadecimal}
                        size={14}
                        className="mr-2 mt-1"
                      />
                      {mapCategoryName(transaction)}
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
