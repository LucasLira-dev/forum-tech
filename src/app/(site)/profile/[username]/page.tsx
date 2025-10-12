import ProfileBanner from "@/components/ProfileComponents/ProfileBanner/profileBanner";
import UserActivityTabs from "@/components/ProfileComponents/UserActivityTabs/userActivityTabs";
import { UserProfileInformations } from "@/components/ProfileComponents/UserProfileInformations/userProfileInformations";

export default function UserProfilePage() {
    return(
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center pt-19">
            <section
            className="w-full p-6 sm:p-8 space-y-3 max-w-5xl">
                <article
                className="flex flex-col gap-2 justify-start w-full">
                    <ProfileBanner /> 
                    <UserProfileInformations /> 
                    <UserActivityTabs />
                </article>     
            </section>
        </main>
    )
}