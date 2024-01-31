import openAI, { getVectorEmbedding } from "@/lib/open-ai";
import { notesIndex } from "@/lib/pinecone";
import { getServerSession } from "next-auth";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Note } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    const truncatedMessages = messages.slice(-6);
    const embedding = await getVectorEmbedding(
      truncatedMessages.map((message) => message.content).join("\n"),
    );

    const session = await getServerSession();
    const userId = session?.user.id;

    const allNotes = await prisma?.note.findMany({ where: { userId } });

    const vectorQueryResponse = await notesIndex.query({
      vector: embedding,
      topK: allNotes?.length as number,
      filter: { userId },
    });

    const relevantNotes = await prisma?.note.findMany({
      where: {
        id: {
          in: vectorQueryResponse.matches.map((match) => match.id),
        },
      },
    });

    console.log("Relevant Notes");
    console.table(relevantNotes);

    let strOut = "You are an intelligent note taking app.\n";
    strOut += "You answer the user's question based on their existing notes\n";
    strOut += "The relevant notes for this query are:\n";

    const formattedNotes = relevantNotes?.map((note: Note) => {
      let str = `\nTitle: ${note.title}`;
      str += `Content: ${note.content}`;
      return str;
    });

    const systemMessage: ChatCompletionMessage = {
      role: "assistant",
      content: strOut + formattedNotes?.join("\n\n"),
    };

    const response = await openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...truncatedMessages],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
