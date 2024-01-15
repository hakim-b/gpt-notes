import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in?callbackUrl=/");
  }

  return (
    <>
      <h1 className="text-4xl font-bold">
        Hello {session.user.username || session.user.name}
      </h1>
    </>
  );
}

export default Home;
