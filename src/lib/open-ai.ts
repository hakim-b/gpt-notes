import { env } from "@/env/server";
import OpenAI from "openai";

const apiKey = env.OPEN_AI_API_KEY;

if (!apiKey) {
  throw Error("OPEN_AI_API_KEY is NOT set!");
}

const openAI = new OpenAI({ apiKey });
export default openAI;
