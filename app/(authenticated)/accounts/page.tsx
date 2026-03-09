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
import { useEffect } from "react";

export default function Accounts() {
  const accounts = useStoreState((state) => state.accounts);
  const fetchAccounts = useStoreActions((actions) => actions.fetchAccounts);
  const editAccount = useStoreActions((actions) => actions.editAccount);
  const openAddNewAccountModal = useStoreActions(
    (actions) => actions.openAddNewAccountModal,
  );

  useEffect(() => {
    (async () => {
      await fetchAccounts();
    })();
  }, [fetchAccounts]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-4 bg-white dark:bg-black sm:items-start">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl pb-5">Contas</h1>
          <Button onClick={() => openAddNewAccountModal()}>
            <Plus />
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.length === 0 && (
              <TableRow>
                <TableCell colSpan={1} className="text-center">
                  Nenhuma conta encontrada.
                </TableCell>
              </TableRow>
            )}
            {accounts.map((account) => (
              <TableRow key={account.id} onClick={() => editAccount(account)}>
                <TableCell className="font-medium">
                  <div className="flex gap-2">
                    <span className="flex">
                      <Circle
                        color={account.cor.hexadecimal}
                        size={14}
                        className="mr-2 mt-1"
                      />
                      {account.nome}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
