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
import { Circle, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function CreditCards() {
  const creditCards = useStoreState((state) => state.creditCards.creditCards);
  const fetchCreditCards = useStoreActions(
    (actions) => actions.creditCards.fetchCreditCards,
  );
  const editCreditCard = useStoreActions(
    (actions) => actions.creditCards.editCreditCard,
  );
  const openAddNewCreditCardModal = useStoreActions(
    (actions) => actions.creditCards.openAddNewCreditCardModal,
  );

  useEffect(() => {
    (async () => {
      await fetchCreditCards();
    })();
  }, [fetchCreditCards]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-4 bg-white dark:bg-black sm:items-start">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl pb-5">Cartões de crédito</h1>
          <Button onClick={() => openAddNewCreditCardModal()}>
            <Plus />
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Faturas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {creditCards.length === 0 && (
              <TableRow>
                <TableCell colSpan={1} className="text-center">
                  Nenhum cartão de crédito encontrado.
                </TableCell>
              </TableRow>
            )}
            {creditCards.map((creditCard) => (
              <TableRow
                key={creditCard.id}
                onClick={() => editCreditCard(creditCard)}
              >
                <TableCell className="font-medium">
                  <div className="flex gap-2">
                    <span className="flex">
                      <Circle
                        color={creditCard.cor.hexadecimal}
                        size={14}
                        className="mr-2 mt-1"
                      />
                      {creditCard.nome}
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  className="font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link href={`/credit-cards/${creditCard.id}/invoices`}>
                    <Button>Visualizar faturas</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
