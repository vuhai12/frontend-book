import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

function ChatButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-8 right-8 z-[9999]
        w-16 h-16
        flex items-center justify-center
        rounded-full
        bg-[#393280]
        text-white
        shadow-[0_15px_35px_rgba(57,50,128,0.35)]
        hover:bg-[#2f296d]
        hover:shadow-[0_20px_45px_rgba(57,50,128,0.5)]
        hover:-translate-y-1
        active:scale-95
        transition-all duration-300
      "
    >
      <ChatBubbleLeftRightIcon className="w-6 h-6" />
    </button>
  );
}

export default ChatButton;
