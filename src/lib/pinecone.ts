import { env } from "@/env/server";
import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = env.PINECONE_API_KEY;

if (!apiKey) {
  throw Error("OPEN_AI_API_KEY is NOT set!");
}

const pinecone = new Pinecone({
  apiKey,
});

export const notesIndex = pinecone.Index("ai-notetaker");
