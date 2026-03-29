import ChatBubble from "./ChatBubble";

const ChatMessages = ({ messages }) => {

  return (
    <div className="p-4 md:p-6 space-y-5">

      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg} />
      ))}

    </div>
  );
};

export default ChatMessages;