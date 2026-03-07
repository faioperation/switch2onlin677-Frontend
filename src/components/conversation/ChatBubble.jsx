import React from "react";

const ChatBubble = ({ message }) => {

  const isSent = message.type === "sent";

  return (
    <div className={`flex flex-col ${isSent ? "items-end" : "items-start"}`}>

      <div
        className={`max-w-[65%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
          isSent
            ? "bg-[#3B8056] text-white"
            : "bg-[#2A2A2A] text-gray-200"
        }`}
      >
        {message.text}
      </div>

      <span className="text-xs text-gray-500 mt-1">
        {message.time}
      </span>

    </div>
  );
};

export default ChatBubble;