"use client";

import { SessionProvider } from "next-auth/react";
import { LayoutProps } from "~/types";

function ClientSessionProvider({ children }: LayoutProps) {
  return (
    <>
      <SessionProvider basePath="/api/auth">{children}</SessionProvider>
    </>
  );
}

export default ClientSessionProvider;
