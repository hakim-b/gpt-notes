import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ClientSessionProvider from "@/components/client-session-provider";
import Navbar from "@/components/navbar";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "GPT-Notes",
  description: "Built with Next.js, Shadcn UI, Vercel Postgres and Pinecone",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession();

  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ClientSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {session && <Navbar />}
            {children}
            <Toaster />
          </ThemeProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
