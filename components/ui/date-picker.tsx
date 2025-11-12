"use client";
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller, useFormContext } from "react-hook-form";
import { ptBR } from "date-fns/locale";

interface DatePickerProps {
  name: string;
}

export default function DatePicker(props: Readonly<DatePickerProps>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => {
        const valueAsDate = field.value
          ? new Date(field.value + "T00:00:00")
          : "";
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(valueAsDate, "PPP")
                ) : (
                  <span>Data da transação</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={valueAsDate || undefined}
                locale={ptBR}
                onSelect={(date) =>
                  field.onChange(date?.toISOString().split("T")[0])
                }
                className="border rounded-md"
              />
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
}
