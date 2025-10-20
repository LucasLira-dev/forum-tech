"use client";

import { useState } from "react";
import { TopicDetail } from "@/components/topicsComponents/TopicDetail/topicDetail";
import { CommentButton } from "@/components/topicsComponents/CommentButton/commentButton";
import { NewCommentInput } from "@/components/topicsComponents/NewCommentInput/newCommentInput";
import { TopicComments } from "@/components/topicsComponents/TopicComments/topicComments";
import { NoComments } from "@/components/topicsComponents/NoComments/noComments";
import { topicsService } from "@/services/topicsService";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { commentsService } from "@/services/commentsService";
import { useToast } from "@/components/Alerts";

interface TopicComment {
  id: string;
  content: string;
  createdAt: string;
  userName: string;
  userId: string;
  avatarUrl?: string;
}

interface TopicCommentApiResponse {
  id?: string;
  commentId?: string;
  content?: string;
  description?: string;
  createdAt?: string;
  userId?: string;
  user?: {
    id?: string | null;
    name?: string | null;
    profile?: {
      userName?: string | null;
      avatarUrl?: string | null;
    } | null;
  } | null;
}

interface TopicDetails {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  technologies: string[];
  userName: string;
  userAvatarUrl?: string;
  userId: string;
  comments: TopicComment[];
}

interface TopicPageClientProps {
  topic: TopicDetails;
}

export default function TopicPageClient({ topic }: TopicPageClientProps) {
  const router = useRouter();
  const { success, error } = useToast();
  const [isCommentInputOpen, setIsCommentInputOpen] = useState(false);
  const [comments, setComments] = useState<TopicComment[]>(topic.comments || []);
  const [currentTopic, setCurrentTopic] = useState<TopicDetails>(topic);
  const [isUpdatingTopic, setIsUpdatingTopic] = useState(false);
  const [isDeletingTopic, setIsDeletingTopic] = useState(false);
  const { data: session } = useSession();


  const sessionUserId = (session?.user as { id?: string } | undefined)?.id;
  const isTopicOwner = sessionUserId === currentTopic.userId;

  const handleCommentClick = () => setIsCommentInputOpen(true);
  const handleCloseCommentInput = () => setIsCommentInputOpen(false);

  const handleSubmitComment = async (content: string) => {
    if (!session?.accessToken) {
      console.error("No access token available");
      return;
    }
    
    const newCommentResponse = await commentsService.createComment(
      session.accessToken,
      currentTopic.id,
      content
    );

    const commentPayload = (newCommentResponse as { data?: TopicCommentApiResponse }).data ?? newCommentResponse;
    const formattedComment = normalizeComment(commentPayload as TopicCommentApiResponse);

    setComments((prev) => [...prev, formattedComment]);
    setIsCommentInputOpen(false);
  };

  const handleSaveDescription = async (newDescription: string) => {
    if (!session?.accessToken) {
      throw new Error("No access token available");
    }

    const previousDescription = currentTopic.description;
    setCurrentTopic((prev) => ({ ...prev, description: newDescription }));
    setIsUpdatingTopic(true);

    try {
      await topicsService.updateTopic(session.accessToken, currentTopic.id, newDescription);
    } catch (error) {
      setCurrentTopic((prev) => ({ ...prev, description: previousDescription }));
      throw error;
    } finally {
      setIsUpdatingTopic(false);
    }
  };

  const handleDeleteTopic = async () => {
    if (!session?.accessToken) {
      throw new Error("No access token available");
    }

    if (isDeletingTopic) return;

    setIsDeletingTopic(true);

    try {
      await topicsService.deleteTopic(session.accessToken, currentTopic.id);
      router.push("/topics");
    } catch (error) {
      throw error;
    } finally {
      setIsDeletingTopic(false);
    }
  };

  const handleUpdateComment = async (commentId: string, newContent: string) => {
    if (!session?.accessToken) {
      error("Você precisa estar autenticado para editar comentários.");
      throw new Error("No access token available");
    }

    // Snapshot do comentário original
    const previousComments = [...comments];

    // Atualização otimista
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: newContent }
          : comment
      )
    );

    try {
      await commentsService.updateComment(session.accessToken, commentId, newContent);
      success("Comentário atualizado com sucesso!");
    } catch (err) {
      // Rollback em caso de erro
      setComments(previousComments);
      error("Erro ao atualizar comentário. Tente novamente.");
      throw err;
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!session?.accessToken) {
      error("Você precisa estar autenticado para excluir comentários.");
      throw new Error("No access token available");
    }

    const previousComments = [...comments];

    // Remoção otimista
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));

    try {
      await commentsService.deleteComment(session.accessToken, commentId);
      success("Comentário excluído com sucesso!");
    } catch (err) {
      // Rollback em caso de erro
      setComments(previousComments);
      error("Erro ao excluir comentário. Tente novamente.");
      throw err;
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      <section className="w-full p-6 sm:p-8 pt-19 md:pt-24 max-w-5xl mx-auto my-8 flex flex-col gap-5">
        <TopicDetail
          title={currentTopic.title}
          description={currentTopic.description}
          user={{
            name: currentTopic.userName,
            avatar: currentTopic.userAvatarUrl,
          }}
          time={currentTopic.createdAt}
          technologies={currentTopic.technologies}
          showActions={isTopicOwner}
          onSaveDescription={handleSaveDescription}
          isSaving={isUpdatingTopic}
          onDelete={handleDeleteTopic}
          isDeleting={isDeletingTopic}
        />

        <CommentButton
          quantity={comments.length}
          onCommentClick={handleCommentClick}
        />

        <NewCommentInput
          isOpen={isCommentInputOpen}
          onClose={handleCloseCommentInput}
          onSubmit={handleSubmitComment}
        />

        {comments.length > 0 ? (
          <div className="flex flex-col gap-3">
            {comments.map((comment) => (
              <TopicComments
                key={comment.id}
                userName={comment.userName}
                userAvatarUrl={comment.avatarUrl}
                commentText={comment.content}
                commentTime={comment.createdAt}
                showActions={comment.userId === sessionUserId}
                onSave={(newText) => handleUpdateComment(comment.id, newText)}
                onDelete={() => handleDeleteComment(comment.id)}
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

const normalizeComment = (raw: TopicCommentApiResponse): TopicComment => {
  return {
    id: raw.id ?? raw.commentId ?? generateTempId(),
    content: raw.content ?? raw.description ?? "",
    createdAt: raw.createdAt ?? new Date().toISOString(),
    userName: raw.user?.profile?.userName ?? raw.user?.name ?? "Usuário",
    userId: raw.userId ?? raw.user?.id ?? "",
    avatarUrl: raw.user?.profile?.avatarUrl ?? undefined,
  };
};

const generateTempId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `temp-${Math.random().toString(36).slice(2, 11)}`;
