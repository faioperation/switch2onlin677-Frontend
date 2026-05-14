import React, { useState } from "react";
import { toast } from "react-toastify";
import { Pencil } from "lucide-react";

const Settings = () => {
    const [rate, setRate] = useState(1530);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        // Here we would typically make an API call to save the setting
        toast.success("Settings updated successfully!");
        setIsEditing(false);
    };

    return (
        <div className="p-6 h-full flex flex-col bg-[#141414] text-white">
            <h1 className="text-2xl font-semibold mb-6">Settings</h1>

            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6 max-w-2xl">
                <form onSubmit={handleSave}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Dollar Conversation Rate (IQD)
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$1 = </span>
                            </div>
                            <input
                                type="number"
                                className={`bg-[#0B0B0B] border ${isEditing ? 'border-[#00CE51]' : 'border-[#2A2A2A]'} text-white text-sm rounded-lg focus:ring-[#00CE51] focus:border-[#00CE51] block w-full pl-12 pr-10 p-2.5 outline-none transition-colors disabled:opacity-70`}
                                placeholder="1530"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                disabled={!isEditing}
                                required
                            />
                            {!isEditing && (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#00CE51] transition-colors"
                                    title="Edit Rate"
                                >
                                    <Pencil size={16} />
                                </button>
                            )}
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            Set the current exchange rate from USD to IQD.
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={!isEditing}
                            className={`font-semibold py-2 px-6 rounded-lg transition-colors ${
                                isEditing 
                                ? "bg-[#00CE51] hover:bg-[#00b045] text-[#0B0B0B]" 
                                : "bg-[#2A2A2A] text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
