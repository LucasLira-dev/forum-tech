import { CardInformations } from "@/components/AdminComponents/CardInformations/cardInformations"
import { UserManagement } from "@/components/AdminComponents/UserManagement/userManagement"
import { LuShield } from "react-icons/lu"

export default function AdminPage() {
    return(
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center pt-19">
            <section
            className="w-full p-6 sm:p-8 space-y-3 max-w-5xl">
                <div
                className="flex gap-3 items-center font-bold mb-4">
                    <LuShield
                    className="text-[var(--primary)] text-4xl"
                     />
                    <div
                    className="flex flex-col justify-start w-full">
                        <h1
                        className="text-3xl font-bold">
                            Painel Administrativo
                        </h1>
                        <p
                        className="text-[var(--muted-foreground)] text-sm">
                            Gerencie usúarios e monitore a plataforma
                        </p>
                    </div>
                </div>
                <CardInformations />
                <UserManagement />
            </section>
        </main>
    )
}