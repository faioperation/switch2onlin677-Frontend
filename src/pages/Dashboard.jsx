import React from "react";
import StatsCard from "../components/dashboard/StatsCard";
import ConversationChart from "../components/dashboard/ConversationChart";
import PlatformChart from "../components/dashboard/PlatformChart";
import RecentConversation from "../components/dashboard/RecentConversation";
import TrendingProducts from "../components/dashboard/TrendingProducts";

import { MessageSquare, MessageCircle, Users, UserPlus } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatsCard
          title="Total Conversations"
          value="1504"
          change="20.2%"
          positive
          icon={<MessageSquare size={18} className="text-purple-400" />}
        />

        <StatsCard
          title="Active Chat"
          value="547"
          change="30.5%"
          positive
          icon={<MessageCircle size={18} className="text-yellow-400" />}
        />

        <StatsCard
          title="Total Leads"
          value="354"
          change="5.2%"
          positive={false}
          icon={<Users size={18} className="text-blue-400" />}
        />

        <StatsCard
          title="Potential Leads"
          value="571"
          change="2.2%"
          positive
          icon={<UserPlus size={18} className="text-green-400" />}
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <ConversationChart />
        </div>

        <PlatformChart />

      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <RecentConversation />

        <TrendingProducts />

      </div>

    </div>
  );
};

export default Dashboard;