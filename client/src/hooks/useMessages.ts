import { useState, useEffect } from "react";

export type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const STORAGE_KEY = "chat-messages";

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm BongoDevElectronics, your Lenovo ThinkPad specialist. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

// Helper functions for localStorage
const saveMessagesToStorage = (messages: Message[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to save messages to localStorage:", error);
  }
};

const loadMessagesFromStorage = (): Message[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsedMessages = JSON.parse(stored);
      // Convert timestamp strings back to Date objects
      return parsedMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
    }
  } catch (error) {
    console.error("Failed to load messages from localStorage:", error);
  }
  return initialMessages;
};

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>(() => loadMessagesFromStorage());

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    saveMessagesToStorage(messages);
  }, [messages]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const addUserMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };
    addMessage(userMessage);
    return userMessage;
  };

  const addBotMessage = (text: string) => {
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text,
      sender: "bot",
      timestamp: new Date(),
    };
    addMessage(botMessage);
    return botMessage;
  };

  const addErrorMessage = () => {
    const errorMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "Sorry, I encountered an error. Please try again.",
      sender: "bot",
      timestamp: new Date(),
    };
    addMessage(errorMessage);
    return errorMessage;
  };

  const clearMessages = () => {
    setMessages(initialMessages);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    messages,
    addMessage,
    addUserMessage,
    addBotMessage,
    addErrorMessage,
    clearMessages,
  };
};
