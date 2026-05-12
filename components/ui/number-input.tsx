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
    if (fieldValue === undefined || fieldValue === "") return;

    // Use setTimeout to allow React Hook Form to settle, then find and format the input
    const timer = setTimeout(() => {
      const input = document.getElementById(`value-form-${props.name}`) as HTMLInputElement;
      if (!input) return;

      let value = String(fieldValue);
      // Remove any existing formatting
      value = value.replaceAll(/\D/g, "");

      if (!value) {
        input.value = "";
        return;
      }

      // Format the display value
      input.value = formatCurrencyBRL(value);
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
