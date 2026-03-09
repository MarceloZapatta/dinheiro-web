import { fetchCategories } from "@/services/categories";
import { Category } from "@/types/category";
import { action, Action, Thunk, thunk } from "easy-peasy";

interface Categories {
  expense: Category[];
  income: Category[];
}

export interface CategoriesModel {
  categories: Categories | null;
  setCategories: Action<CategoriesModel, Categories>;
  fetchCategories: Thunk<CategoriesModel>;
}

export const categoriesStore: CategoriesModel = {
  categories: null,
  setCategories: action((state, payload) => {
    state.categories = payload;
  }),
  fetchCategories: thunk(async (actions) => {
    const response = await fetchCategories();
    if (response?.data) {
      actions.setCategories(response.data);
    } else {
      actions.setCategories({ expense: [], income: [] });
    }
  }),
};
