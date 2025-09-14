import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GlobalContextProvider } from "./context/GLobalContext";

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
        <GlobalContextProvider>{children}</GlobalContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
