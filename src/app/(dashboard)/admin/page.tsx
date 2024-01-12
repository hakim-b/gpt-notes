import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

async function Admin() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <h1 className="text-4xl font-bold">
        Welcome to admin {session?.user.username}!
      </h1>
    );
  }

  return (
    <h1 className="text-4xl font-bold">
      Please <Link href="/sign-in" className="text-primary underline">Log in</Link> to see this page!
    </h1>
  );
}

export default Admin;
