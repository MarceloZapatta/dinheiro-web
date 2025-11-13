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
import { fetchAccounts } from "@/services/accounts";
import { fetchCategories } from "@/services/categories";
import AccountSelect from "../ui/accounts/account-select";
import CategorySelect from "../ui/categories/categories-select";
import {
  storeTransaction,
  TransactionData,
  updateTransaction,
} from "@/services/transactions";
import DatePicker from "../ui/date-picker";
import { DevTool } from "@hookform/devtools";
import TypeRadioGroup from "../ui/transactions/type-radio-group";

export default function TransactionModal() {
  const transactionEdit = useStoreState((state) => state.transactionEdit);

  const methods = useForm<TransactionData>({
    defaultValues: {
      data_transacao: new Date().toISOString().split("T")[0],
      descricao: "",
      valor: 0,
      conta_id: "",
      categoria_id: "",
      despesa: "1",
    },
  });
  const open = useStoreState((state) => state.transactionModalOpen);
  const toggleTransactionModal = useStoreActions(
    (actions) => actions.toggleTransactionModal
  );
  const setAccounts = useStoreActions((actions) => actions.setAccounts);
  const setCategories = useStoreActions((actions) => actions.setCategories);
  const fetchTransactions = useStoreActions(
    (actions) => actions.fetchTransactions
  );

  const [loading, setLoading] = useState(false);

  const handleSaveTransaction = async (data: TransactionData) => {
    setLoading(true);

    if (transactionEdit) {
      await updateTransaction(transactionEdit.id, data);
    } else {
      await storeTransaction(data);
    }

    fetchTransactions();
    toggleTransactionModal();
    setLoading(false);
  };

  useEffect(() => {
    if (transactionEdit) {
      methods.reset({
        data_transacao: transactionEdit.data_transacao,
        descricao: transactionEdit.descricao,
        valor: transactionEdit.valor,
        conta_id: String(transactionEdit.conta.id),
        categoria_id: String(transactionEdit.categoria.id),
        despesa: transactionEdit.valor < 1 ? "1" : "0",
      });
    } else {
      methods.reset({
        data_transacao: new Date().toISOString().split("T")[0],
        descricao: "",
        valor: 0,
        conta_id: "",
        categoria_id: "",
        despesa: "1",
      });
    }
  }, [methods, open, transactionEdit]);

  useEffect(() => {
    async function loadAccounts() {
      const response = await fetchAccounts();
      if (response) {
        setAccounts(response.data);
      }
    }
    loadAccounts();

    async function loadCategories() {
      const response = await fetchCategories();
      if (response) {
        setCategories(response.data);
      }
    }
    loadCategories();
  }, [setAccounts, setCategories]);

  return (
    <div className="w-full p-6 flex justify-center">
      <Dialog open={open} onOpenChange={() => toggleTransactionModal()}>
        <DialogContent className="sm:max-w-[425px]">
          <FormProvider {...methods}>
            <DevTool control={methods.control} />
            <form onSubmit={methods.handleSubmit(handleSaveTransaction)}>
              <DialogHeader>
                <DialogTitle>
                  {transactionEdit ? "Editar transação" : "Adicionar transação"}
                </DialogTitle>
                <DialogDescription>
                  Crie uma nova transação preenchendo o formulário abaixo.
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
