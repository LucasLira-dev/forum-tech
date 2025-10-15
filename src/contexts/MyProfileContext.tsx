'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { myProfileService } from '@/services/myProfileService'
import { ToastContainer, useToast } from "@/components/Alerts/toast";

interface MyProfileContextType {
    avatarUrl?: string;
    setAvatarUrl: (url: string) => void;
    capaUrl?: string;
    setCapaUrl: (url: string) => void;
    userName: string;
    setUserName: (name: string) => void;
    bio?: string;
    setBio: (bio: string) => void;
    updateProfile: () => Promise<void>;
    savingInfos: boolean;
    savingAvatar: boolean;
    savingCapa: boolean;
    uploadAvatar: (avatarFile: File) => Promise<void>;
    uploadCapa: (capaFile: File) => Promise<void>;
    isPublic?: boolean;
    setIsPublic: (isPublic: boolean) => void;
    updateVisibility: (nextValue: boolean) => Promise<void>;
}

const myProfileContext = createContext<MyProfileContextType | undefined>(undefined);

interface MyProfileProviderProps {
    children: ReactNode;
}

export const MyProfileProvider = ({ children }: MyProfileProviderProps) => {
    const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
    const [capaUrl, setCapaUrl] = useState<string | undefined>(undefined);
    const [userName, setUserName] = useState<string>(""); // Nome de usuário obrigatório
    const [bio, setBio] = useState<string | undefined>(undefined);
    const [savingInfos, setSavingInfos] = useState<boolean>(false);
    const [savingAvatar, setSavingAvatar] = useState<boolean>(false);
    const [savingCapa, setSavingCapa] = useState<boolean>(false);
    const { data: session, status} = useSession();
    const { toasts, removeToast, success: showSuccessToast, error: showErrorToast } = useToast();

    const [isPublic, setIsPublic] = useState<boolean>(false);

    const fetchMyProfileData = useCallback(async () => {
        if (!session?.accessToken){
            console.error("No access token available");
            return;
        }

        try {
            const profileData = await myProfileService.getMyProfile(session.accessToken);
            setAvatarUrl(profileData.avatarUrl);
            setCapaUrl(profileData.capaUrl);
            setUserName(profileData.userName);
            setBio(profileData.bio);
            setIsPublic(profileData.isPublic)
        } catch (error) {
            console.error("Error fetching profile data:", error);
            showErrorToast("Não foi possível carregar seu perfil.");
        } 
    }, [session?.accessToken, showErrorToast]);

    useEffect(() => {
        if (status !== "authenticated") return;
        fetchMyProfileData();
    }, [status, fetchMyProfileData]);


    const updateProfile = useCallback(async () => {
        if (!session?.accessToken) {
            console.error("No access token available");
            showErrorToast("Sessão expirada. Faça login novamente.");
            return;
        }

        try {
            setSavingInfos(true);
            const res = await myProfileService.updateMyProfile(session.accessToken, { userName: userName.trim(), bio: bio?.trim() });

            setUserName(res.userName);
            setBio(res.bio);
            showSuccessToast("Perfil atualizado com sucesso!");
        } catch (error) {
            console.error("Error updating profile:", error);
            showErrorToast("Não foi possível atualizar o perfil.");
        } finally {
            await fetchMyProfileData();
            setSavingInfos(false);
        }
    }, [session?.accessToken, userName, bio, fetchMyProfileData, showSuccessToast, showErrorToast]);


    const uploadAvatar = useCallback(async (avatarFile: File) => {
        if (!session?.accessToken) {
            console.error("No access token available");
            showErrorToast("Sessão expirada. Faça login novamente.");
            return;
        }

        try {
            setSavingAvatar(true);
            const res = await myProfileService.uploadAvatar(session.accessToken, avatarFile);
            setAvatarUrl(res.avatarUrl);
            showSuccessToast("Avatar atualizado com sucesso!");
        } catch (error) {
            console.error("Error uploading avatar:", error);
            showErrorToast("Não foi possível atualizar o avatar.");
        } finally {
            setSavingAvatar(false);
        }
    }, [session?.accessToken, showSuccessToast, showErrorToast]);


    const uploadCapa = useCallback(async (capaFile: File) => {
        if (!session?.accessToken) {
            console.error("No access token available");
            showErrorToast("Sessão expirada. Faça login novamente.");
            return;
        }

        try {
            setSavingCapa(true);
            const res = await myProfileService.uploadCapa(session.accessToken, capaFile);
            setCapaUrl(res.capaUrl);
            showSuccessToast("Capa atualizada com sucesso!");
        } catch (error) {
            console.error("Error uploading capa:", error);
            showErrorToast("Não foi possível atualizar a capa.");
        } finally {
            setSavingCapa(false);
        }
    }, [session?.accessToken, showSuccessToast, showErrorToast]);


    const updateVisibility = useCallback(async (nextValue: boolean) => {
        if (!session?.accessToken) {
            console.error("No access token available");
            showErrorToast("Sessão expirada. Faça login novamente.");
            return;
        }
        try {
            const res = await myProfileService.updatePrivacity(session.accessToken, nextValue);
            setIsPublic(res.isPublic);
            showSuccessToast("Visibilidade atualizada com sucesso!");
        } catch (error) {
            console.error("Error updating visibility:", error);
            showErrorToast("Não foi possível atualizar a visibilidade.");
        }
    }, [session?.accessToken, showErrorToast, showSuccessToast]);

    return (
        <>
            <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
            <myProfileContext.Provider value={{ avatarUrl, setAvatarUrl, capaUrl, setCapaUrl, userName, setUserName, bio, setBio, updateProfile, savingInfos, savingAvatar, savingCapa, uploadAvatar, uploadCapa, isPublic, setIsPublic, updateVisibility }}>
                {children}
            </myProfileContext.Provider>
        </>
    );
}

export const useMyProfile = () => {
    const context = useContext(myProfileContext);
    if (!context) {
        throw new Error("useMyProfile must be used within a MyProfileProvider");
    }

    return context;
}
