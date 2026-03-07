import { Trash2, MessageSquare } from "lucide-react";

const LeadsTable = ({ data }) => {

  const platformColor = {
    instagram: "bg-pink-500/20 text-pink-400",
    facebook: "bg-blue-500/20 text-blue-400",
    whatsapp: "bg-green-500/20 text-green-400",
  };

  return (
    <div className="overflow-x-auto">

      <table className="w-full text-sm">

        <thead className="bg-[#253029] text-[#BFBFBF]">
          <tr>
            <th className="py-3 px-4 text-left">#</th>
            <th className="text-left">Name</th>
            <th className="text-left">Interested Product</th>
            <th className="text-left">Date</th>
            <th className="text-left">Platform</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody className="text-[#BFBFBF]">

          {data.map((lead, index) => (

            <tr
              key={lead.id}
              className="border-b border-[#262626] hover:bg-[#202020]"
            >

              <td className="py-4 px-4">
                {String(index + 1).padStart(2, "0")}
              </td>

              <td>{lead.name}</td>

              <td>{lead.product}</td>

              <td>{lead.date}</td>

              <td>
                <span
                  className={`px-2 py-1 rounded text-xs capitalize ${platformColor[lead.platform.toLowerCase()]}`}
                >
                  {lead.platform}
                </span>
              </td>

              <td className="flex items-center justify-center gap-3 pt-3">

                <MessageSquare
                  size={18}
                  className="text-gray-400 cursor-pointer hover:text-white"
                />

                <Trash2
                  size={18}
                  className="text-red-400 cursor-pointer hover:text-red-500"
                />

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default LeadsTable;