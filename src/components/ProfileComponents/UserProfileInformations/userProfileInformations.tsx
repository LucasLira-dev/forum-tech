import { FaCalendar } from "react-icons/fa"

interface UserProfileInformationsProps {
    name: string;
    username?: string;
    memberSince?: string;
    bio?: string;
    topicsCount?: number;
    commentsCount?: number;
}

export const UserProfileInformations = ({name, username, memberSince, bio, topicsCount, commentsCount}: UserProfileInformationsProps) => {
    const formattedMemberSince = formatRelativeTime(memberSince || "");

    return(
        <div
        className="bg-[var(--card)] flex flex-col gap-6 p-6 rounded-lg ">
            <div
            className="flex flex-col gap-1">
                <span
                className="text-lg font-bold text-[var(--foreground)]">
                    {name}
                </span>
                <p className="text-sm text-[var(--muted-foreground)]">  
                    @{username}
                </p>
            </div>

            <div
            className="flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
                <FaCalendar className="inline mr-2 text-[var(--muted-foreground)]" />
                <p>
                    Membro desde: <span className="font-bold text-[var(--foreground)]">{formattedMemberSince}</span>
                </p>
            </div>

            <p
            className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                { bio ? bio : "Este usuário não adicionou uma biografia ainda."}
            </p>

            <div
            className="flex gap-6 text-sm text-[var(--muted-foreground)] items-center justify-center">
                <div
                className="flex flex-col items-center">
                    <span
                    className="font-bold text-[var(--primary)] text-xl">
                        {topicsCount}
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
                        {commentsCount}
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