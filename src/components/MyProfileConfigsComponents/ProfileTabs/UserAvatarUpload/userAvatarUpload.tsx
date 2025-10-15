'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaUser, FaSave } from "react-icons/fa";
import { useMyProfile } from "@/contexts/MyProfileContext";

export const UserAvatarUpload = () => {
    const { userName, avatarUrl, uploadAvatar, savingAvatar } = useMyProfile();

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(avatarUrl ?? "/userAvatar.png");
    const [localObjectUrl, setLocalObjectUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!avatarUrl) return;
        if (localObjectUrl) return;
        setPreviewUrl(avatarUrl);
    }, [avatarUrl, localObjectUrl]);

    useEffect(() => {
        return () => {
            if (localObjectUrl) {
                URL.revokeObjectURL(localObjectUrl);
            }
        };
    }, [localObjectUrl]);

    useEffect(() => {
        if (!savingAvatar && avatarUrl && localObjectUrl) {
            URL.revokeObjectURL(localObjectUrl);
            setLocalObjectUrl(null);
            setPreviewUrl(avatarUrl);
        }
    }, [savingAvatar, avatarUrl, localObjectUrl]);

    const openFilePicker = () => {
        inputRef.current?.click();
    };

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (localObjectUrl) {
            URL.revokeObjectURL(localObjectUrl);
        }

        const url = URL.createObjectURL(file);
        setLocalObjectUrl(url);
        setPreviewUrl(url);

        try {
            await uploadAvatar(file);
        } finally {
            event.target.value = "";
        }
    };

    return(
        <div className="w-full bg-[var(--card)] border border-[var(--border)] rounded-md p-6">
             <div className="flex gap-2 items-center">
                <FaUser />
                <p>Avatar</p>
            </div>

            <div
            className="flex flex-col justify-center sm:flex-row gap-2 sm:gap-4 sm:justify-start items-center mt-6">
                { previewUrl ? (
                    <Image
                    src={previewUrl}
                    alt="Avatar"
                    width={100}
                    height={100}
                    className="w-24 h-24 rounded-full object-cover"
                />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] text-2xl font-bold">
                        U
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onFileChange}
                />

                <button
                type="button"
                onClick={openFilePicker}
                className="flex justify-center items-center gap-2 bg-[var(--muted)] text-[var(--primary-foreground)] rounded-md px-4 py-2 w-full sm:w-fit hover:brightness-110 transition font-bold text-center cursor-pointer disabled:opacity-60"
                disabled={!userName || savingAvatar}
                >
                    <FaSave />
                    {savingAvatar ? "Enviando..." : "Alterar Avatar"}
                </button>
            </div>  
        </div>
    )
}