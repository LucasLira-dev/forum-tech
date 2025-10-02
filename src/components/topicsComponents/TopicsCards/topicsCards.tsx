import Avatar from "@/components/ui/avatar"
import { FaClock, FaComment } from "react-icons/fa"

interface TopicsCardsProps {
    title: string;
    description: string;
    user: {
        name: string;
        avatar: string;
    };
    time: string;
    answers: number;
}

export const TopicsCards = ({ title, description, user, time, answers }: TopicsCardsProps   ) => {
    return(
        <div
        className="flex flex-col gap-4 p-4 rounded-lg mb-4 hover:bg-[var(--muted)] hover:text-[var(--muted-foreground)] transition-colors border border-[var(--border)] cursor-pointer">
            <h2
            className="text-[var(--foreground)] font-semibold text-lg">
                {title}
            </h2>
            <p
            className="text-[var(--muted-foreground)] text-sm">
                {description}
            </p>

            <div
            className="flex gap-4 text-[var(--muted-foreground)] text-sm">
                <div
                className="flex items-center gap-2">
                    <Avatar
                    src={user.avatar}
                    alt="Usuário" 
                    size="sm" 
                    />
                    <span
                    className="font-medium">
                        {user.name}
                    </span>
                </div>

                <div
                className="flex items-center gap-2">
                    <FaClock size={12} />
                    {time} atrás
                </div>

                <div
                className="flex items-center gap-2">
                    <FaComment size={12} />
                    {answers} <span className="hidden sm:block"> Comentários </span>
                </div>
            </div>
        </div>
    )
}