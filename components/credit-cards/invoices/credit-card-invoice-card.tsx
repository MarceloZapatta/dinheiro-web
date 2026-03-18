import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStoreActions, useStoreState } from "@/store/hooks";
import { CreditCardInvoice } from "@/types/credit-card";
import { format } from "date-fns/format";

interface CreditCardInvoiceCardProps {
  readonly invoice: CreditCardInvoice;
}

export function CreditCardInvoiceCard({ invoice }: CreditCardInvoiceCardProps) {
  const setCurrentInvoice = useStoreActions(
    (actions) => actions.creditCards.setCurrentInvoice,
  );

  const currentInvoice = useStoreState(
    (state) => state.creditCards.currentInvoice,
  );

  const handleClickSeeTransactions = () => {
    setCurrentInvoice(invoice);
  };

  return (
    <Card size="sm" className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {format(new Date(invoice.reference_date), "MM/yyyy")}{" "}
          {currentInvoice?.id === Number(invoice.id) && (
            <Badge variant="secondary">Visualizando</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          Total:{" "}
          {Number(invoice.total_amount).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          <Badge>{invoice.is_paid ? "Paga" : "Não Paga"}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleClickSeeTransactions()}
        >
          Ver movimentações
        </Button>
        <Button size="sm" variant="destructive">
          Deletar
        </Button>
      </CardFooter>
    </Card>
  );
}
