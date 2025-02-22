import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);
  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "Hello! How can I help?", sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-lg rounded-2xl p-4 flex flex-col">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">Chat</h2>
            <button onClick={toggleChat} className="text-gray-500 hover:text-black">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`}>
                {msg.text}
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
            <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">Send</button>
          </div>
        </div>
      )}
      <button
        onClick={toggleChat}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
