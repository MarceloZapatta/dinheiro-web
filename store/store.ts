import { fetchCategories } from "@/services/categories";
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

interface Categories {
  expense: Category[];
  income: Category[];
}

export interface StoreModel {
  transactionModalOpen: boolean;
  toggleTransactionModal: Action<StoreModel, void>;
  openAddNewTransactionModal: Thunk<StoreModel, void>;
  accounts: Account[];
  setAccounts: Action<StoreModel, Account[]>;
  categories: Categories;
  setCategories: Action<StoreModel, Categories>;
  fetchCategories: Thunk<StoreModel>;
  transactions: Transaction[];
  setTransactions: Action<StoreModel, Transaction[]>;
  transactionEdit: Transaction | null;
  setTransactionEdit: Action<StoreModel, Transaction | null>;
  fetchTransactions: Thunk<StoreModel>;
  transactionsStartPeriod: string;
  transactionsEndPeriod: string;
  setTransactionsPeriod: Action<StoreModel, { start: string; end: string }>;
  editTransaction: Thunk<StoreModel, Transaction>;
  moveNextTransactionsPeriod: Thunk<StoreModel>;
  movePreviousTransactionsPeriod: Thunk<StoreModel>;
}

export default createStore<StoreModel>({
  transactionModalOpen: false,
  toggleTransactionModal: action((state) => {
    state.transactionModalOpen = !state.transactionModalOpen;
  }),
  openAddNewTransactionModal: thunk((actions) => {
    actions.setTransactionEdit(null);
    actions.toggleTransactionModal();
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
  transactionEdit: null,
  setTransactionEdit: action((state, payload) => {
    state.transactionEdit = payload;
  }),
  editTransaction: thunk((actions, _payload: Transaction) => {
    actions.setTransactionEdit(_payload);
    actions.toggleTransactionModal();
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
  fetchCategories: thunk(async (actions) => {
    const response = await fetchCategories();
    if (response?.data) {
      actions.setCategories(response.data);
    } else {
      actions.setCategories({ expense: [], income: [] });
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
