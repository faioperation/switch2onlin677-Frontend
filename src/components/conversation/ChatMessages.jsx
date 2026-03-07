import React from "react";
import ChatBubble from "./ChatBubble";

const ChatMessages = ({ messages }) => {

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">

      {messages.map(msg => (
        <ChatBubble key={msg.id} message={msg}/>
      ))}

    </div>
  );

};

export default ChatMessages;