import { useForm } from "react-hook-form";

const AdminModal = ({ close, mutation }) => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    mutation.mutate(data);
    close();
  };

  return (

    <div
      onClick={close}
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1A1A1A] w-full max-w-lg p-6 rounded-xl border border-[#262626]"
      >

        <h3 className="text-white text-lg mb-6">
          Add Admin
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Name */}
          <div>

            <label
              htmlFor="name"
              className="block text-sm text-white mb-2"
            >
              Name
            </label>

            <input
              id="name"
              placeholder="Enter name"
              className="w-full bg-white/5 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00CE51]"
              {...register("name", { required: "Name required" })}
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}

          </div>

          {/* Email */}
          <div>

            <label
              htmlFor="email"
              className="block text-sm text-white mb-2"
            >
              Email
            </label>

            <input
              id="email"
              placeholder="Enter email"
              className="w-full bg-white/5 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00CE51]"
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email"
                }
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* Password */}
          <div>

            <label
              htmlFor="password"
              className="block text-sm text-white mb-2"
            >
              Set Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              className="w-full bg-white/5 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00CE51]"
              {...register("password", {
                required: "Password required"
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={close}
              className="border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm hover:bg-red-500/10"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#00CE51] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#00b84a]"
            >
              Save Admin
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default AdminModal;