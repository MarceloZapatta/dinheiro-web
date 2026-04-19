import { Label } from "../label";
import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AccountType } from "@/types/account";

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
            <RadioGroupItem value={AccountType.BANK} id="bancario" />
            <Label htmlFor="bancario">Bancária</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value={AccountType.INVESTMENT} id="investimento" />
            <Label htmlFor="investimento">Investimento</Label>
          </div>
        </RadioGroup>
      )}
    />
  );
}
