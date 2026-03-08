import { useForm } from "react-hook-form";

const ChangePasswordModal = ({ close }) => {

    const { register, handleSubmit } = useForm();

    const onSubmit = () => {
        alert("Password changed!");
        close();
    };

    return (

        <div
            onClick={close}
            className="fixed inset-0  bg-[#80808080] backdrop-blur-md flex items-center justify-center p-4 z-50"
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#1A1A1A] w-full max-w-2xl mx-auto  p-6 rounded-xl border border-[#262626]"
            >

                <h3 className="text-white text-2xl mb-6">
                    Change Password
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <input
                        type="password"
                        placeholder="Old Password"
                        {...register("oldPassword")}
                        className="w-full bg-white/5 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white"
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        {...register("newPassword")}
                        className="w-full bg-white/5 border border-[#2A2A2A] rounded-lg px-3 py-2 text-white"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        {...register("confirmPassword")}
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
                            className="bg-[#00CE51] text-white px-4 py-2 rounded-lg text-sm"
                        >
                            Save Change
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
};

export default ChangePasswordModal;