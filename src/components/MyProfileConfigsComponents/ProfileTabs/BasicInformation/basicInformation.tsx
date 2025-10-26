'use client'

import { useMyProfile } from "@/contexts/MyProfileContext"
import { useEffect, useState } from "react"

export const BasicInformation = () => {
    const { userName, bio, setUserName, setBio, updateProfile, savingInfos } = useMyProfile();
    const [inputUserName, setInputUserName] = useState<string>(userName || "");
    const [inputBio, setInputBio] = useState<string>(bio || "");

    // Sincroniza estado local com contexto ao carregar/atualizar
    useEffect(() => {
        setInputUserName(userName || "");
    }, [userName]);
    useEffect(() => {
        setInputBio(bio || "");
    }, [bio]);

    const handleSave = () => {
        setUserName(inputUserName);
        setBio(inputBio);
        updateProfile();
    };

    const handleCancel = () => {
        setInputUserName(userName || "");
        setInputBio(bio || "");
    };

    return(
        <>
            <div className="w-full bg-[var(--card)] border border-[var(--border)] rounded-md p-6">
                <p className="text-lg font-semibold">
                    Informações Básicas
                </p>

                <div className="flex flex-col ">
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--muted-foreground)] mt-4">
                        Nome de exibição
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={inputUserName}
                        maxLength={50}
                        className="w-full mt-1 p-2 rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
                        placeholder="Seu nome"
                        onChange={(e) => setInputUserName(e.target.value)}
                    />
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                        {inputUserName.length}/50 caracteres
                    </p>
                </div>

                <div className="flex flex-col ">
                    <label htmlFor="bio" className="block text-sm font-medium text-[var(--muted-foreground)] mt-4">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={inputBio}
                        maxLength={160}
                        rows={3}
                        className="w-full mt-1 p-2 rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
                        placeholder="Fale um pouco sobre você"
                        disabled={!inputUserName}
                        onChange={(e) => setInputBio(e.target.value)}
                    ></textarea>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                        {inputBio.length}/160 caracteres
                    </p>
                </div>
            </div>
            <div className="flex gap-2 mt-4">
                <button
                    type="button"
                    className="flex justify-center items-center gap-2 bg-transparent border border-[var(--border)] text-[var(--muted-foreground)] rounded-md px-4 py-2 w-full sm:w-fit hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition font-bold text-center cursor-pointer"
                    onClick={handleCancel}
                >
                    Cancelar
                </button>
                <button
                    type="button"
                    className="flex justify-center items-center gap-2 bg-[var(--muted)] text-[var(--primary-foreground)] rounded-md px-4 py-2 w-full sm:w-fit hover:brightness-110 transition font-bold text-center cursor-pointer"
                    disabled={!inputUserName || inputUserName.trim() === ""}
                    onClick={handleSave}
                >
                    { savingInfos ? 'Salvando...' : 'Salvar' }
                </button>
            </div>
        </>
    )
}