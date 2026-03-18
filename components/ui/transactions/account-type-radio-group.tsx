import { Label } from "../label";
import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TransactionType } from "@/types/transaction";

interface AccountTypeRadioGroupProps {
  name: string;
}

export default function AccountTypeRadioGroup(
  props: Readonly<AccountTypeRadioGroupProps>,
) {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => (
        <RadioGroup onValueChange={field.onChange} value={field.value}>
          <div className="flex items-center gap-3">
            <RadioGroupItem value={TransactionType.BANK} id="bancario" />
            <Label htmlFor="bancario">Bancária</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem
              value={TransactionType.CREDIT_CARD}
              id="cartao-de-credito"
            />
            <Label htmlFor="cartao-de-credito">Cartão de crédito</Label>
          </div>
        </RadioGroup>
      )}
    />
  );
}
