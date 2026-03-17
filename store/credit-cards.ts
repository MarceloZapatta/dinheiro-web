import { fetchCreditCards, fetchInvoices } from "@/services/credit-cards";
import { CreditCard, CreditCardInvoice } from "@/types/credit-card";
import { action, Action, Thunk, thunk } from "easy-peasy";
import { StoreModel } from "./store";

export interface CreditCardsModel {
  creditCards: CreditCard[];
  creditCardEdit: CreditCard | null;
  creditCardModalOpen: boolean;
  toggleCreditCardModal: Action<CreditCardsModel, void>;
  setCreditCards: Action<CreditCardsModel, CreditCard[]>;
  setCreditCardEdit: Action<CreditCardsModel, CreditCard | null>;
  editCreditCard: Thunk<CreditCardsModel, CreditCard>;
  fetchCreditCards: Thunk<CreditCardsModel>;
  openAddNewCreditCardModal: Thunk<CreditCardsModel, void, unknown, StoreModel>;
  invoices: CreditCardInvoice[];
  setInvoices: Action<CreditCardsModel, CreditCardInvoice[]>;
  fetchInvoices: Thunk<CreditCardsModel, number>;
  currentInvoice: CreditCardInvoice | null;
  setCurrentInvoice: Action<CreditCardsModel, CreditCardInvoice | null>;
}

export const creditCardsStore: CreditCardsModel = {
  creditCards: [],
  creditCardModalOpen: false,
  toggleCreditCardModal: action((state) => {
    state.creditCardModalOpen = !state.creditCardModalOpen;
  }),
  setCreditCards: action((state, payload) => {
    state.creditCards = payload;
  }),
  creditCardEdit: null,
  setCreditCardEdit: action((state, payload) => {
    state.creditCardEdit = payload;
  }),
  editCreditCard: thunk((actions, _payload: CreditCard) => {
    actions.setCreditCardEdit(_payload);
    actions.toggleCreditCardModal();
  }),
  fetchCreditCards: thunk(async (actions) => {
    const response = await fetchCreditCards();
    if (response?.data) {
      console.log("estou setando os credit cards", response.data);
      actions.setCreditCards(response.data);
    }
  }),
  openAddNewCreditCardModal: thunk((actions) => {
    console.log("Opening add new credit card modal");
    actions.setCreditCardEdit(null);
    actions.toggleCreditCardModal();
  }),
  invoices: [],
  setInvoices: action((state, payload) => {
    state.invoices = payload;
  }),
  fetchInvoices: thunk(async (actions, creditCardId) => {
    const response = await fetchInvoices(creditCardId);
    if (response?.data) {
      actions.setInvoices(response.data);
    }
  }),
  currentInvoice: null,
  setCurrentInvoice: action((state, payload) => {
    state.currentInvoice = payload;
  }),
};
