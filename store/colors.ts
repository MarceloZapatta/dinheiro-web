import { fetchColors } from "@/services/colors";
import { action, Action, Thunk, thunk } from "easy-peasy";

export interface ColorsModel {
  colors: Cor[];
  setColors: Action<ColorsModel, Cor[]>;
  fetchColors: Thunk<ColorsModel>;
}

export const colorsStore: ColorsModel = {
  colors: [],
  setColors: action((state, payload) => {
    state.colors = payload;
  }),
  fetchColors: thunk(async (actions) => {
    const response = await fetchColors();
    if (response?.data) {
      actions.setColors(response.data);
    }
  }),
};
