"use client";

import React from 'react';
import { useStoreActions, useStoreState } from "@/store/hooks";
import { format, parse } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MonthFilter = () => {
  const transactionsStartPeriod = useStoreState(
    (state) => state.transactionsStartPeriod
  );
  const moveNextTransactionsPeriod = useStoreActions(
    (actions) => actions.moveNextTransactionsPeriod
  );
  const movePreviousTransactionsPeriod = useStoreActions(
    (actions) => actions.movePreviousTransactionsPeriod
  );

  const handleNextPeriod = () => {
    moveNextTransactionsPeriod();
  };

  const handlePreviousPeriod = () => {
    movePreviousTransactionsPeriod();
  };

  const currentPeriod = format(
    parse(transactionsStartPeriod, "yyyy-MM-dd", new Date()),
    "MMMM yyyy"
  );

  const capitalizedPeriod =
    currentPeriod.charAt(0).toUpperCase() + currentPeriod.slice(1);

  return (
    <div className="flex justify-between w-full p-4">
      <Button variant={"ghost"} onClick={handlePreviousPeriod}>
        <ChevronLeft />
      </Button>
      <span>{capitalizedPeriod}</span>
      <Button variant={"ghost"} onClick={handleNextPeriod}>
        <ChevronRight />
      </Button>
    </div>
  );
};

export default MonthFilter;
