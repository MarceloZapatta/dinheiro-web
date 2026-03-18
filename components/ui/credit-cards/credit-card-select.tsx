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

interface CreditCardSelectProps {
  name?: string;
}

export default function CreditCardSelect({
  name,
}: Readonly<CreditCardSelectProps>) {
  const { control } = useFormContext();
  const creditCards = useStoreState((state) => state.creditCards.creditCards);

  return (
    <Controller
      name={name || "conta_id"}
      control={control}
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={field.onChange}
          name={name || "conta_id"}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o cartão de crédito" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cartões de Crédito</SelectLabel>
              {creditCards.map((creditCard) => (
                <SelectItem key={creditCard.id} value={String(creditCard.id)}>
                  <div className="flex items-center gap-2">
                    <Circle color={creditCard.cor.hexadecimal} />
                    <span>{creditCard.nome}</span>
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
