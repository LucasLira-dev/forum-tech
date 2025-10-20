import { QueryProvider } from "./queryProvider";
import { ProfileContent } from "@/components/ProfileComponents/ProfileContent/profileContent";

interface UserProfilePageProps {
    params: Promise<{ username: string }>
}

export default async function UserProfilePage({params}: UserProfilePageProps) {

    const { username }= await params;

    return(
        <QueryProvider>
            <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center pt-19">
                <section
                className="w-full p-6 sm:p-8 space-y-3 max-w-5xl">
                    <ProfileContent
                    username={username}
                     />    
                </section>
            </main>
        </QueryProvider>
    )
}