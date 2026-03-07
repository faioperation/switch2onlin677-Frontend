import AgentMessageSetup from "../components/agent/AgentMessageSetup";
import TonePersonality from "../components/agent/TonePersonality";

const AgentManage = () => {

  return (

    <div className="grid lg:grid-cols-2 gap-6">

      <AgentMessageSetup />

      <TonePersonality />

    </div>

  );

};

export default AgentManage;