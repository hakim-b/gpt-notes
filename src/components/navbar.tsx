import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import SignOutButton from "./sign-out-button";

const Navbar = () => {
  return (
    <header className="shadow-md border-2 p-3 sm:p-5 w-full">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <h1 className="text-3xl font-bold ml-2">
            GPT-Notes
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <SignOutButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
