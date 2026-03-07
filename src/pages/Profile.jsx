import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import EditProfileModal from "../components/profileModal/EditProfileModal";
import ChangePasswordModal from "../components/profileModal/ChangePasswordModal";
import ProfileCard from "../components/profileModal/ProfileCard";

const Profile = () => {

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/profile.json");
      return res.json();
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-70px)] flex items-center justify-center">
        <p className="text-gray-400">Loading Profile...</p>
      </div>
    );
  }

  return (

    <div className="min-h-[calc(100vh-70px)] flex justify-center px-4 pt-12 pb-10">

      {/* Profile Card */}
      {profile && (
        <ProfileCard
          profile={profile}
          openEdit={() => setEditOpen(true)}
          openPassword={() => setPasswordOpen(true)}
        />
      )}

      {/* Edit Profile Modal */}
      {editOpen && (
        <EditProfileModal
          profile={profile}
          close={() => setEditOpen(false)}
        />
      )}

      {/* Change Password Modal */}
      {passwordOpen && (
        <ChangePasswordModal
          close={() => setPasswordOpen(false)}
        />
      )}

    </div>

  );
};

export default Profile;