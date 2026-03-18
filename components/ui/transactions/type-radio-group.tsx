import { Label } from "../label";
import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStoreState } from "@/store/hooks";

interface TypeRadioGroupProps {
  name: string;
}

export default function TypeRadioGroup(props: Readonly<TypeRadioGroupProps>) {
  const { control, watch } = useFormContext();
  const { isTransferTransaction } = useStoreState(
    (state) => state.transactions,
  );

  const transactionType = watch("transaction_type");

  const getExpenseLabel = () => {
    if (isTransferTransaction) {
      return "Saída";
    }

    return "Despesa";
  };

  const getIncomeLabel = () => {
    if (isTransferTransaction) {
      return "Entrada";
    }

    if (transactionType === "credit_card") {
      return "Estorno";
    }

    return "Receita";
  };

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => (
        <RadioGroup
          onValueChange={field.onChange}
          value={field.value}
          disabled={isTransferTransaction}
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="1" id="despesa" />
            <Label htmlFor="despesa">{getExpenseLabel()}</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="0" id="receita" />
            <Label htmlFor="receita">{getIncomeLabel()}</Label>
          </div>
        </RadioGroup>
      )}
    />
  );
}
