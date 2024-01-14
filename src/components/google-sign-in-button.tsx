"use client";

import { ReactNode } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Icon } from "@iconify/react";

type GoogleSignInButtonProps = {
  children: ReactNode;
};

function GoogleSignInButton({ children }: GoogleSignInButtonProps) {
  return (
    <>
      <Button
        onClick={() =>
          signIn("google", { callbackUrl: "http://localhost:3000/" })
        }
        className="w-full"
      >
        <Icon icon="bi:google" /> &nbsp;&nbsp;
        {children}
      </Button>
    </>
  );
}

export default GoogleSignInButton;
