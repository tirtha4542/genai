import MarkdownRenderer from "./MarkdownRenderer";
import { useMessages, useChat } from "@/hooks";

const ChatInterface = () => {
  const messagesHook = useMessages();
  const { messages, clearMessages } = messagesHook;
  const {
    inputMessage,
    setInputMessage,
    isLoading,
    sendMessage,
    handleKeyPress,
  } = useChat(messagesHook);

  return (
    <div className="flex flex-col h-screen w-full max-w-4xl mx-auto border-0 rounded-none overflow-hidden bg-white shadow-none md:border md:border-gray-300 md:rounded-lg md:shadow-lg">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 md:p-5">
        <div className="flex justify-between items-center mb-2">
          <div className="flex-1 text-center">
            <h2 className="m-0 text-xl md:text-2xl">
              BongoDevElectronics - ThinkPad Assistant
            </h2>
          </div>
          <button
            onClick={clearMessages}
            disabled={isLoading}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            New Chat
          </button>
        </div>
        <p className="m-0 opacity-90 text-sm text-center">Ask me about Lenovo ThinkPads!</p>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 bg-gray-50 min-w-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl relative ${
                message.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-md"
                  : "bg-white text-gray-800 border border-gray-300 rounded-bl-md"
              }`}
            >
              <div className="leading-relaxed break-words overflow-wrap-anywhere">
                {message.sender === "bot" ? (
                  <MarkdownRenderer content={message.text} />
                ) : (
                  message.text
                )}
              </div>
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="mb-4 flex justify-start">
            <div className="max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl relative bg-white text-gray-800 border border-gray-300 rounded-bl-md min-w-0">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></span>
                <span
                  className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></span>
                <span
                  className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex p-5 bg-white border-t border-gray-300 gap-3">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about ThinkPads..."
          disabled={isLoading}
          rows={2}
          className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 text-sm resize-none outline-none transition-colors focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          onClick={sendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className="bg-blue-500 text-white border-none rounded-2xl px-6 py-3 text-sm font-medium cursor-pointer transition-colors hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
