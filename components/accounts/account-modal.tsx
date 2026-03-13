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
import { DevTool } from "@hookform/devtools";
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
import ColorSelect from "../ui/colors/color-select";
import FormModal from "../modal/form-modal";

export default function AccountModal() {
  const accountEdit = useStoreState((state) => state.accounts.accountEdit);

  const methods = useForm<AccountData>({
    defaultValues: {
      nome: "",
      saldo_inicial: 0,
      cor_id: 0,
    },
  });
  const open = useStoreState((state) => state.accounts.accountModalOpen);
  const toggleAccountModal = useStoreActions(
    (actions) => actions.accounts.toggleAccountModal,
  );
  const setColors = useStoreActions((actions) => actions.colors.setColors);

  const fetchColors = useStoreActions((actions) => actions.colors.fetchColors);

  const [loading, setLoading] = useState(false);

  const handleSaveAccount = async (data: AccountData) => {
    setLoading(true);

    if (accountEdit) {
      await updateAccount(accountEdit.id, data);
    } else {
      await storeAccount(data);
    }

    fetchAccounts();
    toggleAccountModal();
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (!accountEdit) return;

    setLoading(true);
    await deleteAccount(accountEdit.id);
    fetchAccounts();
    toggleAccountModal();
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
    async function loadColors() {
      const response = await fetchColors();
      if (response) {
        setColors(response.data);
      }
    }
    loadColors();
  }, [setColors, fetchColors, accountEdit]);

  return (
    <FormModal
      open={open}
      toggleModal={toggleAccountModal}
      dialogTitle={accountEdit ? "Editar conta" : "Adicionar conta"}
      dialogDescription={
        accountEdit
          ? "Edite a conta preenchendo o formulário abaixo."
          : "Crie uma nova conta preenchendo o formulário abaixo."
      }
      methods={methods}
      onSubmit={handleSaveAccount}
      onDelete={handleDeleteAccount}
      loading={loading}
      isEditForm={!!accountEdit}
    >
      <div className="grid gap-2">
        <Label htmlFor="description-form">Nome</Label>
        <Input id="description-form" {...methods.register("nome")} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="value-form">Saldo inicial</Label>
        <NumberInput {...methods.register("saldo_inicial")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="account-form">Cor</Label>
        <ColorSelect />
      </div>
    </FormModal>
  );
}
