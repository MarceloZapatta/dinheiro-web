"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStoreActions, useStoreState } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NumberInput from "@/components/ui/number-input";
import { fetchAccounts } from "@/services/accounts";
import AccountSelect from "../ui/accounts/account-select";
import CategorySelect from "../ui/categories/categories-select";
import {
  deleteTransaction,
  storeTransaction,
  TransactionData,
  updateTransaction,
} from "@/services/transactions";
import DatePicker from "../ui/date-picker";
import TypeRadioGroup from "../ui/transactions/type-radio-group";
import { parseISO } from "date-fns";
import FormModal from "@/components/modal/form-modal";
import AccountTypeRadioGroup from "../ui/transactions/account-type-radio-group";
import { TransactionType } from "@/types/transaction";
import CreditCardSelect from "../ui/credit-cards/credit-card-select";
import InvoiceSelect from "../ui/credit-cards/invoice-select";

export default function TransactionModal() {
  const transactionEdit = useStoreState(
    (state) => state.transactions.transactionEdit,
  );

  const methods = useForm<TransactionData>({
    defaultValues: {
      data_transacao: new Date().toISOString().split("T")[0],
      descricao: "",
      valor: 0,
      conta_id: "",
      conta_relacao_id: "",
      categoria_id: "",
      despesa: "1",
      credit_card_invoice_id: "",
      transaction_type: TransactionType.BANK,
    },
  });

  const { transactionModalOpen: open, isTransferTransaction } = useStoreState(
    (state) => state.transactions,
  );

  const { toggleTransactionModal, fetchTransactions } = useStoreActions(
    (actions) => actions.transactions,
  );

  const fetchAccounts = useStoreActions(
    (actions) => actions.accounts.fetchAccounts,
  );
  const fetchCategories = useStoreActions(
    (actions) => actions.categories.fetchCategories,
  );
  const { fetchCreditCards, fetchInvoices } = useStoreActions(
    (actions) => actions.creditCards,
  );

  const [loading, setLoading] = useState(false);

  const handleSaveTransaction = async (data: TransactionData) => {
    setLoading(true);

    if (transactionEdit) {
      await updateTransaction(transactionEdit.id, data);
    } else {
      await storeTransaction(data);
    }

    fetchTransactions();
    toggleTransactionModal();
    setLoading(false);
  };

  const handleDeleteTransaction = async () => {
    if (!transactionEdit) return;

    setLoading(true);
    await deleteTransaction(transactionEdit.id);
    fetchTransactions();
    toggleTransactionModal();
    setLoading(false);
  };

  useEffect(() => {
    if (transactionEdit) {
      methods.reset({
        transaction_type: transactionEdit.credit_card_invoice?.id
          ? TransactionType.CREDIT_CARD
          : TransactionType.BANK,
        data_transacao: parseISO(transactionEdit.data_transacao)
          .toISOString()
          .split("T")[0],
        descricao: transactionEdit.descricao,
        valor: transactionEdit.valor,
        conta_id: String(transactionEdit.conta.id),
        conta_relacao_id: transactionEdit.movimentacao_relacao
          ? String(transactionEdit.movimentacao_relacao.conta.id)
          : "",
        categoria_id: String(transactionEdit.categoria.id),
        credit_card_invoice_id: transactionEdit.credit_card_invoice?.id
          ? String(transactionEdit.credit_card_invoice.id)
          : "",
        despesa: transactionEdit.valor < 1 ? "1" : "0",
      });
    } else {
      methods.reset({
        data_transacao: new Date().toISOString().split("T")[0],
        descricao: "",
        valor: 0,
        conta_id: "",
        conta_relacao_id: "",
        categoria_id: "",
        despesa: "1",
        transaction_type: TransactionType.BANK,
        credit_card_invoice_id: "",
      });
    }
  }, [methods, open, transactionEdit]);

  const isCreditCardTransaction =
    methods.watch("transaction_type") === TransactionType.CREDIT_CARD;

  const accountId = methods.watch("conta_id");

  useEffect(() => {
    fetchAccounts();
    fetchCategories();
    if (isCreditCardTransaction) {
      fetchCreditCards();
    }
  }, [
    fetchAccounts,
    fetchCategories,
    fetchCreditCards,
    isCreditCardTransaction,
    transactionEdit,
  ]);

  useEffect(() => {
    if (isCreditCardTransaction) {
      fetchInvoices(Number(accountId));
    }
  }, [accountId, fetchInvoices, isCreditCardTransaction]);

  function dialogTitle(): string {
    const actionString = transactionEdit ? "Editar" : "Adicionar";

    return isTransferTransaction
      ? `${actionString} transferência`
      : `${actionString} transação`;
  }

  function dialogDescription(): string {
    const actionString = transactionEdit ? "Edite" : "Adicione";
    const transactionTypeString = isTransferTransaction
      ? "transferência"
      : "transação";

    return `${actionString} a ${transactionTypeString} preenchendo o formulário abaixo.`;
  }

  return (
    <FormModal
      open={open}
      toggleModal={toggleTransactionModal}
      dialogTitle={dialogTitle()}
      dialogDescription={dialogDescription()}
      methods={methods}
      onSubmit={handleSaveTransaction}
      onDelete={handleDeleteTransaction}
      loading={loading}
      isEditForm={!!transactionEdit}
    >
      <div className="grid gap-2">
        <Label htmlFor="transaction_type">Tipo de transação</Label>
        <AccountTypeRadioGroup name="transaction_type" />
      </div>
      {!isCreditCardTransaction && (
        <div className="grid gap-2">
          <Label htmlFor="account-form">Conta</Label>
          <AccountSelect />
        </div>
      )}
      {isCreditCardTransaction && (
        <>
          <div className="grid gap-2">
            <Label htmlFor="account-form">Cartão de Crédito</Label>
            <CreditCardSelect />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="account-form">Fatura</Label>
            <InvoiceSelect />
          </div>
        </>
      )}
      <div className="grid gap-2">
        <Label htmlFor="despesa">Tipo</Label>
        <TypeRadioGroup name="despesa" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description-form">Data</Label>
        <DatePicker name="data_transacao" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description-form">Descrição</Label>
        <Input
          id="description-form"
          {...methods.register("descricao")}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="value-form">Valor</Label>
        <NumberInput {...methods.register("valor")} />
      </div>
      {isTransferTransaction && (
        <div className="grid gap-2">
          <Label htmlFor="account-form">Conta de destino</Label>
          <AccountSelect name="conta_relacao_id" />
        </div>
      )}
      {!isTransferTransaction && (
        <div className="grid gap-2">
          <Label htmlFor="category-form">Categoria</Label>
          <CategorySelect />
        </div>
      )}
    </FormModal>
  );
}
