// src/services/profileService.ts
const API_HOST = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const BASE_URL = `${API_HOST.replace(/\/$/, '')}/profile`;

// ========== TIPOS DA API (Response Raw) ==========
interface UserProfileApiResponse {
  id: string;
  userName: string;
  bio: string;
  avatarUrl: string;
  capaUrl: string;
  isPublic: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    name: string;
    isActive: boolean;
    role: string;
    topics: Array<{
      topicId: string;
      title: string;
      description: string;
      technologies: string[];
      createdAt: string;
      updatedAt: string;
      userId: string;
    }>;
    comments: Array<{
      id: string;
      content: string;
      createdAt: string;
      updatedAt: string;
      topicId: string;
      userId: string;
    }>;
  };
}

// ========== TIPOS NORMALIZADOS (Para UI) ==========
export interface TopicCardData {
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

export interface CommentTabData {
  topicId: string;
  comment: string;
  topicTitle: string;
  commentTime: string;
}

export interface NormalizedUserProfile {
  name: string;
  userName: string;
  userAvatar?: string;
  capa?: string;
  bio?: string;
  createdAt?: string;
  topics?: TopicCardData[];
  comments?: CommentTabData[];
}

// ========== FUNÇÃO DE NORMALIZAÇÃO ==========
function normalizeUserProfile(apiData: UserProfileApiResponse): NormalizedUserProfile {
  // Normalizar tópicos para o formato do TopicsCards
  const topics: TopicCardData[] = apiData.user.topics.map((topic) => ({
    id: topic.topicId,
    title: topic.title,
    description: topic.description,
    user: {
      name: apiData.user.name,
      avatar: apiData.avatarUrl,
    },
    time: topic.createdAt,
    answers: 0, // A API não retorna contagem de comentários por tópico
  }));

  // Normalizar comentários para o formato do CommentsTab
  const comments: CommentTabData[] = apiData.user.comments.map((comment) => {
    // Encontrar o título do tópico relacionado
    const relatedTopic = apiData.user.topics.find(
      (topic) => topic.topicId === comment.topicId
    );

    return {
      topicId: comment.topicId,
      comment: comment.content,
      topicTitle: relatedTopic?.title || 'Tópico sem título',
      commentTime: comment.createdAt,
    };
  });

  return {
    name: apiData.user.name,
    userName: apiData.userName,
    userAvatar: apiData.avatarUrl,
    capa: apiData.capaUrl,
    bio: apiData.bio,
    createdAt: apiData.createdAt,
    topics,
    comments,
  };
}

// ========== SERVICE ==========
export const profileService = {
  getUserProfile: async (username: string): Promise<NormalizedUserProfile> => {
    try {
      const res = await fetch(`${BASE_URL}/user/${username}`, {
        method: 'GET',
      });
      
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Perfil não encontrado');
        }
        throw new Error('Erro ao buscar perfil');
      }
      
      const apiData: UserProfileApiResponse = await res.json();
      
      // ✅ Retornar dados normalizados
      return normalizeUserProfile(apiData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  getAuthenticatedUserProfile: async (
    username: string, 
  ): Promise<NormalizedUserProfile> => {
    try {
      const res = await fetch(`${BASE_URL}/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!res.ok) {
        throw new Error('Erro ao buscar perfil');
      }
      
      const apiData: UserProfileApiResponse = await res.json();
      
      // ✅ Retornar dados normalizados
      return normalizeUserProfile(apiData);
    } catch (error) {
      console.error('Error fetching authenticated user profile:', error);
      throw error;
    }
  },
};