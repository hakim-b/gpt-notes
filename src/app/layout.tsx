import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "~/context/theme-provider";
import { Toaster } from "~/components/ui/toaster";
import ClientSessionProvider from "~/context/client-session-provider";
import ogImg from "./opengraph-image.png";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
            <Analytics />
            <SpeedInsights/>
            <Toaster />
          </ThemeProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
