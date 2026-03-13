"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStoreState } from "@/store/hooks";
import { Circle } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

interface AccountSelectProps {
  name?: string;
}

export default function AccountSelect({ name }: Readonly<AccountSelectProps>) {
  const { control } = useFormContext();
  const { getValues } = useFormContext();
  const { watch } = useFormContext();
  const accounts = useStoreState((state) => state.accounts.accounts);

  const mapAccounts = () => {
    if (name === "conta_relacao_id") {
      return accounts.filter(
        (account) => account.id !== Number(getValues("conta_id")),
      );
    }
    return accounts;
  };

  const contaId = watch("conta_id");

  const isDisabled = name === "conta_relacao_id" && contaId === "";

  return (
    <Controller
      name={name || "conta_id"}
      control={control}
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={field.onChange}
          name={name || "conta_id"}
          disabled={isDisabled}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a conta" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Contas</SelectLabel>
              {mapAccounts().map((account) => (
                <SelectItem key={account.id} value={String(account.id)}>
                  <div className="flex items-center gap-2">
                    <Circle color={account.cor.hexadecimal} />
                    <span>{account.nome}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}
