import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

const data = [
  { day: "Mon", value: 150 },
  { day: "Tue", value: 260 },
  { day: "Wed", value: 190 },
  { day: "Thu", value: 180 },
  { day: "Fri", value: 280 },
  { day: "Sat", value: 110 },
  { day: "Sun", value: 230 },
];

const ConversationChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="bg-[#1A1A1A] rounded-xl p-3 md:p-6 border border-[#262626] w-full">

      <h3 className="text-white mb-6 font-medium">
        Conversation
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>

          {/* X Axis */}
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
          />

          {/* Y Axis */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            domain={[0, 300]}
            ticks={[0, 100, 200, 300]}
          />

          {/* remove tooltip UI */}
          <Tooltip cursor={{ fill: "transparent" }} content={() => null} />

          {/* Bars */}
          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
            barSize={28}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={activeIndex === index ? "#00CE51" : "#3B8056"}
                onMouseEnter={() => setActiveIndex(index)}
              />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default ConversationChart;