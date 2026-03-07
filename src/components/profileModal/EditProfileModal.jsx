import { useForm } from "react-hook-form";

const EditProfileModal = ({ close, profile }) => {

    const { register, handleSubmit } = useForm({
        defaultValues: profile
    });

    const onSubmit = (data) => {
        alert("Profile updated!");
        close();
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

                <h3 className="text-white mb-6">
                    Edit Profile
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <input
                        {...register("name")}
                        className="w-full bg-white/5 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white"
                    />

                    <input
                        {...register("email")}
                        className="w-full bg-white/5 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white"
                    />

                    <input
                        {...register("phone")}
                        className="w-full bg-white/5 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white"
                    />

                    <div className="flex justify-end gap-3 pt-3">

                        <button
                            type="button"
                            onClick={close}
                            className="border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm"
                        >
                            Cancel
                        </button>

                        <button
                            className="bg-[#00CE51] text-black px-4 py-2 rounded-lg text-sm"
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