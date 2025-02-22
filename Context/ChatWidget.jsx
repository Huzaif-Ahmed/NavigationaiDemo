// import { useChat } from "../context/ChatContext";
import { MessageCircle, X } from "lucide-react";
import { useChat } from "./ChatProvider";
import { useState } from "react";

const ChatWidget = () => {
  const { isChatOpen, toggleChat, messages, sendMessage } = useChat();
  const[input,setInput]=useState("");


  const handleSend = (e) => {
    e.preventDefault();
    
    console.log(input);
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {isChatOpen && (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-bold">Chat</h3>
            <X className="cursor-pointer" onClick={toggleChat} />
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {messages.slice(1).map((msg, index) => (
              <div key={index} className="p-2 bg-gray-200 rounded">
                {msg.content}
              </div>
            ))}
          </div>
          <div className="border-t pt-2 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded-l-lg"
              placeholder="Type a message..."
            />
            <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">Send</button>
          </div>
        </div>
      ) }
        <button
          onClick={toggleChat}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
        >
          <MessageCircle size={24} />
        </button>
      
    </div>
  );
};

export default ChatWidget;
