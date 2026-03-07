import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ConversationList from "../components/conversation/ConversationList";
import ChatHeader from "../components/conversation/ChatHeader";
import ChatMessages from "../components/conversation/ChatMessages";

const fetchConversations = async () => {
  const res = await fetch("/conversations.json");
  return res.json();
};

const fetchMessages = async () => {
  const res = await fetch("/messages.json");
  return res.json();
};

const Conversations = () => {

  const { data: conversations = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  const [selectedUser, setSelectedUser] = useState(null);

  const activeUser =
    selectedUser || conversations[0];

  const userMessages = messages.filter(
    (msg) => msg.userId === activeUser?.id
  );

  return (
    <div className="h-[calc(100vh-70px)]">

      <div className="h-full grid grid-cols-12 bg-[#1A1A1A] border border-[#262626] rounded-xl overflow-hidden">

        {/* Conversation List */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-[#262626]">

          <ConversationList
            conversations={conversations}
            selectedUser={activeUser}
            setSelectedUser={setSelectedUser}
          />

        </div>

        {/* Chat Area */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-col">

          {activeUser && (
            <>
              <ChatHeader user={activeUser} />

              <div className="flex-1 overflow-y-auto">
                <ChatMessages messages={userMessages} />
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default Conversations;