import { authOptions } from "@/lib/auth";
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from "@/types/notes-crud";
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

    const connectObj =
      session.user.username === null
        ? {
            id: session.user.id,
            email: session.user.email as string,
            name: session.user.name,
          }
        : {
            id: session.user.id,
            username: session.user.username,
            email: session.user.email as string,
          };

    const newNote = await prisma?.note.create({
      data: {
        title,
        content,
        user: {
          connect: connectObj,
        },
      },
    });

    return Response.json({ newNote }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const parseResult = updateNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input!" }, { status: 400 });
    }

    const { id, title, content } = parseResult.data;

    const note = await prisma?.note.findUnique({ where: { id } });

    if (!note) {
      return Response.json({ error: "Note not found!" }, { status: 404 });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json(
        {
          error: `Unauthorized!`,
        },
        { status: 401 },
      );
    }

    const updatedNote = await prisma?.note.update({
      where: { id },
      data: { title, content },
    });

    return Response.json({ updatedNote }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const parseResult = deleteNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input!" }, { status: 400 });
    }

    const { id } = parseResult.data;

    const note = await prisma?.note.findUnique({ where: { id } });

    if (!note) {
      return Response.json({ error: "Note not found!" }, { status: 404 });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json(
        {
          error: `Unauthorized!`,
        },
        { status: 401 },
      );
    }

    await prisma?.note.delete({ where: { id } });

    return Response.json({ message: "Note deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
