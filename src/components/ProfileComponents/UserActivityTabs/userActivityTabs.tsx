"use client"

import { TopicsCards } from '@/components/topicsComponents/TopicsCards/topicsCards';
import * as Tabs from '@radix-ui/react-tabs';
import { FaComments, FaList } from 'react-icons/fa';
import { CommentsTab } from './CommentsTab/CommentsTab';

interface Topic {
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

interface Comment {
  topicId: string;
  comment: string;
  topicTitle: string;
  commentTime: string;
}

interface UserActivityTabsProps {
  topics: Topic[];
  comments: Comment[];
}

const UserActivityTabs = ({ topics, comments }: UserActivityTabsProps) => {

  return (
    <Tabs.Root defaultValue="topics" className="w-full">
      <Tabs.List className="flex items-center justify-center gap-1 bg-transparent p-2">
        <Tabs.Trigger
          value="topics"
          className="flex justify-center items-center gap-2 px-4 py-2 rounded-md text-[var(--muted-foreground)] bg-[var(--accent)] hover:bg-[var(--muted)] transition-colors text-center data-[state=active]:bg-[color:var(--muted)] data-[state=active]:text-[var(--foreground)] data-[state=active]:font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] w-full"
        >
          <FaList className="text-[var(--muted-foreground)] data-[state=active]:text-[var(--foreground)]" />
          <span className="text-sm">Tópicos</span>
        </Tabs.Trigger>

        <Tabs.Trigger
          value="comments"
          className="flex justify-center items-center gap-2 px-4 py-2 rounded-md text-[var(--muted-foreground)] bg-[var(--accent)] hover:bg-[var(--muted)] transition-colors text-center data-[state=active]:bg-[color:var(--muted)] data-[state=active]:text-[var(--foreground)] data-[state=active]:font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] w-full"
        >
          <FaComments className="text-[var(--muted-foreground)] data-[state=active]:text-[var(--foreground)]" />
          <span className="text-sm">Comentários</span>
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="topics" className="mt-4 flex flex-col gap-4">
          { topics.length > 0 ? (
            topics.map((topic) => (
               <TopicsCards 
               key={topic.id}
               id={topic.id}
               title={topic.title}
               description={topic.description}
               user={topic.user}
               time={topic.time}
               answers={topic.answers}
                />
            ))
          ): (
            <span>O usuário ainda não criou nenhum tópico.</span>
          )}
      </Tabs.Content>

      <Tabs.Content value="comments" className="mt-4 flex flex-col gap-4">
        { comments.length > 0 ? (comments.map((c, index) => (
            <CommentsTab
              key={index}
              topicId={c.topicId}
              comment={c.comment}
              topicTitle={c.topicTitle}
              commentTime={c.commentTime}
            />
        ))) : (
            <span>O usuário ainda não fez nenhum comentário.</span>
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default UserActivityTabs;
