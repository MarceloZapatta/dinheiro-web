import { createStore } from "easy-peasy";
import { AccountsModel, accountsStore } from "./accounts";
import { CategoriesModel, categoriesStore } from "./categories";
import { ReportsModel, reportsStore } from "./reports";
import { TransactionsModel, transactionsStore } from "./transactions";

export interface StoreModel {
  transactions: TransactionsModel;
  accounts: AccountsModel;
  categories: CategoriesModel;
  reports: ReportsModel;
}

export default createStore<StoreModel>({
  transactions: transactionsStore,
  accounts: accountsStore,
  categories: categoriesStore,
  reports: reportsStore,
});
