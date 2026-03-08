const ChatBubble = ({ message }) => {

  const isSent = message.type === "sent";

  return (

    <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>

      <div className="flex flex-col max-w-[90%] md:max-w-[65%]">

        <div
          className={`px-4 py-3 rounded-xl text-sm
          ${isSent
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

    </div>

  );
};

export default ChatBubble;