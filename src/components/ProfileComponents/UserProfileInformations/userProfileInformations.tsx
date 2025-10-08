import { FaCalendar } from "react-icons/fa"

export const UserProfileInformations = () => {
    return(
        <div
        className="bg-[var(--card)] flex flex-col gap-6 p-6 rounded-lg ">
            <div
            className="flex flex-col gap-1">
                <span
                className="text-lg font-bold text-[var(--foreground)]">
                    Lucas mndes
                </span>
                <p className="text-sm text-[var(--muted-foreground)]">  
                    @lucasmdes
                </p>
            </div>

            <div
            className="flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
                <FaCalendar className="inline mr-2 text-[var(--muted-foreground)]" />
                <p>
                    Membro desde: <span className="font-bold text-[var(--foreground)]"> 08/10/2025 </span>
                </p>
            </div>

            <p
            className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e eficientes. Com experiência em diversas tecnologias, busco sempre aprimorar minhas habilidades e contribuir para projetos desafiadores.
            </p>

            <div
            className="flex gap-6 text-sm text-[var(--muted-foreground)] items-center justify-center">
                <div
                className="flex flex-col items-center">
                    <span
                    className="font-bold text-[var(--primary)] text-xl">
                        12
                    </span>
                    <p
                    className="text-sm text-[var(--muted-foreground)]
                    loading:animate-pulse">
                        Tópicos
                    </p>
                </div>

                <div
                className="flex flex-col items-center">
                    <span
                    className="font-bold text-[var(--primary)] text-xl">
                        30
                    </span>
                    <p
                    className="text-sm text-[var(--muted-foreground)]
                    loading:animate-pulse">
                        Comentários
                    </p>
                </div>
            </div>
        </div>
    )
}