"use client";

import * as React from "react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query"; // Assuming a use-media-query hook exists or creating a simple one

export function Menu() {
  const isMobile = useMediaQuery("(max-width: 768px)"); // Adjust breakpoint as needed

  return (
    <nav
      className={`fixed w-full bg-white shadow-md z-50 ${isMobile ? "bottom-0" : "top-0"}`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-around items-center">
        <Link
          href="/transactions"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Movimentações
        </Link>
        <Link
          href="/relatorio"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Relatório
        </Link>
        <Link
          href="/accounts"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Contas
        </Link>
        <Link
          href="/credit-cards"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Cartões de crédito
        </Link>
      </div>
    </nav>
  );
}
