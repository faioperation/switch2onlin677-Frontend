const ChatBubble = ({ message }) => {

  const isSent = message.type === "sent";

  const renderContent = () => {

    // ✅ TEXT
    if (message.messageType === "text") {
      return message.text || "No message";
    }

    // ✅ IMAGE
    if (message.messageType === "image" && message.media) {
      return (
        <img
          src={message.media}
          alt="img"
          className="rounded-lg max-w-[200px]"
        />
      );
    }

    // ✅ VIDEO
    if (message.messageType === "video" && message.media) {
      return (
        <video
          src={message.media}
          controls
          className="rounded-lg max-w-[220px]"
        />
      );
    }

    // ✅ PDF / DOCUMENT
    if (
      message.messageType === "document" ||
      message.messageType === "pdf"
    ) {
      return (
        <a
          href={message.media}
          target="_blank"
          className="text-blue-400 underline"
        >
          📄 Open Document
        </a>
      );
    }

    // ✅ FALLBACK
    return "Unsupported message";
  };

  return (

    <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>

      <div className="flex flex-col max-w-[90%] md:max-w-[65%]">

        <div
          className={`px-4 py-3 rounded-xl text-sm
          ${
            isSent
              ? "bg-[#3B8056] text-white"
              : "bg-[#2A2A2A] text-gray-200"
          }`}
        >
          {renderContent()}
        </div>

        <span className="text-xs text-gray-500 mt-1">
          {message.time}
        </span>

      </div>

    </div>

  );
};

export default ChatBubble;