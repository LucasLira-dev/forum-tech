import { FaClock, FaComment } from "react-icons/fa"
import Avatar from "../../ui/avatar"

interface DiscussionsCardsProps {
    tecnologies: string[];
    title: string;
    user: {
        name: string;
        avatar: string;
    };
    time: string;
    answers: number;
}

export const DiscussionsCards = (props: DiscussionsCardsProps) => {
    return(
        <div
        className="flex flex-col gap-4 p-4 rounded-lg mb-4 hover:bg-[var(--muted)] hover:text-[var(--muted-foreground)] transition-colors border border-[var(--border)] cursor-pointer">
            <div
            className="flex justify-between text-[var(--muted-foreground)] text-sm">
                <div className="flex gap-2">
                    { props.tecnologies.map((tech, index) => (
                        <span
                        key={index}
                        className="rounded-md bg-[var(--secondary)] text-[13px] px-2 py-1 text-[var(--secondary-foreground)] font-semibold">
                            {tech}
                        </span>
                    ))}
                </div>
                <span
                className="flex items-center gap-2">
                    <FaClock size={12} />
                    {props.time}h atrás
                </span>
            </div>

            <div
            className="text-[var(--foreground)] font-semibold text-lg">
                {props.title}
            </div>

            <div
            className="flex justify-between text-[var(--muted-foreground)] text-sm">
                <div
                className="flex items-center gap-2">
                    <Avatar
                    src={props.user.avatar}
                    alt="Usuário" 
                    size="sm" 
                     />
                    <span
                    className="font-medium">
                        {props.user.name}
                    </span>
                </div>
                <div
                className="flex items-center gap-2">
                    <FaComment size={12} />
                    {props.answers} respostas
                </div>
            </div>
        </div>
    )
}