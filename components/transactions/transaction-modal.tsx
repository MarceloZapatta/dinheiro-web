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
import BaseModal from "@/components/modal/base-modal";
import { useStoreActions, useStoreState } from "@/store/hooks";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { FormProvider, useForm } from "react-hook-form";
import NumberInput from "@/components/ui/number-input";
import { fetchAccounts } from "@/services/accounts";
import AccountSelect from "../ui/accounts/account-select";
import CategorySelect from "../ui/categories/categories-select";
import {
  deleteTransaction,
  storeTransaction,
  TransactionData,
  updateTransaction,
} from "@/services/transactions";
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
import { parseISO } from "date-fns";
import FormModal from "@/components/modal/form-modal";

export default function TransactionModal() {
  const transactionEdit = useStoreState(
    (state) => state.transactions.transactionEdit,
  );

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
  const open = useStoreState(
    (state) => state.transactions.transactionModalOpen,
  );
  const toggleTransactionModal = useStoreActions(
    (actions) => actions.transactions.toggleTransactionModal,
  );
  const setAccounts = useStoreActions(
    (actions) => actions.accounts.setAccounts,
  );
  const fetchCategories = useStoreActions(
    (actions) => actions.categories.fetchCategories,
  );
  const fetchTransactions = useStoreActions(
    (actions) => actions.transactions.fetchTransactions,
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

  const handleDeleteTransaction = async () => {
    if (!transactionEdit) return;

    setLoading(true);
    await deleteTransaction(transactionEdit.id);
    fetchTransactions();
    toggleTransactionModal();
    setLoading(false);
  };

  useEffect(() => {
    if (transactionEdit) {
      methods.reset({
        data_transacao: parseISO(transactionEdit.data_transacao)
          .toISOString()
          .split("T")[0],
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

    fetchCategories();
  }, [setAccounts, fetchCategories, transactionEdit]);

  return (
    <FormModal
      open={open}
      toggleModal={toggleTransactionModal}
      dialogTitle={transactionEdit ? "Editar transação" : "Adicionar transação"}
      dialogDescription={
        transactionEdit
          ? "Edite a transação preenchendo o formulário abaixo."
          : "Crie uma nova transação preenchendo o formulário abaixo."
      }
      methods={methods}
      onSubmit={handleSaveTransaction}
      onDelete={handleDeleteTransaction}
      loading={loading}
      isEditForm={!!transactionEdit}
    >
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
    </FormModal>
  );
}
