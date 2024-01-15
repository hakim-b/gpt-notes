import Link from "next/link";
import { metadata } from "@/app/layout";
import Image from "next/image";
import logo from "@/app/favicon.ico";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getInitials } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SignOutMenuItem from "./sign-out-menu-item";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const initials = getInitials(session?.user.username || session?.user.name);

  return (
    <div className="p-4 shadow">
      <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <Link href="/notes" className="flex items-center gap-1">
          <Image src={logo} alt="Flowbrain logo" width={40} height={40} />
          <span className="font-bold">{metadata.title as string}</span>
        </Link>
        <div className="flex items-center gap-2">
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
