"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStoreActions, useStoreState } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NumberInput from "@/components/ui/number-input";
import { deleteInvoice, storeInvoice } from "@/services/credit-cards";
import FormModal from "../../modal/form-modal";
import { useParams } from "next/navigation";
import { Params } from "next/dist/server/request/params";

interface CreditCardInvoicesParams extends Params {
  readonly id: string;
}

interface InvoiceFormData {
  reference_date: string;
  closing_date: string;
  due_date: string;
}

export default function CreditCardInvoiceModal() {
  const { id } = useParams<CreditCardInvoicesParams>();
  const invoiceEdit = useStoreState((state) => state.creditCards.invoiceEdit);

  const methods = useForm<InvoiceFormData>({
    defaultValues: {
      reference_date: "",
      closing_date: "",
      due_date: "",
    },
  });

  const open = useStoreState((state) => state.creditCards.invoiceModalOpen);
  const toggleInvoiceModal = useStoreActions(
    (actions) => actions.creditCards.toggleInvoiceModal,
  );
  const fetchInvoices = useStoreActions(
    (actions) => actions.creditCards.fetchInvoices,
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (invoiceEdit) {
      methods.reset({
        reference_date: invoiceEdit.reference_date,
        closing_date: invoiceEdit.closing_date,
        due_date: invoiceEdit.due_date || "",
      });
    } else {
      methods.reset({
        reference_date: "",
        closing_date: "",
        due_date: "",
      });
    }
  }, [invoiceEdit, methods, open]);

  const handleSaveInvoice = async (data: InvoiceFormData) => {
    setLoading(true);

    await storeInvoice(Number(id), data);

    toggleInvoiceModal();
    fetchInvoices(Number(id));
    setLoading(false);
  };

  const handleDeleteInvoice = async () => {
    if (!invoiceEdit) return;

    setLoading(true);
    await deleteInvoice(Number(id), invoiceEdit.id);
    toggleInvoiceModal();
    fetchInvoices(Number(id));
    setLoading(false);
  };

  return (
    <FormModal
      dialogTitle={invoiceEdit ? "Editar Fatura" : "Nova Fatura"}
      open={open}
      dialogDescription={
        invoiceEdit
          ? "Edite os detalhes da fatura."
          : "Preencha os detalhes da nova fatura."
      }
      isEditForm={!!invoiceEdit}
      toggleModal={toggleInvoiceModal}
      onSubmit={handleSaveInvoice}
      onDelete={() => handleDeleteInvoice()}
      loading={loading}
      methods={methods}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="reference_date">Data de Referência</Label>
          <Input
            id="reference_date"
            type="date"
            {...methods.register("reference_date")}
          />
        </div>
        <div>
          <Label htmlFor="closing_date">Data de Fechamento</Label>
          <Input
            id="closing_date"
            type="date"
            {...methods.register("closing_date")}
          />
        </div>
        <div>
          <Label htmlFor="due_date">Data de Vencimento</Label>
          <Input id="due_date" type="date" {...methods.register("due_date")} />
        </div>
      </div>
    </FormModal>
  );
}
