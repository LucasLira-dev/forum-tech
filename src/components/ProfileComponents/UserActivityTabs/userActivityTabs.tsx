"use client"

import { TopicsCards } from '@/components/topicsComponents/TopicsCards/topicsCards';
import * as Tabs from '@radix-ui/react-tabs';
import { FaComments, FaList } from 'react-icons/fa';

import { topics } from '@/components/topicsComponents/FindTopics/findTopics';
import { CommentsTab } from './CommentsTab/CommentsTab';


const topicsByUser = [
    {
        id: '1',
        title: 'Como aprender React?',
        description: 'Dicas e recursos para iniciantes em React.',
        user: {
            name: 'Lucas mndes',
            avatar: 'https://github.com/LucasLira-dev.png',
        },
        time: '2h',
        answers: 5,
    },
    {
        id: '2',
        title: 'Melhores práticas em Node.js',
        description: 'Compartilhe suas melhores práticas para desenvolvimento com Node.js.',
        user: {
            name: 'Lucas mndes',
            avatar: 'https://github.com/LucasLira-dev.png',
        },
        time: '1h',
        answers: 8,
    },
    {
        id: '3',
        title: 'O que há de novo no ES2024?',
        description: 'Discussão sobre as novas features do ECMAScript 2024.',
        user: {
            name: 'Lucas mndes',
            avatar: 'https://github.com/LucasLira-dev.png',
        },
        time: '3h',
        answers: 2,
    }       
]

const UserActivityTabs = () => {

  // coletar todos os comentários do usuário a partir da lista de tópicos
  const userComments = topics.flatMap((topic) => {
    const comments = topic.comments ?? [];
    return comments
      .filter((c) => c.userName === 'Lucas mndes')
      .map((c) => ({ ...c, topicTitle: topic.title, topicId: topic.id }));
  });

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
          { topicsByUser.length > 0 ? (
            topicsByUser.map((topic) => (
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
        { userComments.length > 0 ? (userComments.map((c) => (
            <CommentsTab
              key={c.id}
              topicId={c.topicId}
              comment={c.description}
              topicTitle={c.topicTitle}
              commentTime={c.time}
            />
        ))) : (
            <span>O usuário ainda não fez nenhum comentário.</span>
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default UserActivityTabs;
