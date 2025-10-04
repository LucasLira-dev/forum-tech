import Avatar from "@/components/ui/avatar";
import { FaClock } from "react-icons/fa";

interface TopicDetailProps {
//   id: string;
  title: string;
  description: string;
  user: {
    name: string;
    avatar?: string;
  };
  time: string;
  technologies?: string[];
}

export const TopicDetail = ({
  title,
  description,
  user,
  time,
  technologies
}: TopicDetailProps) => {
  return (
    <article className="bg-[var(--card)] text-[var(--card-foreground)] rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>
      <div className="flex gap-4 text-[var(--muted-foreground)] text-sm">
        <div className="flex items-center gap-2">
          <Avatar src={user.avatar} alt="Usuário" size="sm" />
          <span className="font-medium">{user.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaClock size={12} />
          {time} atrás
        </div>
      </div>

      <div>
        { technologies && (
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="bg-[var(--muted)] text-[var(--accent-foreground)] rounded-full px-3 py-1 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      <p
        className="mt-6 text-[var(--muted-foreground)] leading-relaxed ">
        {description}
      </p>
    </article>
  );
};
