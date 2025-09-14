import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GlobalContextProvider } from "./context/GLobalContext";
import { Suspense } from "react";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Holy Beads",
  description: "Holy Beads, Lalitpur, Nepal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Suspense>
        <GlobalContextProvider>{children}</GlobalContextProvider>
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
