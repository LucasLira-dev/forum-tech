import { ProfileBannerSkeleton } from "./profileBannerSkeleton"
import { UserActivityTabsSkeleton } from "./userActivityTabsSkeleton"
import { UserProfileInformationsSkeleton } from "./userprofileInformations"

export const ProfileSkeleton = () => {
    return (
        <>
            <ProfileBannerSkeleton />
            <UserProfileInformationsSkeleton />
            <UserActivityTabsSkeleton />
        </>
    )
}