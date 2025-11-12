import { fetchTransactions } from "@/services/transactions";
import { Account } from "@/types/account";
import { Category } from "@/types/category";
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
  createStore,
  FilterActionTypes,
  StateMapper,
  Thunk,
  thunk,
} from "easy-peasy";

export interface StoreModel {
  transactionModalOpen: boolean;
  toggleTransactionModal: Action<StoreModel, void>;
  accounts: Account[];
  setAccounts: Action<StoreModel, Account[]>;
  categories: Category[];
  setCategories: Action<StoreModel, Category[]>;
  transactions: Transaction[];
  setTransactions: Action<StoreModel, Transaction[]>;
  fetchTransactions: Thunk<StoreModel>;
  transactionsStartPeriod: string;
  transactionsEndPeriod: string;
  setTransactionsPeriod: Action<StoreModel, { start: string; end: string }>;
  moveNextTransactionsPeriod: Thunk<StoreModel>;
  movePreviousTransactionsPeriod: Thunk<StoreModel>;
}

export default createStore<StoreModel>({
  transactionModalOpen: false,
  toggleTransactionModal: action((state) => {
    state.transactionModalOpen = !state.transactionModalOpen;
  }),
  accounts: [],
  setAccounts: action((state, payload) => {
    state.accounts = payload;
  }),
  categories: [],
  setCategories: action((state, payload) => {
    state.categories = payload;
  }),
  transactions: [],
  setTransactions: action((state, payload) => {
    state.transactions = payload;
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
});

const moveTransactionsPeriod = (
  actions: Actions<StoreModel>,
  getState: () => StateMapper<FilterActionTypes<StoreModel>>,
  next = false
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
