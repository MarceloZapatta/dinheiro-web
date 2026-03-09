import { getApi, ApiResponse } from "./api";

export interface MonthlyReportData {
  totalIncome: number;
  totalOutcome: number;
  balance: number;
  categories: {
    name: string;
    value: number;
    color: string;
  }[];
}

export async function fetchMonthlyReport(
  month: number,
  year: number
): Promise<MonthlyReportData> {
  const response = await getApi("reports/monthly", { month, year });
  if (!response.ok) {
    throw new Error("Failed to fetch monthly report");
  }
  const data: ApiResponse<MonthlyReportData> = await response.json();
  return data.data;
}
