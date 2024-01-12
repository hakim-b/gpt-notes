import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Brain } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <header className="shadow-md border p-3 sm:p-5 w-full">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Brain className="h-8 w-8" />
          <h1 className="text-sm min-[925px]:text-3xl font-bold ml-2">
            Flowbrain
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Link className={buttonVariants()} href="/sign-in">
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
