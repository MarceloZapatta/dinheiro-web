import { fetchAccounts } from "@/services/accounts";
import { Account } from "@/types/account";
import { action, Action, Thunk, thunk } from "easy-peasy";
import { StoreModel } from "./store";

export interface AccountsModel {
  accounts: Account[];
  accountEdit: Account | null;
  accountModalOpen: boolean;
  toggleAccountModal: Action<AccountsModel, void>;
  setAccounts: Action<AccountsModel, Account[]>;
  setAccountEdit: Action<AccountsModel, Account | null>;
  editAccount: Thunk<AccountsModel, Account>;
  fetchAccounts: Thunk<AccountsModel>;
  openAddNewAccountModal: Thunk<AccountsModel, void, unknown, StoreModel>;
}

export const accountsStore: AccountsModel = {
  accounts: [],
  accountModalOpen: false,
  toggleAccountModal: action((state) => {
    state.accountModalOpen = !state.accountModalOpen;
  }),
  setAccounts: action((state, payload) => {
    state.accounts = payload;
  }),
  accountEdit: null,
  setAccountEdit: action((state, payload) => {
    state.accountEdit = payload;
  }),
  editAccount: thunk((actions, _payload: Account) => {
    actions.setAccountEdit(_payload);
    actions.toggleAccountModal();
  }),
  fetchAccounts: thunk(async (actions) => {
    const response = await fetchAccounts();
    if (response?.data) {
      actions.setAccounts(response.data);
    }
  }),
  openAddNewAccountModal: thunk((actions) => {
    console.log("Opening add new account modal");
    actions.setAccountEdit(null);
    actions.toggleAccountModal();
  }),
};
