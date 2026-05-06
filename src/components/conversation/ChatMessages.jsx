import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";

const ChatMessages = ({ messages, selectedUserId }) => {
  const scrollRef = useRef(null);
  const lastMessageCount = useRef(messages.length);
  const lastUserId = useRef(selectedUserId);

  const scrollToBottom = (behavior = "auto") => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      scrollRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior,
      });
    }
  };

  // Scroll to bottom on initial load
  useEffect(() => {
    scrollToBottom("auto");
  }, []);

  // When messages update OR user changes
  useEffect(() => {
    // If user changed, reset and scroll to bottom instantly
    if (selectedUserId !== lastUserId.current) {
      lastUserId.current = selectedUserId;
      lastMessageCount.current = messages.length;
      scrollToBottom("auto");
      return;
    }

    if (messages.length > lastMessageCount.current) {
      const container = scrollRef.current;
      if (container) {
        const isNearBottom =
          container.scrollHeight - container.scrollTop - container.clientHeight < 250;

        if (isNearBottom) {
          setTimeout(() => scrollToBottom("smooth"), 50);
        }
      }
    } else if (messages.length > 0 && lastMessageCount.current === 0) {
      scrollToBottom("auto");
    }
    lastMessageCount.current = messages.length;
  }, [messages, selectedUserId]);

  const handleImageLoad = () => {
    const container = scrollRef.current;
    if (container) {
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 250;
      if (isNearBottom) {
        scrollToBottom("smooth");
      }
    }
  };

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5"
    >
      {messages.map((msg) => (
        <ChatBubble 
          key={msg.id} 
          message={msg} 
          onImageLoad={handleImageLoad}
        />
      ))}
      <div className="h-2 w-full" />
    </div>
  );
};

export default ChatMessages;