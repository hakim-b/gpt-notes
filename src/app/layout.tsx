import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ClientSessionProvider from "@/context/client-session-provider";

export const metadata: Metadata = {
  title: {
    default: "GPT-Notes",
    template: "%s | GPT-Notes",
  },
  description:
    "An intelligent AI app built with Next.js, Shadcn UI, Vercel Postgres and Pinecone",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
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
            {children}
            <Toaster />
          </ThemeProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
