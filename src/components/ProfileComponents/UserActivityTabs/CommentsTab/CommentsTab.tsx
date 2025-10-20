import Link from "next/link";

interface CommentTabProps {
    topicId: string;
    comment: string;
    topicTitle: string;
    commentTime: string;
}

export const CommentsTab = (props: CommentTabProps) => {
    const formattedTime = formatRelativeTime(props.commentTime);

    return(
        <div
        className="flex flex-col gap-4 p-4 rounded-lg mb-4 hover:bg-[var(--muted)] hover:text-[var(--muted-foreground)] transition-colors border border-[var(--border)] cursor-pointer">
            <p>
                Comentário em: <Link href={`/topics/${props.topicId}`} className="font-bold text-[var(--primary)]"> {props.topicTitle} </Link>
            </p>

            <p
            className="text-[var(--foreground)] font-medium">
                {props.comment}
            </p>

            <span
            className="text-sm text-[var(--muted-foreground)]">
                {formattedTime}
            </span>
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