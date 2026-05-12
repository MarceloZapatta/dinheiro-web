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
    // Treat input as cents (integer cents)
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

    // Remove all non-digits to get cents (e.g., "R$ 1.000,50" → "100050")
    const cents = Number(value.replaceAll(/\D/g, ""));
    // Convert cents back to decimal (e.g., "100050" → 1000.50)
    return cents ? cents / 100 : 0;
  };

  const methods = useFormContext();
  const fieldValue = useWatch({ control: methods.control, name: props.name });

  useEffect(() => {
    if (fieldValue === undefined || fieldValue === "") return;

    // Use setTimeout to allow React Hook Form to settle, then find and format the input
    const timer = setTimeout(() => {
      const input = document.getElementById(
        `value-form-${props.name}`,
      ) as HTMLInputElement;
      if (!input) return;

      // Convert decimal number to cents (e.g., 1000.5 → "100050")
      const cents = Math.round(Number(fieldValue) * 100);
      
      if (cents === 0) {
        input.value = "";
        return;
      }

      // Format the display value
      input.value = formatCurrencyBRL(String(cents));
    }, 0);

    return () => clearTimeout(timer);
  }, [fieldValue, props.name]);

  return (
    <Input
      id={`value-form-${props.name}`}
      {...methods.register(props.name, {
        onChange: (e) => maskValue(e),
        setValueAs: handleSetValueAs,
      })}
      type="text"
      inputMode="numeric"
      placeholder="R$ 0,00"
      {...props.attributes}
      ref={inputRef}
    />
  );
}
