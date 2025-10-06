'use client'

import { useState } from "react";
import { FaPlus, FaTimes, FaPaperPlane } from "react-icons/fa";

export default function CreateTopicPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");

    const isAllTags = tags.length >= 5;

    const addTag = () => {
        if (tagInput.trim() && !isAllTags) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const removeTag = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Criando tópico:", { title, content, tags });
        // Aqui você faria a integração com API
    };

    return(
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
            <section className="flex-1 py-8 pt-28">
                <div className="max-w-4xl mx-auto px-6 sm:px-8">
                    <form onSubmit={handleSubmit} className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-6 md:p-8 space-y-6">
                        <div className="space-y-2 pb-4 border-b border-[var(--border)]">
                            <h1 className="block text-sm font-semibold text-[var(--foreground)]">
                                Criar Novo Tópico
                            </h1>
                            <p className="text-[var(--muted-foreground)] text-sm">
                                Compartilhe suas ideias e inicie uma discussão com a comunidade tech
                            </p>
                        </div>

                        {/* Título */}
                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-sm font-semibold text-[var(--foreground)]">
                                Título do Tópico
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-4 border border-[var(--border)] rounded-lg bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                                placeholder="Ex: Como otimizar performance em React?"
                                required
                            />
                        </div>

                        {/* Conteúdo */}
                        <div className="space-y-2">
                            <label htmlFor="content" className="block text-sm font-semibold text-[var(--foreground)]">
                                Descrição
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={8}
                                className="w-full p-4 border border-[var(--border)] rounded-lg bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all resize-none"
                                placeholder="Descreva sua dúvida ou compartilhe seu conhecimento com a comunidade..."
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="tags" className="block text-sm font-semibold text-[var(--foreground)]">
                                Tags (opcional)
                            </label>
                            
                            <div className="flex gap-2">
                                <input
                                    id="tags"
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addTag();
                                        }
                                    }}
                                    placeholder="Ex: React, JavaScript, Performance..."
                                    className="flex-1 px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                                    disabled={isAllTags}
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addTag();
                                    }}
                                    className="flex items-center gap-2 bg-[var(--primary)] hover:bg-purple-600 text-[var(--primary-foreground)] px-4 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaPlus size={14} />
                                    <span
                                    className="hidden sm:block">
                                        Adicionar
                                    </span>
                                </button>
                            </div>

                            {/* Tags Display */}
                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="flex items-center gap-2 bg-[var(--muted)] text-[var(--foreground)] rounded-full px-3 py-1 text-sm font-medium border border-[var(--border)]"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(index)}
                                                className="text-[var(--muted-foreground)] hover:text-red-500 transition-colors"
                                            >
                                                <FaTimes size={10} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}

                            <p className="text-[var(--muted-foreground)] text-xs">
                                Máximo de 5 tags • {5 - tags.length} restantes
                            </p>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={!title.trim() || !content.trim()}
                                className="flex items-center gap-2 bg-[var(--primary)] hover:bg-purple-600 text-[var(--primary-foreground)] px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaPaperPlane size={14} />
                                Publicar Tópico
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}