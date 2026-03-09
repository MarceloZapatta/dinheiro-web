import {
  fetchMonthlyReport,
  MonthlyReportData,
} from "@/services/monthly-report";
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

export interface ReportsModel {
  monthlyReport: MonthlyReportData | null;
  monthlyReportLoading: boolean;
  monthlyReportError: string | null;
  setMonthlyReport: Action<ReportsModel, MonthlyReportData | null>;
  setMonthlyReportLoading: Action<ReportsModel, boolean>;
  setMonthlyReportError: Action<ReportsModel, string | null>;
  reportStartPeriod: string;
  reportEndPeriod: string;
  setReportPeriod: Action<ReportsModel, { start: string; end: string }>;
  fetchMonthlyReport: Thunk<ReportsModel>;
  moveNextReportPeriod: Thunk<ReportsModel>;
  movePreviousReportPeriod: Thunk<ReportsModel>;
}

const moveReportPeriod = (
  actions: Actions<ReportsModel>,
  getState: () => StateMapper<FilterActionTypes<ReportsModel>>,
  next = false,
) => {
  const state = getState();
  const start = parseISO(state.reportStartPeriod);
  const end = parseISO(state.reportEndPeriod);
  const newStart = startOfMonth(addMonths(start, next ? 1 : -1));
  const newEnd = endOfMonth(addMonths(end, next ? 1 : -1));
  actions.setReportPeriod({
    start: format(newStart, "yyyy-MM-dd"),
    end: format(newEnd, "yyyy-MM-dd"),
  });
  actions.fetchMonthlyReport();
};

export const reportsStore: ReportsModel = {
  monthlyReport: null,
  monthlyReportLoading: false,
  monthlyReportError: null,
  setMonthlyReport: action((state, payload) => {
    state.monthlyReport = payload;
  }),
  setMonthlyReportLoading: action((state, payload) => {
    state.monthlyReportLoading = payload;
  }),
  setMonthlyReportError: action((state, payload) => {
    state.monthlyReportError = payload;
  }),
  reportStartPeriod: format(startOfMonth(new Date()), "yyyy-MM-dd"),
  reportEndPeriod: format(endOfMonth(new Date()), "yyyy-MM-dd"),
  setReportPeriod: action((state, payload) => {
    state.reportStartPeriod = payload.start;
    state.reportEndPeriod = payload.end;
  }),
  fetchMonthlyReport: thunk(async (actions, _payload, { getState }) => {
    const state = getState();
    actions.setMonthlyReportLoading(true);
    actions.setMonthlyReportError(null);
    try {
      const data = await fetchMonthlyReport(
        state.reportStartPeriod,
        state.reportEndPeriod,
      );
      console.log(data, "setando a data");
      actions.setMonthlyReport(data);
    } catch {
      actions.setMonthlyReportError("Failed to load monthly report.");
      actions.setMonthlyReport(null);
    } finally {
      actions.setMonthlyReportLoading(false);
    }
  }),
  moveNextReportPeriod: thunk((actions, _payload, { getState }) => {
    moveReportPeriod(actions, getState, true);
  }),
  movePreviousReportPeriod: thunk((actions, _payload, { getState }) => {
    moveReportPeriod(actions, getState, false);
  }),
};
