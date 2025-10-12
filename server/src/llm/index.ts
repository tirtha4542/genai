import { GoogleGenAI, Part } from "@google/genai";

import appConfig from "@/config";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
export const genAI = new GoogleGenAI({
  apiKey: appConfig.GEMINI_API_KEY,
});

export type ChatMessage = {
  role: "user" | "model";
  parts: Part[];
};
