import { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "I need you to act as an intent recognizer with four intents: 'cost optimizer', 'credit score checker', 'credit expert', and 'health score'. \n\n- 'cost optimizer' is used when a person wants to know their expenses or check their balance sheet.\n- 'credit score checker' helps the person know their credit score for loan eligibility.\n- 'credit expert' helps strategize how to increase a credit score.\n- 'health score' is about checking overall well-being or fitness.\n\nI will provide a text, and you should return only **one word** based on the intent: 'cost optimizer', 'credit score checker', 'credit expert', or 'health score'.\n\n### Important Rule:\nIf the text is ambiguous (e.g., it only asks for 'score' without specifying which one), **instead of classifying**, return:\n**chat: Which score do you want to check? Credit score or health score?**\n\n"
    }
  ]);
  function extractResponse(text) {
    const splitText = text.split("</think>\n\n");
    return splitText.length > 1 ? splitText[1].trim() : text.trim();
}
  // Toggle Chat Window
  const toggleChat = () => setIsChatOpen((prev) => !prev);

  // Add a new message
  const sendMessage = async (userMessage) => {
    const updatedMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(updatedMessages);
    
    try {
      const response = await fetch("http://localhost:12345/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "deepseek-r1:1.5b",
          stream: false,
          messages: updatedMessages
        })
      });

      const data = await response.json();

      if (data && data.content) {
        var botans=extractResponse(data.content);
        setMessages([...updatedMessages, { role: "assistant", content: botans }]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <ChatContext.Provider value={{ isChatOpen, toggleChat, messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom Hook for easy use
export const useChat = () => useContext(ChatContext);
