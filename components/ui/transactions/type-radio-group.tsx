import { Label } from "../label";
import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../radio-group";

interface TypeRadioGroupProps {
  name: string;
}

export default function TypeRadioGroup(props: Readonly<TypeRadioGroupProps>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => (
        <RadioGroup onValueChange={field.onChange} value={field.value}>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="1" id="despesa" />
            <Label htmlFor="despesa">Despesa</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="0" id="receita" />
            <Label htmlFor="receita">Receita</Label>
          </div>
        </RadioGroup>
      )}
    />
  );
}
