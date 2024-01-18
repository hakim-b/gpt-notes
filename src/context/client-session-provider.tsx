"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type ClientSessionProviderProps = {
  children: ReactNode;
};

function ClientSessionProvider({ children }: ClientSessionProviderProps) {
  return (
    <>
      <SessionProvider basePath="/api/auth">{children}</SessionProvider>
    </>
  );
}

export default ClientSessionProvider;
