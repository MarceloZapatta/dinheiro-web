import { fetchTransactions } from "@/services/transactions";
import { Account } from "@/types/account";
import { Category } from "@/types/category";
import { Transaction } from "@/types/transaction";
import { action, Action, createStore, Thunk, thunk } from "easy-peasy";

export interface StoreModel {
  transactionModalOpen: boolean;
  toggleTransactionModal: Action<StoreModel, void>;
  accounts: Account[];
  setAccounts: Action<StoreModel, Account[]>;
  categories: Category[];
  setCategories: Action<StoreModel, Category[]>;
  transactions: Transaction[];
  setTransactions: Action<StoreModel, Transaction[]>;
  fetchTransactionsThunk: Thunk<StoreModel>;
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
  fetchTransactionsThunk: thunk(async (actions) => {
    const response = await fetchTransactions();
    if (response?.data) {
      actions.setTransactions(response.data);
    }
  }),
});
