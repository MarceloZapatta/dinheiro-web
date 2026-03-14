"use client";

import AccountSelect from "@/components/ui/accounts/account-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import ImportTypeRadioGroup from "@/components/ui/transactions/import/import-type-radio-group";
import { importTransactionsFile } from "@/services/transactions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface ImportData {
  type: "ofx" | "image";
  file: FileList;
}

export default function Import() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const methods = useForm<ImportData>({
    defaultValues: {
      file: undefined,
    },
  });

  const handleImport = async (data: ImportData) => {
    setLoading(true);
    const file = data.file?.[0];
    if (file) {
      // Handle the file import logic here
      console.log("Importing file:", file.name);
    }

    const result = await importTransactionsFile(file, data.type);
    console.log(result);

    router.push(
      `/transactions/import/${result.data.movimentacao_importacao.id}`,
    );
  };

  const type = methods.watch("type");

  const acceptedFileTypes = () => {
    if (type === "ofx") {
      return ".ofx";
    } else if (type === "image") {
      return "image/*";
    }
    return "";
  };

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
            <div className="grid gap-2">
              <Label htmlFor="account-select">Conta</Label>
              <AccountSelect />
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
