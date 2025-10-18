
interface TopicPageProps {
  params: Promise<{ topicId: string }>;
}

import { notFound } from "next/navigation";
import { topicsService } from "@/services/topicsService";
import TopicPageClient from "./TopicPageClient";

interface TopicProfile {
  userName?: string | null;
  avatarUrl?: string | null;
}

interface TopicUser {
  name?: string | null;
  profile?: TopicProfile | null;
}

interface TopicCommentApi {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  user?: TopicUser | null;
}

interface TopicApiResponse {
  topicId: string;
  title: string;
  description: string;
  technologies?: string[] | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: TopicUser | null;
  comments?: TopicCommentApi[] | null;
}

interface NormalizedComment {
  id: string;
  content: string;
  createdAt: string;
  userName: string;
  userId: string;
  avatarUrl?: string;
}

interface NormalizedTopic {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  technologies: string[];
  userName: string;
  userAvatarUrl?: string;
  userId: string;
  comments: NormalizedComment[];
}

interface TopicPageProps {
  params: Promise<{ topicId: string }>;
}

const DEFAULT_USER_NAME = "Usuário";

const normalizeTopic = (topic: TopicApiResponse): NormalizedTopic => ({
  id: topic.topicId,
  title: topic.title,
  description: topic.description,
  createdAt: topic.createdAt,
  updatedAt: topic.updatedAt,
  technologies: topic.technologies ?? [],
  userName: topic.user?.profile?.userName ?? topic.user?.name ?? DEFAULT_USER_NAME,
  userId: topic.userId,
  userAvatarUrl: topic.user?.profile?.avatarUrl ?? undefined,
  comments: (topic.comments ?? []).map((comment) => ({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    userName: comment.user?.profile?.userName ?? comment.user?.name ?? DEFAULT_USER_NAME,
    userId: comment.userId,
    avatarUrl: comment.user?.profile?.avatarUrl ?? undefined,
  })),
});

export default async function TopicPage({ params }: TopicPageProps) {
  const { topicId } = await params;

  if (!topicId) {
    notFound();
  }

  let topicData: unknown;

  try {
    topicData = await topicsService.getTopicDetails(topicId);
  } catch (error) {
    console.error("Erro ao buscar detalhes do tópico:", error);
    notFound();
  }

  const rawTopic = (topicData as { data?: TopicApiResponse }).data ?? topicData;

  if (!rawTopic || typeof rawTopic !== "object" || !("topicId" in rawTopic)) {
    notFound();
  }

  const normalizedTopic = normalizeTopic(rawTopic as TopicApiResponse);

  return <TopicPageClient topic={normalizedTopic} />;
}
           