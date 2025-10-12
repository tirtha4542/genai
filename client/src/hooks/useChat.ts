import { useState } from "react";
import http from "@/config/http";
import { useMessages } from "./useMessages";

export const useChat = (messagesHook: ReturnType<typeof useMessages>) => {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { addUserMessage, addBotMessage, addErrorMessage } = messagesHook;

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    addUserMessage(inputMessage);
    const currentMessage = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await http.post(
        "/api/chat",
        { message: currentMessage },
        {
          timeout: 10 * 60 * 1000, // 10 minutes
        }
      );
      const data = response.data;
      addBotMessage(data.message);
    } catch (error) {
      console.error("Error sending message:", error);
      addErrorMessage();
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return {
    inputMessage,
    setInputMessage,
    isLoading,
    sendMessage,
    handleKeyPress,
  };
};
