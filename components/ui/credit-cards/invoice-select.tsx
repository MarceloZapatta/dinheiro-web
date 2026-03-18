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
import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";
import { Controller, useFormContext } from "react-hook-form";
import { Badge } from "../badge";

interface InvoiceSelectProps {
  name?: string;
}

export default function InvoiceSelect({ name }: Readonly<InvoiceSelectProps>) {
  const { control } = useFormContext();
  const invoices = useStoreState((state) => state.creditCards.invoices);

  const isClosed = (closing_date: string) => {
    if (!closing_date) return false;
    const closeDate = parseISO(closing_date);
    const today = new Date();
    return closeDate < today;
  };

  return (
    <Controller
      name={name || "credit_card_invoice_id"}
      control={control}
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={field.onChange}
          name={name || "credit_card_invoice_id"}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a fatura" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Faturas</SelectLabel>
              {invoices.map((invoice) => (
                <SelectItem key={invoice.id} value={String(invoice.id)}>
                  <div className="flex items-center gap-2">
                    <span>
                      {format(parseISO(invoice.reference_date), "MM/yyyy")}
                    </span>
                    <Badge variant="secondary" className="ml-auto">
                      {isClosed(invoice.closing_date) ? "Fechada" : "Aberta"}
                    </Badge>
                    {invoice.is_paid && (
                      <Badge variant="secondary" className="ml-auto">
                        Paga
                      </Badge>
                    )}
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
