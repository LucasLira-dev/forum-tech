import { ProfileBannerSkeleton } from "./profileBannerSkeleton"
import { UserActivityTabsSkeleton } from "./userActivityTabsSkeleton"
import { UserProfileInformationsSkeleton } from "./userprofileInformations"

export const ProfileSkeleton = () => {
    return (
        <article
        className="flex flex-col gap-2 justify-start w-full">
            <ProfileBannerSkeleton />
            <UserProfileInformationsSkeleton />
            <UserActivityTabsSkeleton />
        </article>
    )
}