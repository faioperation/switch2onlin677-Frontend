import React from "react";
import { MessageCircle } from "lucide-react";

const data = [
  { id: 1, name: "Jane Cooper", product: "Sesame oil", platform: "Instagram" },
  { id: 2, name: "Jacob Jones", product: "Doritos", platform: "Facebook" },
  { id: 3, name: "Dianne Russell", product: "Teriyaki sauce", platform: "Instagram" },
  { id: 4, name: "Theresa Webb", product: "Magnetic Paper Clip", platform: "WhatsApp" },
];

const platformStyle = {
  Instagram: "bg-pink-500/10 text-pink-400",
  Facebook: "bg-blue-500/10 text-blue-400",
  WhatsApp: "bg-green-500/10 text-green-400",
};

const RecentConversation = () => {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#262626]">

      <h3 className="text-white mb-6 font-medium">
        Recent Conversation
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          {/* Table Header */}
          <thead className="bg-[#253029] text-gray-300">
            <tr>
              <th className="text-left py-3 px-3">#</th>
              <th className="text-left px-3">Name</th>
              <th className="text-left px-3">Interested Product</th>
              <th className="text-left px-3">Platform</th>
              <th className="text-left px-3">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-[#BFBFBF]">

            {data.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-[#262626] hover:bg-[#202020] transition"
              >

                {/* Number */}
                <td className="py-4 px-3 text-[#BFBFBF]">
                  {String(index + 1).padStart(2, "0")}
                </td>

                {/* Name */}
                <td className="px-3 text-[#BFBFBF]">
                  {item.name}
                </td>

                {/* Product */}
                <td className="px-3">
                  {item.product}
                </td>

                {/* Platform Badge */}
                <td className="px-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${platformStyle[item.platform]}`}
                  >
                    {item.platform}
                  </span>
                </td>

                {/* Action Icon */}
                <td className="px-3 text-center">
                  <button className="w-8 h-8 flex items-center text-center justify-center rounded-md border border-[#2A2A2A] hover:bg-[#2A2A2A] transition">
                    <MessageCircle size={16} className="text-[#BFBFBF]" />
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
};

export default RecentConversation;