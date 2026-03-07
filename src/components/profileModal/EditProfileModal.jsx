import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const EditProfileModal = ({ close, profile }) => {

  const { register, handleSubmit } = useForm({
    defaultValues: profile
  });

  const [imagePreview, setImagePreview] = useState(profile?.avatar);

  // TanStack mutation (future backend ready)
  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/profile.json", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      return res.json();
    },
    onSuccess: () => {
      alert("Profile updated successfully!");
      close();
    }
  });

  // Image upload to imgbb
  const handleImageUpload = async (e) => {

    const image = e.target.files[0];

    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    const apiKey = "YOUR_IMGBB_API_KEY";

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();

    setImagePreview(data.data.url);
  };

  const onSubmit = (data) => {

    const updatedData = {
      ...data,
      avatar: imagePreview
    };

    mutation.mutate(updatedData);
  };

  return (

    <div
      onClick={close}
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1A1A1A] w-full max-w-md p-6 rounded-xl border border-[#262626]"
      >

        <h3 className="text-white text-2xl mb-6">
          Edit Profile
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Avatar Upload */}
          <div className="flex items-center gap-4">

            <img
              src={imagePreview}
              alt="avatar"
              className="w-14 h-14 rounded-full object-cover"
            />

            <label className="text-md bg-[#2A2A2A] px-3 py-1.5 rounded-md text-gray-300 cursor-pointer hover:bg-[#333]">

              Upload File

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

            </label>

          </div>

          {/* Name */}
          <div>

            <label className="text-xs text-gray-400 mb-1 block">
              Name
            </label>

            <input
              {...register("name")}
              className="w-full bg-[#111] border border-[#3A3A3A] rounded-md px-3 py-2 text-white text-sm"
            />

          </div>

          {/* Email */}
          <div>

            <label className="text-xs text-gray-400 mb-1 block">
              Email
            </label>

            <input
              {...register("email")}
              className="w-full bg-[#111] border border-[#3A3A3A] rounded-md px-3 py-2 text-white text-sm"
            />

          </div>

          {/* Phone */}
          <div>

            <label className="text-xs text-gray-400 mb-1 block">
              Number
            </label>

            <input
              {...register("phone")}
              className="w-full bg-[#111] border border-[#3A3A3A] rounded-md px-3 py-2 text-white text-sm"
            />

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={close}
              className="border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#00CE51] text-black px-4 py-2 rounded-md text-sm"
            >
              Save Change
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditProfileModal;