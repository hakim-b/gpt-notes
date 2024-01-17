"use client";

import { ReactNode } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import GoogleLogo from "@/assets/google.svg";

type GoogleSignInButtonProps = {
  children: ReactNode;
};

function GoogleSignInButton({ children }: GoogleSignInButtonProps) {
  return (
    <>
      <Button
        onClick={() =>
          signIn("google", { callbackUrl: "http://localhost:3000/notes/" })
        }
        className="w-full"
      >
        <GoogleLogo /> &nbsp;&nbsp;
        {children}
      </Button>
    </>
  );
}

export default GoogleSignInButton;
