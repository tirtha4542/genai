import express, { type Request, type Response } from "express";

import { ChatMessage, genAI } from "@/llm";
import { SYSTEM_PROMPT } from "@/prompts";

const router = express.Router();

const chatHistory: ChatMessage[] = [];

router.post("/chat", async (req: Request, res: Response) => {
  const userMessage = req.body.message.trim();

  if (!userMessage) {
    return res.status(400).json({
      error: "Message is required",
    });
  }

  const chat = genAI.chats.create({
    model: "gemini-2.5-flash",
    history: chatHistory,
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
  });

  const response = await chat.sendMessage({
    message: userMessage,
  });

  chatHistory.push({
    role: "user",
    parts: [
      {
        text: userMessage,
      },
    ],
  });

  chatHistory.push({
    role: "model",
    parts: [
      {
        text: response.text,
      },
    ],
  });

  console.log("Chat history:", JSON.stringify(chatHistory, null, 2));

  return res.json({
    message: response.text,
  });
});

export default router;
