"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStoreActions, useStoreState } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NumberInput from "@/components/ui/number-input";
import {
  CreditCardData,
  deleteCreditCard,
  storeCreditCard,
  updateCreditCard,
} from "@/services/credit-cards";
import ColorSelect from "../ui/colors/color-select";
import FormModal from "../modal/form-modal";

export default function CreditCardModal() {
  const creditCardEdit = useStoreState(
    (state) => state.creditCards.creditCardEdit,
  );

  const methods = useForm<CreditCardData>({
    defaultValues: {
      nome: "",
      credit_limit: 0,
      closing_day: 1,
      due_day: 1,
      cor_id: 0,
    },
  });
  const open = useStoreState((state) => state.creditCards.creditCardModalOpen);
  const toggleCreditCardModal = useStoreActions(
    (actions) => actions.creditCards.toggleCreditCardModal,
  );
  const setColors = useStoreActions((actions) => actions.colors.setColors);
  const fetchColors = useStoreActions((actions) => actions.colors.fetchColors);

  const fetchCreditCards = useStoreActions(
    (actions) => actions.creditCards.fetchCreditCards,
  );

  const [loading, setLoading] = useState(false);

  const handleSaveCreditCard = async (data: CreditCardData) => {
    setLoading(true);

    if (creditCardEdit) {
      await updateCreditCard(creditCardEdit.id, data);
    } else {
      await storeCreditCard(data);
    }

    toggleCreditCardModal();
    fetchCreditCards();
    setLoading(false);
  };

  const handleDeleteCreditCard = async () => {
    if (!creditCardEdit) return;

    setLoading(true);
    await deleteCreditCard(creditCardEdit.id);
    toggleCreditCardModal();
    fetchCreditCards();
    setLoading(false);
  };

  useEffect(() => {
    if (creditCardEdit) {
      methods.reset({
        nome: creditCardEdit.nome,
        credit_limit: creditCardEdit.credit_limit,
        closing_day: creditCardEdit.closing_day,
        due_day: creditCardEdit.due_day,
        cor_id: creditCardEdit.cor.id,
      });
    } else {
      methods.reset({
        nome: "",
        credit_limit: 0,
        closing_day: 1,
        due_day: 1,
        cor_id: 0,
      });
    }
  }, [methods, open, creditCardEdit]);

  useEffect(() => {
    async function loadColors() {
      const response = await fetchColors();
      if (response) {
        setColors(response.data);
      }
    }
    loadColors();
  }, [setColors, fetchColors, creditCardEdit]);

  return (
    <FormModal
      open={open}
      toggleModal={toggleCreditCardModal}
      dialogTitle={
        creditCardEdit
          ? "Editar cartão de crédito"
          : "Adicionar cartão de crédito"
      }
      dialogDescription={
        creditCardEdit
          ? "Edite o cartão de crédito preenchendo o formulário abaixo."
          : "Crie um novo cartão de crédito preenchendo o formulário abaixo."
      }
      methods={methods}
      onSubmit={handleSaveCreditCard}
      onDelete={handleDeleteCreditCard}
      loading={loading}
      isEditForm={!!creditCardEdit}
    >
      <div className="grid gap-2">
        <Label htmlFor="nome-form">Nome</Label>
        <Input id="nome-form" {...methods.register("nome")} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="limite-form">Limite</Label>
        <NumberInput {...methods.register("credit_limit")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="dia-fechamento-form">Dia do fechamento</Label>
        <Input
          id="dia-fechamento-form"
          type="number"
          min={1}
          max={31}
          {...methods.register("closing_day", { valueAsNumber: true })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="dia-vencimento-form">Dia do vencimento</Label>
        <Input
          id="dia-vencimento-form"
          type="number"
          min={1}
          max={31}
          {...methods.register("due_day", { valueAsNumber: true })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cor-form">Cor</Label>
        <ColorSelect />
      </div>
    </FormModal>
  );
}
