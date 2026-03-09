import { getApi, ApiResponse } from "./api";

export interface MonthlyReportData {
  income_total: number;
  outcome_total: number;
}

export async function fetchMonthlyReport(
  startDate: string,
  endDate: string,
): Promise<MonthlyReportData> {
  const response = await getApi("reports/monthly", {
    start_date: startDate,
    end_date: endDate,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch monthly report");
  }
  const data: ApiResponse<MonthlyReportData> = await response.json();
  return data.data;
}
