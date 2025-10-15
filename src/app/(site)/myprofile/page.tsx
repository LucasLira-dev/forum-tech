import ProfileTabs from "@/components/MyProfileConfigsComponents/ProfileTabs/profileTabs";
import { MyProfileProvider } from "@/contexts/MyProfileContext";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function MyProfile() {
    return(
        <MyProfileProvider>
            <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center pt-19">
                <section
                className="w-full p-6 sm:p-8 space-y-3 max-w-5xl">
                    <article
                    className="flex flex-col justify-start w-full">
                        <Link
                        href={"/topics"}
                        className="flex gap-2 items-center text-[var(--muted-foreground)] rounded-md px-4 py-2 w-fit hover:bg-[var(--secondary)] transition font-bold cursor-pointer">
                            <FaArrowLeft />
                            <span>
                                Voltar
                            </span>
                        </Link>
                        <h1
                        className="text-3xl font-bold mt-4">
                            Meu Perfil
                        </h1>
                        <p
                        className="text-[var(--muted-foreground)] mt-1"> 
                            Gerencie suas informações e configurações
                        </p>
                    </article>

                    <ProfileTabs />
                </section>
            </main>
        </MyProfileProvider>
    )
}