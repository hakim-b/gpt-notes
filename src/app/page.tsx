import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { metadata } from "./layout";

async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Welcome to {metadata.title as string}!
              </h1>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {session ? (
                <Link className={buttonVariants()} href="/notes/">
                  Open Notes
                </Link>
              ) : (
                <Link className={buttonVariants()} href="/sign-up">
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
