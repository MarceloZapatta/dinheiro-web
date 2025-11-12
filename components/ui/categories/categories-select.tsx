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

export default function CategorySelect() {
  const { control } = useFormContext();
  const categories = useStoreState((state) => state.categories);

  return (
    <Controller
      name="categoria_id"
      control={control}
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={field.onChange}
          name="category"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category.id} value={String(category.id)}>
                  <div className="flex items-center gap-2">
                    <Circle color={category.cor.hexadecimal} />
                    <span>{category.nome}</span>
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
