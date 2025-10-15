'use client'

import Image from "next/image";
import { FaSave, FaImages } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useMyProfile } from "@/contexts/MyProfileContext";

export const UserCoverUploader = () => {
  const { userName, capaUrl, uploadCapa, savingCapa } = useMyProfile();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(capaUrl ?? "/capaUser.png");
  const [localObjectUrl, setLocalObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!capaUrl) return;
    if (localObjectUrl) return;
    setPreviewUrl(capaUrl);
  }, [capaUrl, localObjectUrl]);

  useEffect(() => () => {
    if (localObjectUrl) {
      URL.revokeObjectURL(localObjectUrl);
    }
  }, [localObjectUrl]);

  useEffect(() => {
    if (!savingCapa && capaUrl && localObjectUrl) {
      URL.revokeObjectURL(localObjectUrl);
      setLocalObjectUrl(null);
      setPreviewUrl(capaUrl);
    }
  }, [savingCapa, capaUrl, localObjectUrl]);

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
      await uploadCapa(file);
    } finally {
      event.target.value = "";
    }
    }

    return (
      <div className="w-full bg-[var(--card)] border border-[var(--border)] rounded-md p-6">
        <div className="flex gap-2 items-center">
          <FaImages />
          <p>Imagem de Capa</p>
        </div>

        <div className="mt-4 rounded-md w-full h-32 overflow-hidden bg-black/5">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Imagem de Capa"
              width={1200}
              height={400}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--muted-foreground)]">
              Sem imagem
            </div>
          )}
        </div>

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
          className="mt-4 flex justify-center items-center gap-2 bg-[var(--muted)] text-[var(--primary-foreground)] rounded-md px-4 py-2 w-full sm:w-fit hover:brightness-110 transition font-bold text-center cursor-pointer disabled:opacity-60"
          disabled={!userName || savingCapa}
        >
          <FaSave />
          <span>
            {savingCapa ? "Enviando..." : "Alterar Imagem de Capa"}
          </span>
        </button>
      </div>
    );
}
