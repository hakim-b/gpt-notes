import { buttonVariants } from "~/components/ui/button";
import { authOptions } from "~/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Brain } from "lucide-react";
import GitHubLogo from "~/assets/fa--github-alt.svg";

async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <center>
                <Brain size={65} />
              </center>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Welcome to GPT-Notes!
              </h1>
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                An intelligent AI app designed to enhance your productivity and
                organization.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="https://github.com/hakim-b/gpt-notes"
                target="_blank"
                className={buttonVariants({ variant: "outline" })}
              >
                <GitHubLogo /> &nbsp;&nbsp; Link to Repo
              </Link>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {session ? (
                <Link
                  href="/notes"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Open Notes
                </Link>
              ) : (
                <Link href="/sign-up" className={buttonVariants()}>
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
