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

export default function AccountSelect() {
  const { control } = useFormContext();
  const accounts = useStoreState((state) => state.accounts);

  return (
    <Controller
      name="conta_id"
      control={control}
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={field.onChange}
          name="account"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a conta" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Contas</SelectLabel>
              {accounts.map((account) => (
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
