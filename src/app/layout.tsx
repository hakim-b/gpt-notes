import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "~/context/theme-provider";
import { Toaster } from "~/components/ui/toaster";
import ClientSessionProvider from "~/context/client-session-provider";
import ogImg from "./opengraph-image.png";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "~/lib/utils";
import { LayoutProps } from "~/types";

export const metadata: Metadata = {
  metadataBase: new URL("https://gpt-notes-ten.vercel.app/"),
  title: {
    default: "GPT-Notes",
    template: "%s | GPT-Notes",
  },
  openGraph: {
    title: "GPT-Notes",
    description:
      "An intelligent AI app designed to enhance your productivity and organization.",
    images: [{ url: ogImg.src }],
  },
  keywords: ["Notes", "notetaking", "AI notetaker", "AI notes"],
};

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
        )}
      >
        <ClientSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Analytics />
            <SpeedInsights />
            <Toaster />
          </ThemeProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
