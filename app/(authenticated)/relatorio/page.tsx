"use client";

import { useState, useEffect } from "react";
import { MonthFilter } from "@/components/ui/month-filter";
import { PizzaChart } from "@/components/ui/pizza-chart";
import { fetchMonthlyReport, MonthlyReportData } from "@/services/monthly-report";
import { format, parseISO } from "date-fns";
import { Spinner } from "@/components/ui/spinner";

export default function MonthlyReport() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reportData, setReportData] = useState<MonthlyReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = async (date: Date) => {
    setLoading(true);
    setError(null);
    try {
      const month = date.getMonth() + 1; // getMonth() is 0-indexed
      const year = date.getFullYear();
      const data = await fetchMonthlyReport(month, year);
      setReportData(data);
    } catch (err) {
      setError("Failed to load monthly report.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport(currentDate);
  }, [currentDate]);

  const handleNextPeriod = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      return newDate;
    });
  };

  const handlePreviousPeriod = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      return newDate;
    });
  };

  const currentPeriodFormatted = format(currentDate, "MMMM yyyy");

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
              <p className="text-lg font-semibold">Receita Total: {reportData.totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
              <p className="text-lg font-semibold">Despesa Total: {reportData.totalOutcome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            <p className="text-xl font-bold text-center mb-6">Saldo: {reportData.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            <PizzaChart income={reportData.totalIncome} outcome={reportData.totalOutcome} />
            <h2 className="text-xl mt-8 mb-4">Gastos por Categoria</h2>
            {reportData.categories.length === 0 ? (
              <p>Nenhuma categoria encontrada para este período.</p>
            ) : (
              <ul>
                {reportData.categories.map((category, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <span className="flex items-center">
                      <span style={{ backgroundColor: category.color }} className="inline-block w-3 h-3 rounded-full mr-2"></span>
                      {category.name}
                    </span>
                    <span>{category.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
