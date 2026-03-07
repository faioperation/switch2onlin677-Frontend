import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAgentConfig, saveAgentMessage } from "../../api/agentApi";

const AgentMessageSetup = () => {

  const { data } = useQuery({
    queryKey: ["agent-config"],
    queryFn: fetchAgentConfig,
  });

  const [firstMessage, setFirstMessage] = useState("");
  const [closingMessage, setClosingMessage] = useState("");

  const mutation = useMutation({
    mutationFn: saveAgentMessage,
    onSuccess: () => {
      alert("Message saved successfully!");
    },
  });

  const handleSubmit = () => {

    const payload = {
      id: data?.id,
      firstMessage,
      closingMessage,
    };

    mutation.mutate(payload);
  };

  return (

    <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-6">

      <h3 className="text-white text-lg font-medium mb-4">
        Agent Message Setup
      </h3>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-gray-400 mb-2">
            First Message
          </p>

          <textarea
            value={firstMessage}
            onChange={(e)=>setFirstMessage(e.target.value)}
            placeholder="Type message"
            className="w-full h-28 bg-[#111] border border-[#2A2A2A] rounded-lg p-3 text-white text-sm"
          />
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-2">
            Closing Message
          </p>

          <textarea
            value={closingMessage}
            onChange={(e)=>setClosingMessage(e.target.value)}
            placeholder="Type message"
            className="w-full h-28 bg-[#111] border border-[#2A2A2A] rounded-lg p-3 text-white text-sm"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="btn-primary"
        >
          Save Message
        </button>

      </div>

    </div>

  );
};

export default AgentMessageSetup;