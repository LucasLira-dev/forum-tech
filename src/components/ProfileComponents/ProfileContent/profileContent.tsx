"use client";

import ProfileBanner from "../ProfileBanner/profileBanner"
import UserActivityTabs from "../UserActivityTabs/userActivityTabs"
import { UserProfileInformations } from "../UserProfileInformations/userProfileInformations"
import { useQuery } from "@tanstack/react-query"
import { profileService } from "@/services/publicProfile" 

export const ProfileContent = ({ username}: { username: string }) => {

    const { data: userProfile, isLoading, isError } = useQuery({
        queryKey: ['profile', username],
        queryFn: () => profileService.getUserProfile(username),
        staleTime: 1000 * 60 * 25, // isso faz com que os dados sejam considerados "frescos" por 25 minutos
        enabled: !!username, // só executa a query se o username estiver disponível
    });

    if (isLoading) {
        return <p>Carregando perfil...</p>;
    }

    if (isError || !userProfile) {
        return <p>Erro ao carregar o perfil. Tente novamente mais tarde.</p>;
    }

    return(
        <article
        className="flex flex-col gap-2 justify-start w-full">
            <ProfileBanner
            avatarUrl={userProfile?.userAvatar}
            coverUrl={userProfile?.capa}
            name={userProfile?.name}
             /> 
            <UserProfileInformations
            bio={userProfile?.bio}
            commentsCount={userProfile?.comments?.length || 0}
            topicsCount={userProfile?.topics?.length || 0}
            memberSince={userProfile?.createdAt}
            name={userProfile?.name || ""}
            username={userProfile?.userName}
             /> 
            <UserActivityTabs
            comments={userProfile?.comments || []}
            topics={userProfile?.topics || []}
             />
        </article> 
    )
}