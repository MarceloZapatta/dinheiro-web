import { createStore } from "easy-peasy";
import { AccountsModel, accountsStore } from "./accounts";
import { CategoriesModel, categoriesStore } from "./categories";
import { ColorsModel, colorsStore } from "./colors";
import { CreditCardsModel, creditCardsStore } from "./credit-cards";
import { ReportsModel, reportsStore } from "./reports";
import { TransactionsModel, transactionsStore } from "./transactions";

export interface StoreModel {
  transactions: TransactionsModel;
  accounts: AccountsModel;
  categories: CategoriesModel;
  colors: ColorsModel;
  creditCards: CreditCardsModel;
  reports: ReportsModel;
}

export default createStore<StoreModel>({
  transactions: transactionsStore,
  accounts: accountsStore,
  categories: categoriesStore,
  colors: colorsStore,
  creditCards: creditCardsStore,
  reports: reportsStore,
});
