'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { topicsService } from '@/services/topicsService';
import { ToastContainer, useToast } from '@/components/Alerts';


type ApiTopic = {
  topicId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  commentCount?: number | null;
  user?: {
    profile?: {
      avatarUrl?: string | null;
      userName?: string | null;
    };
    name?: string | null;
  } | null;
};


export interface Topic {
    topicId: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    commentCount: number;
    userAvatarUrl?: string;
    userName: string;
}

interface TopicsContextType {
    topics: Topic[];
    setTopics: (topics: Topic[]) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    technologies: string[];
    setTechnologies: (technologies: string[]) => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    searchTopics: () => Promise<void>;
    resetSearch: () => Promise<void>;
    createTopic: () => Promise<void>;
}

const TopicsContext = createContext<TopicsContextType | undefined>(undefined);

interface TopicsProviderProps {
    children: ReactNode;
}

const extractTopicsFromResponse = (response: unknown): ApiTopic[] => {
    if (Array.isArray(response)) {
        return response as ApiTopic[];
    }

    if (response && typeof response === 'object') {
        const maybeData = (response as { data?: unknown }).data;
        if (Array.isArray(maybeData)) {
            return maybeData as ApiTopic[];
        }
    }

    return [];
};

const normalizeTopics = (rawTopics: ApiTopic[]): Topic[] =>
    rawTopics.map((topic) => ({
        topicId: topic.topicId,
        title: topic.title,
        description: topic.description,
        createdAt: topic.createdAt,
        updatedAt: topic.updatedAt,
        commentCount: topic.commentCount ?? 0,
        userAvatarUrl: topic.user?.profile?.avatarUrl ?? undefined,
        userName: topic.user?.profile?.userName ?? topic.user?.name ?? '',
    }));

export const TopicsProvider = ({ children }: TopicsProviderProps) => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: session } = useSession();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { toasts, removeToast, success: showSuccessToast, error: showErrorToast } = useToast();

    const fetchAllTopics = useCallback(async ()=> {
        try {
            setIsLoading(true);
            const res = await topicsService.getAllTopics();
            const normalized = normalizeTopics(extractTopicsFromResponse(res));
            setTopics(normalized);
        }
        catch(error) {
            console.log(error)
            setTopics([]);
        }
        finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        fetchAllTopics();
    }, [fetchAllTopics]);

    const searchTopics = useCallback(async () => {
        const query = searchTerm.trim();

        if (!query) {
            await fetchAllTopics();
            return;
        }

        try {
            setIsLoading(true);
            const res = await topicsService.searchTopics(query);
            const normalized = normalizeTopics(extractTopicsFromResponse(res));

            if (normalized.length === 0) {
                showErrorToast("Nenhum tópico encontrado, exibindo todos.");
                const allRes = await topicsService.getAllTopics();
                setTopics(normalizeTopics(extractTopicsFromResponse(allRes)));
                return;
            }

            setTopics(normalized);
        }
        catch (error) {
            console.log(error);
            showErrorToast("Erro ao buscar tópicos");
            const allRes = await topicsService.getAllTopics();
            setTopics(normalizeTopics(extractTopicsFromResponse(allRes)));
        }
        finally {
            setIsLoading(false);
        }
    }, [ searchTerm, showErrorToast, fetchAllTopics]);

    const resetSearch = useCallback(async () => {
        setSearchTerm('');
        await fetchAllTopics();
    }, [fetchAllTopics]);



    const createTopic = useCallback(async () => {
        if (!session?.accessToken) {
            console.error("No access token available");
            return;
        }

        try {
            setIsLoading(true);
            await topicsService.createTopic(session.accessToken, {
                title,
                description,
                technologies
            });
            showSuccessToast("Tópico criado com sucesso!");
        }

        catch (error) {
            console.log(error)
            showErrorToast("Erro ao criar tópico");
        }
        finally {
            setIsLoading(false);
            setTitle('');
            setDescription('');
            setTechnologies([]);
        }
    }, [session?.accessToken, title, description, technologies, showErrorToast, showSuccessToast]);

    return (
        <>
            <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
            <TopicsContext.Provider value={{ topics, setTopics, isLoading, setIsLoading, title, setTitle, description, setDescription, technologies, setTechnologies, searchTerm, setSearchTerm, searchTopics, resetSearch, createTopic }}>
                {children}
            </TopicsContext.Provider>
        </>
    );
};

export const useTopics = () => {
    const context = useContext(TopicsContext);
    if (!context) {
        throw new Error("useTopics must be used within a TopicsProvider");
    }
    return context;
}