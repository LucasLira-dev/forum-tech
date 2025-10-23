'use client';

import { FormEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { TopicsCards } from "../TopicsCards/topicsCards";
import { useTopics } from "@/contexts/TopicsContext";
import { TopicsSkeleton } from "@/components/Skeletons/topicsSkeleton";

export const FindTopics = () => {
    const {
        topics,
        isLoading,
        searchTerm,
        setSearchTerm,
        searchTopics,
        resetSearch,
    } = useTopics();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await searchTopics();
    };

    return (
      <article className="flex flex-col">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-[var(--muted-foreground)] text-sm" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar tópicos..."
              className="w-full pl-10 pr-4 py-2 border border-[var(--border)] rounded-md bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-transparent border-1 border-[var(--border)] text-[var(--muted-foreground)] rounded-md hover:bg-[var(--connectSection)] hover:text-[var(--foreground)] transition whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Buscar
          </button>
          {searchTerm && (
            <button
              type="button"
              onClick={resetSearch}
              className="px-4 py-2 bg-transparent border-1 border-[var(--border)] text-[var(--muted-foreground)] rounded-md hover:bg-[var(--connectSection)] hover:text-[var(--foreground)] transition whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Limpar
            </button>
          )}
        </form>

        <div className="flex flex-col mt-4">
          {isLoading ? (
            <div className="text-[var(--muted-foreground)] text-center mt-10">
              <TopicsSkeleton count={4} />
            </div>
          ) : topics.length === 0 ? (
            <p className="text-[var(--muted-foreground)] text-center mt-10">
              Nenhum tópico encontrado.
            </p>
          ) : (
            topics.map((topic, index) => (
              <TopicsCards
                key={index}
                id={topic.topicId}
                title={topic.title}
                description={topic.description}
                user={{
                  name: topic.userName,
                  avatar: topic.userAvatarUrl,
                }}
                time={topic.createdAt}
                answers={topic.commentCount}
              />
            ))
          )}
        </div>
      </article>
    );
}