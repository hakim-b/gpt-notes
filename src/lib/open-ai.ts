import { env } from "~/env/server";
import OpenAI from "openai";

const apiKey = env.OPEN_AI_API_KEY;

if (!apiKey) {
  throw Error("OPEN_AI_API_KEY is NOT set!");
}

const openAI = new OpenAI({ apiKey });
export default openAI;

export async function getVectorEmbedding(text: string) {
  const response = await openAI.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  const embedding = response.data[0].embedding;

  if (!embedding) {
    throw Error("error generating embedding");
  }

  console.log(embedding);

  return embedding;
}
