import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import EditProfileModal from "../components/profileModal/EditProfileModal";
import ChangePasswordModal from "../components/profileModal/ChangePasswordModal";
import ProfileCard from "../components/profileModal/ProfileCard";
import useAxiosSecure from "../hooks/useAxios";
import Loader from "../components/Loader";

const Profile = () => {

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const axiosSecure = useAxiosSecure();

  const { data: profile, isLoading , refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {

      const res = await axiosSecure.get("/auth/me/");
      return res.data;
      refetch();

    }
  });

  if (isLoading) {
    return <Loader />;
  }

  return (

    <div className="min-h-[calc(100vh-70px)] flex justify-center px-4 pt-12 pb-10">

      {profile && (

        <ProfileCard
          profile={profile}
          openEdit={() => setEditOpen(true)}
          openPassword={() => setPasswordOpen(true)}
        />

      )}

      {editOpen && (

        <EditProfileModal
          profile={profile}
          close={() => setEditOpen(false)}
        />

      )}

      {passwordOpen && (

        <ChangePasswordModal
          close={() => setPasswordOpen(false)}
        />

      )}

    </div>

  );
};

export default Profile;