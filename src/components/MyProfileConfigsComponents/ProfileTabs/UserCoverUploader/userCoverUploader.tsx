'use client'

import Image from "next/image";
import { FaSave, FaImages } from "react-icons/fa";
import { useRef, useState } from "react";

export const UserCoverUploader = () => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>('/capaUser.png');

    const openFilePicker = () => {
        inputRef.current?.click();
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
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
          className="mt-4 flex justify-center items-center gap-2 bg-[var(--muted)] text-[var(--primary-foreground)] rounded-md px-4 py-2 w-full sm:w-fit hover:brightness-110 transition font-bold text-center cursor-pointer"
        >
          <FaSave />
          <span>
            Alterar Imagem de Capa
          </span> 
        </button>
      </div>
    );
}
