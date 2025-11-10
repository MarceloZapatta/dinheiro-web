"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { StoreProvider } from "easy-peasy";
import store from "@/store/store";
import TransactionModal from "@/components/transactions/transaction-modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TransactionModal />
      {children}
    </>
  );
}
