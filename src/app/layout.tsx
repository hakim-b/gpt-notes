import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "GPT-Notes",
  description: "Built with Next.js, Shadcn UI, Vercel Postgres and Pinecone",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
