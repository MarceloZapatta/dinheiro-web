import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "./input";
import { useEffect, useRef } from "react";

interface NumberInputProps {
  name: string;
  attributes?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function NumberInput(props: Readonly<NumberInputProps>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formatCurrencyBRL = (value: string) => {
    const number = Number(value) / 100;
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const maskValue = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    let { value } = input;
    value = value.replaceAll(/\D/g, "");

    if (!value) {
      event.currentTarget.value = "";
      return;
    }

    event.currentTarget.value = formatCurrencyBRL(value);
  };

  const handleSetValueAs = (value: string | number) => {
    if (typeof value === "number") {
      return value;
    }

    return value ? Number(value.replaceAll(/[^\d]/g, "")) / 100 : 0;
  };

  const methods = useFormContext();
  const fieldValue = useWatch({ control: methods.control, name: props.name });

  useEffect(() => {
    if (!inputRef.current || fieldValue === undefined) return;

    const numeric = String(fieldValue).replaceAll(/\D/g, "");
    if (!numeric) {
      inputRef.current.value = "";
      return;
    }

    inputRef.current.value = formatCurrencyBRL(numeric);
  }, [fieldValue]);

  return (
    <Input
      id="value-form"
      {...methods.register(props.name, {
        onChange: (e) => maskValue(e),
        setValueAs: handleSetValueAs,
      })}
      type="text"
      inputMode="numeric"
      placeholder="R$ 0,00"
      {...props.attributes}
    />
  );
}
