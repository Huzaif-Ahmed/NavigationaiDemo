import { createContext, useState, useContext } from "react";

const ChatContext = createContext();

const INTENTS = {
  'cost_optimizer': {
    description: 'Budgeting, expense tracking, financial optimization',
    route: '/cost-analysis' // Your app's route
  },
  'credit_score': {
    description: 'Credit score checks and loan eligibility',
    route: '/credit-score'
  },
  'credit_help': {
    description: 'Credit improvement strategies',
    route: '/credit-help'
  },
  'health_score': {
    description: 'Physical well-being and fitness metrics',
    route: '/health-dashboard'
  }
};

export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `You are an advanced intent classifier. Follow these rules STRICTLY:

1. Analyze user messages against these intents:
${Object.entries(INTENTS).map(([key, val]) => `- ${key}: ${val.description}`).join('\n')}

2. Respond ONLY in this JSON format:
{
  "intent": "${Object.keys(INTENTS).join('" | "')}" | null,
  "clarification": "string" | null
}

3. Use "clarification" ONLY when:
   - Message matches multiple intents
   - Needs more information
   - Contains ambiguous terms like "score"

4. Never reveal intent names to users

Examples:
User: "How to save money?" → {"intent": "cost_optimizer", "clarification": null}
User: "My score?" → {"intent": null, "clarification": "Which score: credit or health?"}`
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
      const response = await fetch("http://localhost:12345/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "phi3",
          stream: false,
          format: "json",
          messages: updatedMessages,
          options: { temperature: 0.2 }
        })
      });

      const data = await response.json();
      console.log(data)

      if (data) {
        var botans=extractResponse(data.content);
        setMessages(prev => [...prev, {
          role: "assistant",
          content: clarification || "Redirecting to your requested feature...",
          meta: { intent }
        }]);
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
