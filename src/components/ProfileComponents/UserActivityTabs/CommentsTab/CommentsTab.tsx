import Link from "next/link";

interface CommentTabProps {
    topicId: string;
    comment: string;
    topicTitle: string;
    commentTime: string;
}

export const CommentsTab = (props: CommentTabProps) => {
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
                {props.commentTime}
            </span>
        </div>
    )
}