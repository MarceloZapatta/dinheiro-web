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
import { ArrowRight, Circle, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { Params } from "next/dist/server/request/params";
import { CreditCardInvoiceCard } from "@/components/credit-cards/invoices/credit-card-invoice-card";
import { format } from "date-fns/format";

interface CreditCardInvoicesParams extends Params {
  readonly id: string;
}

export default function CreditCardInvoices() {
  const { id } = useParams<CreditCardInvoicesParams>();
  const creditCards = useStoreState((state) => state.creditCards.creditCards);
  const { invoices, currentInvoice } = useStoreState(
    (state) => state.creditCards,
  );
  const fetchInvoices = useStoreActions(
    (actions) => actions.creditCards.fetchInvoices,
  );
  const editCreditCard = useStoreActions(
    (actions) => actions.creditCards.editCreditCard,
  );
  const openAddNewCreditCardModal = useStoreActions(
    (actions) => actions.creditCards.openAddNewCreditCardModal,
  );

  useEffect(() => {
    (async () => {
      await fetchInvoices(Number(id));
    })();
  }, [fetchInvoices, id]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-4 bg-white dark:bg-black sm:items-start">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl pb-5">Faturas</h1>
          <Button onClick={() => openAddNewCreditCardModal()}>
            <Plus />
          </Button>
        </div>
        {invoices.length === 0 && (
          <div className="flex justify-between w-full">
            Nenhuma fatura encontrada.
          </div>
        )}
        <div className="flex justify-between w-full">
          {invoices.map((invoice) => (
            <CreditCardInvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
        {currentInvoice && (
          <div className="w-full">
            <h2 className="text-xl py-5">
              Fatura:{" "}
              {format(new Date(currentInvoice.reference_date), "MM/yyyy")}
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentInvoice?.transactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">
                      Nenhuma transação encontrada.
                    </TableCell>
                  </TableRow>
                )}
                {currentInvoice?.transactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    onClick={() => editCreditCard(transaction)}
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
          </div>
        )}
      </main>
    </div>
  );
}
