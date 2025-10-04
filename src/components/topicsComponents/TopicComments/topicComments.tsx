import Avatar from "@/components/ui/avatar";
import { FaClock } from "react-icons/fa";

interface TopicCommentsProps {
    userName: string;
    userAvatarUrl: string;
    commentText: string;
    commentTime: string;
}

export const TopicComments = ({ userName, userAvatarUrl, commentText, commentTime }: TopicCommentsProps) => {
  return (
    <article className="flex flex-col rounded-lg shadow-md">

      <div className="flex flex-col p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--muted-foreground)]">
        <div className="flex gap-4 text-[var(--muted-foreground)] text-sm">
          <div className="flex items-center gap-2">
            <Avatar src={userAvatarUrl} alt="Usuário" size="sm" />
            <span className="font-medium">{userName}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaClock size={12} />
            {commentTime} atrás
          </div>
        </div>

        <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
          {commentText}
        </p>
      </div>
    </article>
  );
};
