import { authOptions } from "@/lib/auth";
import { createNoteSchema } from "@/types/note";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseResult = createNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input!" }, { status: 400 });
    }

    const { title, content } = parseResult.data;

    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: "Unauthorized!" }, { status: 401 });
    }

    const newNote = await prisma?.note.create({
      data: {
        title,
        content,
        user: {
          connect: {
            id: session.user.id,
            username: session.user.username,
            email: (session.user.email as string)
          },
        },
      },
    });

    return Response.json({ newNote }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
