"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Brain, LogOut, Plus } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { getInitials } from "@/lib/utils";
import { useState } from "react";
import NoteDialog from "./note-dialog";
import { ModeToggle } from "./mode-toggle";
import AIChatButton from "./ai-chat-buttton";

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
          <div className="flex items-center justify-center gap-4">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={session?.user.image as string} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  {session?.user.username || session?.user.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
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
            <AIChatButton />
          </div>
        </div>
      </div>
      <NoteDialog open={showAddNoteDialog} setOpen={setShowAddNoteDialog} />
    </>
  );
};

export default Navbar;
