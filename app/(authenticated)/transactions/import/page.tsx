"use client";

import AccountSelect from "@/components/ui/accounts/account-select";
import { Button } from "@/components/ui/button";
import CreditCardSelect from "@/components/ui/credit-cards/credit-card-select";
import InvoiceSelect from "@/components/ui/credit-cards/invoice-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import AccountTypeRadioGroup from "@/components/ui/transactions/account-type-radio-group";
import ImportTypeRadioGroup from "@/components/ui/transactions/import/import-type-radio-group";
import { importTransactionsFile } from "@/services/transactions";
import { useStoreActions } from "@/store/hooks";
import { AccountType } from "@/types/account";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

interface ImportData {
  type: "ofx" | "image";
  file: FileList;
  account_type: AccountType;
  conta_id: string;
  credit_card_invoice_id?: string;
}

export default function Import() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchAccounts = useStoreActions(
    (actions) => actions.accounts.fetchAccounts,
  );
  const { fetchCreditCards, fetchInvoices } = useStoreActions(
    (actions) => actions.creditCards,
  );

  const methods = useForm<ImportData>({
    defaultValues: {
      file: undefined,
      type: "ofx",
      account_type: AccountType.BANK,
      conta_id: "",
      credit_card_invoice_id: undefined,
    },
  });

  const handleImport = async (data: ImportData) => {
    setLoading(true);
    const file = data.file?.[0];
    if (file) {
      // Handle the file import logic here
      console.log("Importing file:", file.name);
    }

    const result = await importTransactionsFile(
      file,
      data.type,
      data.account_type,
      data.conta_id,
      data.credit_card_invoice_id,
    );
    console.log(result);

    router.push(
      `/transactions/import/${result.data.movimentacao_importacao.id}`,
    );
  };

  const type = useWatch({ name: "type", control: methods.control });
  const accountType = useWatch({
    name: "account_type",
    control: methods.control,
  });
  const isCreditCardImport = accountType === AccountType.CREDIT_CARD;

  const acceptedFileTypes = () => {
    if (type === "ofx") {
      return ".ofx";
    } else if (type === "image") {
      return "image/*";
    }
    return "";
  };

  useEffect(() => {
    // Reset file input when type changes
    fetchAccounts();
    fetchCreditCards();
  }, [isCreditCardImport, fetchAccounts, fetchCreditCards]);

  const contaId = useWatch({ name: "conta_id", control: methods.control });

  useEffect(() => {
    fetchInvoices(Number(contaId));
  }, [contaId, fetchInvoices]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-4 bg-white dark:bg-black sm:items-start">
        <h1 className="text-2xl pb-5">Importar</h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleImport)}
            className="flex flex-col gap-2"
          >
            <div className="grid gap-2">
              <Label htmlFor="account_type">Tipo de importação</Label>
              <AccountTypeRadioGroup name="account_type" />
            </div>
            {!isCreditCardImport && (
              <div className="grid gap-2 py-2">
                <Label htmlFor="account-select">Conta</Label>
                <AccountSelect />
              </div>
            )}
            {isCreditCardImport && (
              <>
                <div className="grid gap-2 py-2">
                  <Label htmlFor="credit-card-select">Cartão de Crédito</Label>
                  <CreditCardSelect />
                </div>
                <div className="grid gap-2 py-2">
                  <Label htmlFor="invoice-select">Fatura</Label>
                  <InvoiceSelect />
                </div>
              </>
            )}
            <div className="grid gap-2 py-2">
              <Label htmlFor="type">Tipo de importação</Label>
              <ImportTypeRadioGroup name="type" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file-form">Arquivo</Label>
              <Input
                type="file"
                accept={acceptedFileTypes()}
                {...methods.register("file")}
              />
            </div>
            <div className="flex gap-2">
              <Button type="button" disabled={loading} variant="outline">
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? <Spinner /> : "Importar"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </main>
    </div>
  );
}
