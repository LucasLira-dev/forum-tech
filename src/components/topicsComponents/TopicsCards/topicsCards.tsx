import Avatar from "@/components/ui/avatar"
import Link from "next/link";
import { FaClock, FaComment } from "react-icons/fa"
import { useRouter } from "next/navigation";

interface TopicsCardsProps {
    id: string;
    title: string;
    description: string;
    user: {
        name: string;
        avatar?: string;
    };
    time: string;
    answers: number;
}

export const TopicsCards = ({id, title, description, user, time, answers }: TopicsCardsProps   ) => {
    const formattedTime = formatRelativeTime(time);
    const router = useRouter();

    return(
    <Link
    href={`/topics/${id}`}
        className="flex flex-col gap-4 p-4 rounded-lg mb-4 hover:bg-[var(--muted)] hover:text-[var(--muted-foreground)] transition-colors border border-[var(--border)] cursor-pointer">
            <h2
            className="text-[var(--foreground)] font-semibold text-lg">
                {title}
            </h2>
            <p
            className ="text-[var(--muted-foreground)] text-sm">
                {description}
            </p>

            <div
            className="flex gap-4 text-[var(--muted-foreground)] text-sm">
                <div
                className="flex items-center gap-2"
                onClick={e => {
                    e.stopPropagation();
                    router.push(`profile/${user.name}`)
                }}>
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
                    {formattedTime}
                </div>

                <div
                className="flex items-center gap-2">
                    <FaComment size={12} />
                    {answers} <span className="hidden sm:block"> Comentários </span>
                </div>
            </div>
        </Link>
    )
}

const MINUTE_IN_MS = 60 * 1000;
const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const DATE_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
});

function formatRelativeTime(rawTime: string) {
    const parsedDate = new Date(rawTime);
    if (Number.isNaN(parsedDate.getTime())) {
        return `${rawTime} atrás`;
    }

    const now = Date.now();
    const diffInMs = Math.max(0, now - parsedDate.getTime());

    if (diffInMs >= DAY_IN_MS) {
        return DATE_FORMATTER.format(parsedDate);
    }

    if (diffInMs < MINUTE_IN_MS) {
        return "há instantes";
    }

    if (diffInMs < HOUR_IN_MS) {
        const minutes = Math.floor(diffInMs / MINUTE_IN_MS);
        return `há ${minutes} min`;
    }

    const hours = Math.floor(diffInMs / HOUR_IN_MS);
    return `há ${hours} h`;
}