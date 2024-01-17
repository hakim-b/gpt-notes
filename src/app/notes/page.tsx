import Note from "@/components/note";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Notes",
};

async function Notes() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in?callbackUrl=/");
  }

  const allNotes = await prisma?.note.findMany({
    where: { user: session.user },
  });

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allNotes?.map((note) => <Note note={note} key={note.id} />)}
      </div>
      {allNotes?.length === 0 && (
        <h2 className="col-span-full text-center text-2xl font-bold">
          You don&apos;t have any notes yet!
        </h2>
      )}
    </>
  );
}

export default Notes;
