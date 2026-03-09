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

export default function ColorSelect() {
  const { control } = useFormContext();
  const colors = useStoreState((state) => state.colors);

  return (
    <Controller
      name="cor_id"
      control={control}
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={field.onChange}
          name="color_id"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a cor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cores</SelectLabel>
              {colors.map((color) => (
                <SelectItem key={color.id} value={String(color.id)}>
                  <div className="flex items-center gap-2">
                    <Circle color={color.hexadecimal} />
                    <span>{color.nome}</span>
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
