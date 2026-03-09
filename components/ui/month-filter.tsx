"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, parse } from "date-fns";
import * as React from "react";

interface MonthFilterProps {
  currentPeriod: string;
  onNextPeriod: () => void;
  onPreviousPeriod: () => void;
}

export function MonthFilter({
  currentPeriod,
  onNextPeriod,
  onPreviousPeriod,
}: MonthFilterProps) {
  const capitalizedPeriod =
    currentPeriod.charAt(0).toUpperCase() + currentPeriod.slice(1);

  return (
    <div className="flex justify-between w-full p-4">
      <Button variant={"ghost"} onClick={onPreviousPeriod}>
        <ChevronLeft />
      </Button>
      <span>{capitalizedPeriod}</span>
      <Button variant={"ghost"} onClick={onNextPeriod}>
        <ChevronRight />
      </Button>
    </div>
  );
}