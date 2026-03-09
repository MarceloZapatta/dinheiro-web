"use client";

import { useEffect } from "react";
import { MonthFilter } from "@/components/ui/month-filter";
import { PizzaChart } from "@/components/ui/pizza-chart";
import { format, parse } from "date-fns";
import { Spinner } from "@/components/ui/spinner";
import { useStoreActions, useStoreState } from "@/store/hooks";

export default function MonthlyReport() {
  const reportData = useStoreState((state) => state.reports.monthlyReport);
  const loading = useStoreState((state) => state.reports.monthlyReportLoading);
  const error = useStoreState((state) => state.reports.monthlyReportError);
  const reportStartPeriod = useStoreState(
    (state) => state.reports.reportStartPeriod,
  );

  const fetchMonthlyReport = useStoreActions(
    (actions) => actions.reports.fetchMonthlyReport,
  );
  const moveNextReportPeriod = useStoreActions(
    (actions) => actions.reports.moveNextReportPeriod,
  );
  const movePreviousReportPeriod = useStoreActions(
    (actions) => actions.reports.movePreviousReportPeriod,
  );

  useEffect(() => {
    fetchMonthlyReport();
  }, [fetchMonthlyReport]);

  const handleNextPeriod = () => {
    moveNextReportPeriod();
  };

  const handlePreviousPeriod = () => {
    movePreviousReportPeriod();
  };

  const currentPeriodFormatted = format(
    parse(reportStartPeriod, "yyyy-MM-dd", new Date()),
    "MMMM yyyy",
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-4 bg-white dark:bg-black sm:items-start">
        <h1 className="text-2xl pb-5">Relatório Mensal</h1>
        <MonthFilter
          currentPeriod={currentPeriodFormatted}
          onNextPeriod={handleNextPeriod}
          onPreviousPeriod={handlePreviousPeriod}
        />
        {reportData && (
          <div className="w-full mt-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">
                Receita Total:{" "}
                {reportData.income_total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p className="text-lg font-semibold">
                Despesa Total:{" "}
                {reportData.outcome_total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
            <PizzaChart
              income={reportData.income_total}
              outcome={reportData.outcome_total}
            />
          </div>
        )}
      </main>
    </div>
  );
}
