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
import { CircleFillIcon } from "@/components/ui/icons/akar-icons-circle-fill";
import { useStoreState } from "@/store/hooks";
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
                    <CircleFillIcon color={account.cor.hexadecimal} />
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
