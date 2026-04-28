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
  const [showMobileChat, setShowMobileChat] = useState(false);

  /* ======================
      GET ALL SENDERS
  ====================== */

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/v1/conversation/senders/");
      const sendersList = res.data;

      const sendersWithLastMessage = await Promise.all(
        sendersList.map(async (item) => {
          let lastMessageText = "No messages yet";

          try {
            const msgRes = await axiosSecure.get(
              `/api/v1/conversation/senders/${item.id}/messages/`
            );
            const msgs = msgRes.data;

            if (msgs && msgs.length > 0) {
              // Get the last message in the array
              const lastMsg = msgs[msgs.length - 1];
              
              if (lastMsg.message_type === "image") {
                lastMessageText = "📷 Image";
              } else if (lastMsg.message_type === "video") {
                lastMessageText = "🎥 Video";
              } else if (lastMsg.message_type === "file" || lastMsg.message_type === "pdf") {
                lastMessageText = "📄 Document";
              } else {
                lastMessageText = lastMsg.text_content || "Unsupported message";
              }
            }
          } catch {
            // fallback
          }

          return {
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
            lastMessage: lastMessageText,
          };
        })
      );

      return sendersWithLastMessage;
    }
  });


      // GET MESSAGES


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
  }, [conversations, selectedUser]);

  if (isLoading) return <Loader />;

  const activeUser = selectedUser;

  return (

    <div className="h-[calc(100dvh-80px)] md:h-[calc(100vh-100px)] -m-6 md:m-0">

      <div className="h-full bg-[#1A1A1A] md:border border-[#262626] md:rounded-xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT: Conversation List */}
        <div className={`w-full md:w-[350px] lg:w-[400px] md:border-r border-[#262626] md:h-full overflow-y-auto ${showMobileChat ? "hidden md:block" : "h-full"}`}>
          <ConversationList
            conversations={conversations}
            selectedUser={activeUser}
            setSelectedUser={(user) => {
              setSelectedUser(user);
              setShowMobileChat(true);
            }}
          />
        </div>

        {/* RIGHT: Chat */}
        <div className={`flex-col flex-1 md:h-full border-t border-[#00CE51] md:border-none ${showMobileChat ? "flex h-full" : "hidden md:flex h-full"}`}>

          {activeUser && (
            <>
              <ChatHeader user={activeUser} onBack={() => setShowMobileChat(false)} />

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