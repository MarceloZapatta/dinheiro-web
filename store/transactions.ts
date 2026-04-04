import { fetchTransactions } from "@/services/transactions";
import { Transaction } from "@/types/transaction";
import {
  addMonths,
  endOfMonth,
  format,
  parseISO,
  startOfMonth,
} from "date-fns";
import {
  action,
  Action,
  Actions,
  FilterActionTypes,
  StateMapper,
  Thunk,
  thunk,
} from "easy-peasy";

export interface TransactionsModel {
  transactionModalOpen: boolean;
  toggleTransactionModal: Action<TransactionsModel, boolean | void>;
  openAddNewTransactionModal: Thunk<TransactionsModel, boolean | void, void>;
  isTransferTransaction: boolean;
  setIsTransferTransaction: Action<TransactionsModel, boolean>;
  transactions: Transaction[];
  setTransactions: Action<TransactionsModel, Transaction[]>;
  transactionEdit: Transaction | null;
  setTransactionEdit: Action<TransactionsModel, Transaction | null>;
  fetchTransactions: Thunk<TransactionsModel>;
  transactionsStartPeriod: string;
  transactionsEndPeriod: string;
  setTransactionsPeriod: Action<
    TransactionsModel,
    { start: string; end: string }
  >;
  editTransaction: Thunk<TransactionsModel, Transaction>;
  moveNextTransactionsPeriod: Thunk<TransactionsModel>;
  movePreviousTransactionsPeriod: Thunk<TransactionsModel>;
}

const moveTransactionsPeriod = (
  actions: Actions<TransactionsModel>,
  getState: () => StateMapper<FilterActionTypes<TransactionsModel>>,
  next = false,
) => {
  const state = getState();
  const start = parseISO(state.transactionsStartPeriod);
  const end = parseISO(state.transactionsEndPeriod);
  const prevStart = startOfMonth(addMonths(start, next ? 1 : -1));
  const prevEnd = endOfMonth(addMonths(end, next ? 1 : -1));
  actions.setTransactionsPeriod({
    start: format(prevStart, "yyyy-MM-dd"),
    end: format(prevEnd, "yyyy-MM-dd"),
  });
  actions.fetchTransactions();
};

export const transactionsStore: TransactionsModel = {
  transactionModalOpen: false,
  toggleTransactionModal: action((state, isTransfer = false) => {
    state.transactionModalOpen = !state.transactionModalOpen;
    state.isTransferTransaction = !!isTransfer;
  }),
  openAddNewTransactionModal: thunk((actions, isTransfer = false) => {
    actions.setTransactionEdit(null);
    actions.toggleTransactionModal(isTransfer);
    actions.setIsTransferTransaction(!!isTransfer);
  }),
  isTransferTransaction: false,
  setIsTransferTransaction: action((state, payload) => {
    state.isTransferTransaction = payload;
  }),
  transactions: [],
  setTransactions: action((state, payload) => {
    state.transactions = payload;
  }),
  transactionEdit: null,
  setTransactionEdit: action((state, payload) => {
    state.transactionEdit = payload;
  }),
  editTransaction: thunk((actions, _payload: Transaction) => {
    actions.setTransactionEdit(_payload);
    actions.toggleTransactionModal(false);
  }),
  fetchTransactions: thunk(async (actions, _payload, { getState }) => {
    const state = getState();
    const startPeriod = state.transactionsStartPeriod;
    const endPeriod = state.transactionsEndPeriod;
    const response = await fetchTransactions(startPeriod, endPeriod);
    if (response?.data) {
      actions.setTransactions(response.data);
    }
  }),
  transactionsStartPeriod: format(startOfMonth(new Date()), "yyyy-MM-dd"),
  transactionsEndPeriod: format(endOfMonth(new Date()), "yyyy-MM-dd"),
  setTransactionsPeriod: action((state, payload) => {
    state.transactionsStartPeriod = payload.start;
    state.transactionsEndPeriod = payload.end;
  }),
  moveNextTransactionsPeriod: thunk((actions, _payload, { getState }) => {
    moveTransactionsPeriod(actions, getState, true);
  }),
  movePreviousTransactionsPeriod: thunk((actions, _payload, { getState }) => {
    moveTransactionsPeriod(actions, getState, false);
  }),
};
