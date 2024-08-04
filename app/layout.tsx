import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryParamProvider from "@/providers/query-param-provider";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fortune's Pantry",
  description: "My Task for Headstarter Week 2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense>
        <QueryParamProvider>
          <body className={inter.className}>{children}</body>
          <Toaster/>
        </QueryParamProvider>
      </Suspense>
    </html>
  );
}
