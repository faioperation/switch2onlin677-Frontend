import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxios";

import ConversationList from "../components/conversation/ConversationList";
import ChatHeader from "../components/conversation/ChatHeader";
import ChatMessages from "../components/conversation/ChatMessages";
import Loader from "../components/Loader";

const Conversations = () => {

  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);

  /* ======================
      GET ALL SENDERS
  ====================== */

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/v1/conversation/senders/");

      return res.data.map((item) => ({
        id: item.id,
        name: item.full_name || "User",
        platform: item.platform,

        // ✅ FIXED TIME (no seconds)
        time: item.last_interaction
          ? new Date(item.last_interaction).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          : "",

        initial: (item.full_name || "U").charAt(0).toUpperCase(),
        lastMessage: "Click to view",
      }));
    }
  });

  /* ======================
      GET MESSAGES
  ====================== */

  const { data: messages = [], isLoading: msgLoading } = useQuery({
    queryKey: ["messages", selectedUser?.id],
    enabled: !!selectedUser?.id,
    queryFn: async () => {

      const res = await axiosSecure.get(
        `/api/v1/conversation/senders/${selectedUser.id}/messages/`
      );

      return res.data.map((msg) => ({

        id: msg.id,
        text: msg.text_content,
        media: msg.media_url,
        messageType: msg.message_type,

        type: msg.is_from_customer ? "received" : "sent",

        time: msg.timestamp
          ? new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
          : "",

      }));
    }
  });

  useEffect(() => {
    if (conversations.length && !selectedUser) {
      setSelectedUser(conversations[0]);
    }
  }, [conversations]);

  if (isLoading) return <Loader />;

  const activeUser = selectedUser;

  return (

    <div className="h-[calc(100vh-70px)]">

      <div className="h-full bg-[#1A1A1A] border border-[#262626] rounded-xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT: Conversation List */}
        <div className="w-full md:w-[400px] md:border-r border-[#262626] md:h-full h-[30%] overflow-y-auto">
          <ConversationList
            conversations={conversations}
            selectedUser={activeUser}
            setSelectedUser={setSelectedUser}
          />
        </div>

        {/* RIGHT: Chat */}
        <div className="flex flex-col flex-1 md:h-full h-[70%] border-t border-[#00CE51] md:border-none">

          {activeUser && (
            <>
              <ChatHeader user={activeUser} />

              <div className="flex-1 overflow-y-auto">
                {msgLoading ? (
                  <Loader />
                ) : (
                  <ChatMessages messages={messages} />
                )}
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default Conversations;