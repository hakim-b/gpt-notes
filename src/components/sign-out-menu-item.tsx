"use client";

import { signOut } from "next-auth/react";
import { DropdownMenuItem, DropdownMenuShortcut } from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";

function SignOutMenuItem() {
  return (
    <>
      <DropdownMenuItem
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/sign-in`,
          })
        }
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </>
  );
}

export default SignOutMenuItem;
