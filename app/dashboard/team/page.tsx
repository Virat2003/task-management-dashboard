"use client";

import TeamCard from "@/components/team/TeamCard";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addMember } from "@/redux/memberSlice";
import toast from "react-hot-toast";

export default function TeamPage() {
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const memberList = useSelector((state: RootState) => state.members);

    const handleAddMember = async () => {
        if (!name || !email || !role) {
            toast.error("All fields are required");
            return;
        }

        try {
            setIsSaving(true);

            await new Promise((resolve) =>
                setTimeout(resolve, 600)
            );

            const newMember = {
                id: Date.now().toString(),
                name,
                email,
                role,
            };

            dispatch(addMember(newMember));

            toast.success("Member added successfully!");

            setName("");
            setEmail("");
            setRole("");
            setShowForm(false);

        } catch (error) {
            console.error(error);
            toast.error("Failed to add member");
        } finally {
            setIsSaving(false);
        }
    };

    return (

        <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                    Team Members
                </h1>

                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm md:text-base cursor-pointer"
                >
                    Add Member
                </button>
            </div>

            {showForm && (
                <div className="bg-white border border-slate-200 shadow-sm p-4 md:p-6 rounded-xl mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-slate-800">
                        Add Member
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Name — half width on desktop */}
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            disabled={isSaving}
                            onChange={(e) => setName(e.target.value)}
                            className="border text-black p-2 rounded-lg w-full"
                        />

                        {/* Email — half width on desktop */}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            disabled={isSaving}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border text-black p-2 rounded-lg w-full"
                        />

                        {/* Role — full width on all screens */}
                        <div className="md:col-span-2">
                            <input
                                type="text"
                                placeholder="Role"
                                value={role}
                                disabled={isSaving}
                                onChange={(e) => setRole(e.target.value)}
                                className="border text-black p-2 rounded-lg w-full"
                            />
                        </div>

                        <div className="md:col-span-2 flex gap-3">
                            <button
                                onClick={handleAddMember}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                            >
                                {isSaving ? (
                                    <>
                                        <svg
                                            className="animate-spin w-4 h-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    "Save Member"
                                )}
                            </button>
                            <button
                                onClick={() => setShowForm(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {memberList.map((member) => (
                    <TeamCard
                        key={member.id}
                        member={member}
                    />
                ))}
            </div>
        </div>
    );
}