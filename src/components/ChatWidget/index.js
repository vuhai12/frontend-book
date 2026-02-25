import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function ChatWidget({ onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello 👋 How can I help you today?", sender: "admin" },
  ]);

  const messagesEndRef = useRef(null);
  const widgetRef = useRef(null);

  // Auto scroll xuống cuối
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      { id: Date.now(), text: message, sender: "user" },
    ]);

    setMessage("");
  };

  return createPortal(
    <div
      ref={widgetRef}
      className="
        fixed md:bottom-8 bottom-[100px] md:inset-auto md:right-8 right-[10px] left-[10px]  z-[9999]
        md:w-[380px]
        h-[min(650px,80vh)]
        bg-white
        rounded-2xl
        shadow-[0_25px_60px_rgba(0,0,0,0.15)]
        flex flex-col
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="bg-[#393280] text-white px-5 py-4 flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg">Customer Support</p>
          <p className="text-sm opacity-80">
            Our team usually responds within minutes
          </p>
        </div>

        <button
          onClick={onClose}
          className="hover:bg-white/20 p-1 rounded-lg transition"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-[#f4f3ff]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`w-fit max-w-[80%] px-4 py-2 rounded-2xl shadow-sm ${
              msg.sender === "admin"
                ? "bg-white rounded-bl-md"
                : "ml-auto bg-[#393280] text-white rounded-br-md"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t flex items-center gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Write a message..."
          className="
            flex-1
            border border-gray-200
            rounded-full
            px-4 py-2
            focus:outline-none
            focus:ring-2
            focus:ring-[#393280]/40
          "
        />

        <button
          onClick={handleSend}
          className="
            bg-[#393280]
            text-white
            p-3
            rounded-full
            hover:bg-[#2f296d]
            transition
          "
        >
          <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default ChatWidget;
