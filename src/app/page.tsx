import { buttonVariants } from "@/components/ui/button";
import User from "@/components/user";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <h1 className="text-4xl font-bold">Hello World</h1>
      <Link href="/admin" className={buttonVariants()}>
        Open my admin
      </Link>

      {session && (
        <>
          <h2 className="text-2xl font-bold">Client session:</h2>
          <User />
          <h2 className="text-2xl font-bold">Server session:</h2>
          <pre>{JSON.stringify(session)}</pre>
        </>
      )}
    </>
  );
}

export default Home;
