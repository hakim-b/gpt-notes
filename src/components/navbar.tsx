"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SignOutMenuItem from "./sign-out-menu-item";
import { Button } from "./ui/button";
import { Brain, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { getInitials } from "@/lib/utils";
import { useState } from "react";
import NoteDialog from "./note-dialog";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const { data: session } = useSession();
  const initials = getInitials(session?.user.username || session?.user.name);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  return (
    <>
      <div className="p-4 shadow dark:border">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <Link href="/notes" className="flex items-center gap-1">
            <Brain />
            <span className="font-bold">GPT-Notes</span>
          </Link>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={session?.user.image as string} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <SignOutMenuItem />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="secondary"
              onClick={() => setShowAddNoteDialog(true)}
            >
              <Plus size={20} className="mr-2" />
              Add Note
            </Button>
          </div>
        </div>
      </div>
      <NoteDialog open={showAddNoteDialog} setOpen={setShowAddNoteDialog} />
    </>
  );
};

export default Navbar;
