import NoteCard from "~/components/note-card";
import { authOptions } from "~/lib/auth";
import { Note } from "@prisma/client";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Show } from "~/utils/show";
import { For } from "~/utils/for";

export const metadata: Metadata = {
  title: "Your Notes",
};

async function Notes() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const allNotes = await prisma?.note.findMany({
    where: { user: session.user },
  });

  return (
    <>
      <Show>
        <>
          <Show.When isTrue={allNotes?.length == 0}>
            <h2 className="col-span-full text-center text-2xl font-bold">
              You don&apos;t have any notes yet!
            </h2>
          </Show.When>
          <Show.Else>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <For
                each={allNotes!}
                render={(note: Note) => <NoteCard note={note} key={note.id} />}
              />
            </div>
          </Show.Else>
        </>
      </Show>
    </>
  );
}

export default Notes;
