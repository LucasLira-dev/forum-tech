'use client';

import { topics } from "@/components/topicsComponents/FindTopics/findTopics";
import { TopicComments } from "@/components/topicsComponents/TopicComments/topicComments";
import { TopicDetail } from "@/components/topicsComponents/TopicDetail/topicDetail";
import { CommentButton } from "@/components/topicsComponents/CommentButton/commentButton";
import { NewCommentInput } from "@/components/topicsComponents/NewCommentInput/newCommentInput";
import { NoComments } from "@/components/topicsComponents/NoComments/noComments";
import { useState, useEffect } from "react";

interface TopicPageProps {
  params: Promise<{ id: string }>;
}

export default function TopicPage({ params }: TopicPageProps) {
    const [id, setId] = useState<string>("");
    const [isCommentInputOpen, setIsCommentInputOpen] = useState(false);

    useEffect(() => {
        const getParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };
        getParams();
    }, [params]);

    const topic = topics.find(topic => topic.id === id);

    if (!id) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--primary)]"></div>
            </div>
        );
    }

    if (!topic) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
              <h1 className="text-4xl font-bold">Tópico não encontrado</h1>
            </div>
          );
    }

    const handleCommentClick = () => {
        setIsCommentInputOpen(true);
    };

    const handleCloseCommentInput = () => {
        setIsCommentInputOpen(false);
    };

    const handleSubmitComment = (comment: string) => {
        // Aqui você pode implementar a lógica para salvar o comentário
        console.log("Novo comentário:", comment);
        // Por enquanto, apenas fecha o input
    };

    return (
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
        <section className="p-6 sm:p-8 pt-19 md:pt-24 max-w-5xl mx-auto my-8 flex flex-col gap-5">
          <TopicDetail
            title={topic.title}
            description={topic.description}
            user={topic.user}
            time={topic.time}
            technologies={[
              "React",
              "JavaScript",
              "Performance",
              "Web Development",
            ]}
          />

          <CommentButton
            quantity={topic.answers}
            onCommentClick={handleCommentClick}
          />

          <NewCommentInput
            isOpen={isCommentInputOpen}
            onClose={handleCloseCommentInput}
            onSubmit={handleSubmitComment}
          />

          {topic.comments && topic.comments.length > 0 ? (
            <div className="flex flex-col gap-3">
              {topic.comments.map((comment, index) => (
                <TopicComments
                  key={index}
                  userName={comment.userName}
                  userAvatarUrl={comment.avatar}
                  commentText={comment.description}
                  commentTime={comment.time}
                />
              ))}
            </div>
          ) : (
            <NoComments />
          )}
        </section>
      </main>
    );
}


//p-6 sm:p-8 md:px-30 space-y-3