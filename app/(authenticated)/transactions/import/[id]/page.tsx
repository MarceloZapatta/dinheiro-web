"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  confirmImportTransactions,
  fetchImportTransactions,
} from "@/services/transactions";
import { useStoreActions } from "@/store/hooks";
import { Transaction } from "@/types/transaction";
import { Circle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Import() {
  const router = useRouter();
  const params = useParams();
  const [importTransactions, setImportTransactions] = useState<Transaction[]>(
    []
  );
  const editTransaction = useStoreActions((actions) => actions.editTransaction);

  useEffect(() => {
    const handleFetchImportTransactions = async () => {
      const response = await fetchImportTransactions(Number(params.id));
      setImportTransactions(response.data.movimentacoes);
    };
    handleFetchImportTransactions();
  }, [params.id]);

  const handleConfirmImport = async () => {
    await confirmImportTransactions(Number(params.id));
    router.push("/transactions");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-4 bg-white dark:bg-black sm:items-start">
        <h1 className="text-2xl pb-5">Conferir importação</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {importTransactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  Nenhuma movimentação encontrada.
                </TableCell>
              </TableRow>
            )}
            {importTransactions.map((transaction) => (
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
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => router.push("/transactions")}
          >
            Cancelar importação
          </Button>
          <Button className="mt-4" onClick={() => handleConfirmImport()}>
            Confirmar importação
          </Button>
        </div>
      </main>
    </div>
  );
}
