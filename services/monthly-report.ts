import { ApiResponse, getApi } from "@/services/api";

export interface MonthlyReportSummary {
  income: number;
  outcome: number;
  balance: number;
}

export async function fetchMonthlyReportSummary(
  startPeriod: string,
  endPeriod: string
): Promise<ApiResponse<MonthlyReportSummary>> {
  const res = await getApi("monthly-report/summary", {
    date_start: startPeriod,
    date_end: endPeriod,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch monthly report summary");
  }

  return await res.json();
}
