import { useState } from "react";
import AdminModal from "../components/admin/AdminModal";
import { Trash } from "lucide-react";
import { useAdmins } from "../hooks/useAdmin";

const AdminManage = () => {

  const { data: admins = [], mutation } = useAdmins();

  const [open, setOpen] = useState(false);

  return (

    <div className="w-full min-h-[calc(100vh-70px)] pb-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

        <h2 className="text-white text-lg font-semibold">
          All Admin
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="bg-[#00CE51] px-4 py-2 rounded-lg text-sm text-black w-full sm:w-auto"
        >
          + Add Admin
        </button>

      </div>

      {/* Table */}
      <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-[520px] w-full text-sm text-left">

            <thead className="bg-[#253029] text-gray-300">

              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>

                <th className="hidden md:table-cell p-3">
                  Last Active
                </th>

                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>

            </thead>

            <tbody>

              {admins.map((admin, index) => (

                <tr
                  key={admin.id}
                  className="border-t border-[#262626] hover:bg-[#202020] transition"
                >

                  <td className="p-3 text-gray-300">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td className="p-3 text-white">
                    {admin.name}
                  </td>

                  <td className="p-3 text-gray-400">
                    {admin.email}
                  </td>

                  <td className="hidden md:table-cell p-3 text-gray-400">
                    {admin.lastActive}
                  </td>

                  <td className="p-3">
                    <span className="bg-[#1f2937] px-3 py-1 rounded-full text-xs text-gray-300">
                      Admin
                    </span>
                  </td>

                  <td className="p-3">
                    <Trash
                      size={16}
                      className="text-red-500 cursor-pointer hover:text-red-400"
                    />
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Modal */}
      {open && (
        <AdminModal
          close={() => setOpen(false)}
          mutation={mutation}
        />
      )}

    </div>

  );

};

export default AdminManage;