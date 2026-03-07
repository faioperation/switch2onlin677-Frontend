import { Pencil } from "lucide-react";

const ProfileCard = ({ profile, openEdit, openPassword }) => {
  return (
    <div className="w-full max-w-2xl h-[500px] bg-[#222222] border border-[#3A3A3A] rounded-xl p-6 md:p-8 relative">

      {/* Edit Icon */}
      <button
        onClick={openEdit}
        className="absolute right-6 top-6 bg-white hover:bg-[#c7c7c7] w-8 h-8 rounded-md flex items-center justify-center text-black transition"
      >
        <Pencil size={15} />
      </button>

      {/* Title */}
      <h2 className="text-white text-2xl font-semibold mb-6">
        Profile
      </h2>

      {/* Avatar + Button */}
      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-4">
          <img
            src={profile.avatar}
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>

        <button
          onClick={openPassword}
          className="text-md  bg-[#2A2A2A] hover:bg-[#333] px-4 py-1.5 rounded-md text-white transition"
        >
          Change Password
        </button>

      </div>

      {/* Fields */}
      <div className="space-y-5">

        {/* Name */}
        <div>
          <label className="block text-sm text-white mb-2">
            Name
          </label>

          <div className="border border-[#3A3A3A] rounded-full px-4 py-3 text-sm text-white bg-transparent">
            {profile.name}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-white mb-2">
            Email
          </label>

          <div className="border border-[#3A3A3A] rounded-full px-4 py-3 text-sm text-white">
            {profile.email}
          </div>
        </div>

        {/* Number */}
        <div>
          <label className="block text-sm text-white mb-2">
            Number
          </label>

          <div className="border border-[#3A3A3A] rounded-full px-4 py-3 text-sm text-white">
            {profile.phone}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ProfileCard;