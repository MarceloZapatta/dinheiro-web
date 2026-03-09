"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStoreActions, useStoreState } from "@/store/hooks";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { FormProvider, useForm } from "react-hook-form";
import NumberInput from "@/components/ui/number-input";
import {
  AccountData,
  deleteAccount,
  fetchAccounts,
  storeAccount,
  updateAccount,
} from "@/services/accounts";
import AccountSelect from "../ui/accounts/account-select";
import CategorySelect from "../ui/categories/categories-select";
import DatePicker from "../ui/date-picker";
import { DevTool } from "@hookform/devtools";
import TypeRadioGroup from "../ui/transactions/type-radio-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function AccountModal() {
  const accountEdit = useStoreState((state) => state.accountEdit);

  const methods = useForm<AccountData>({
    defaultValues: {
      nome: "",
      saldo_inicial: 0,
      cor_id: 0,
    },
  });
  const open = useStoreState((state) => state.transactionModalOpen);
  const toggleTransactionModal = useStoreActions(
    (actions) => actions.toggleTransactionModal,
  );
  const setAccounts = useStoreActions((actions) => actions.setAccounts);
  const fetchCategories = useStoreActions((actions) => actions.fetchCategories);

  const [loading, setLoading] = useState(false);

  const handleSaveAccount = async (data: AccountData) => {
    setLoading(true);

    if (accountEdit) {
      await updateAccount(accountEdit.id, data);
    } else {
      await storeAccount(data);
    }

    fetchAccounts();
    toggleTransactionModal();
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (!accountEdit) return;

    setLoading(true);
    await deleteAccount(accountEdit.id);
    fetchAccounts();
    toggleTransactionModal();
    setLoading(false);
  };

  useEffect(() => {
    if (accountEdit) {
      methods.reset({
        nome: accountEdit.nome,
        saldo_inicial: accountEdit.saldo_inicial,
        cor_id: accountEdit.cor.id,
      });
    } else {
      methods.reset({
        nome: "",
        saldo_inicial: 0,
        cor_id: 0,
      });
    }
  }, [methods, open, accountEdit]);

  useEffect(() => {
    async function loadAccounts() {
      const response = await fetchAccounts();
      if (response) {
        setAccounts(response.data);
      }
    }
    loadAccounts();

    fetchCategories();
  }, [setAccounts, fetchCategories, accountEdit]);

  return (
    <div className="w-full p-6 flex justify-center">
      <Dialog open={open} onOpenChange={() => toggleTransactionModal()}>
        <DialogContent className="sm:max-w-[425px]">
          <FormProvider {...methods}>
            <DevTool control={methods.control} />
            <form onSubmit={methods.handleSubmit(handleSaveAccount)}>
              <DialogHeader>
                <DialogTitle>
                  {accountEdit ? "Editar conta" : "Adicionar conta"}
                </DialogTitle>
                <DialogDescription>
                  Crie uma nova conta preenchendo o formulário abaixo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <TypeRadioGroup name="despesa" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description-form">Data</Label>
                  <DatePicker name="data_transacao" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description-form">Descrição</Label>
                  <Input
                    id="description-form"
                    {...methods.register("descricao")}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="value-form">Valor</Label>
                  <NumberInput {...methods.register("valor")} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="account-form">Conta</Label>
                  <AccountSelect />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category-form">Categoria</Label>
                  <CategorySelect />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" disabled={loading} variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
                {accountEdit && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">Deletar</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Tem certeza que deseja excluir?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount}>
                          {loading ? <Spinner /> : "Deletar"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                <Button type="submit" disabled={loading}>
                  {loading ? <Spinner /> : "Salvar"}
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
