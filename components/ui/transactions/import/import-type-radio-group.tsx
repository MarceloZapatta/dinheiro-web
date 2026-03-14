import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ImportTypeRadioGroupProps {
  name: string;
}

export default function ImportTypeRadioGroup(
  props: Readonly<ImportTypeRadioGroupProps>,
) {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => (
        <RadioGroup onValueChange={field.onChange} value={field.value}>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="ofx" id="ofx" />
            <Label htmlFor="ofx">OFX</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="image" id="image" />
            <Label htmlFor="image">Imagem</Label>
          </div>
        </RadioGroup>
      )}
    />
  );
}
