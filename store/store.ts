import { Account } from "@/types/account";
import { Category } from "@/types/category";
import { action, Action, createStore } from "easy-peasy";

export interface StoreModel {
  transactionModalOpen: boolean;
  toggleTransactionModal: Action<StoreModel, void>;
  accounts: Account[];
  setAccounts: Action<StoreModel, Account[]>;
  categories: Category[];
  setCategories: Action<StoreModel, Category[]>;
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
});
