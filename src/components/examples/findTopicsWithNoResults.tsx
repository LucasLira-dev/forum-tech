'use client'

import { useState } from "react";
import { FaSearch } from "react-icons/fa"
import { TopicsCards } from "@/components/topicsComponents/TopicsCards/topicsCards"
import NoResults from "@/components/topicsComponents/NoResults/noResults";

export const FindTopics = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [hasResults, setHasResults] = useState(true); // Simula se há resultados
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = () => {
        setIsSearching(true);
        
        // Simula uma busca (substitua pela sua lógica real)
        setTimeout(() => {
            // Aqui você faria a busca real e verificaria se há resultados
            const mockResults = searchTerm.toLowerCase().includes("react") || 
                               searchTerm.toLowerCase().includes("javascript") ||
                               searchTerm === "";
            
            setHasResults(mockResults);
            setIsSearching(false);
        }, 500);
    };

    const handleCreateTopic = () => {
        // Redirecionar para página de criação ou abrir modal
        console.log("Criar novo tópico");
    };

    return(
        <article className="flex flex-col">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-[var(--muted-foreground)] text-sm" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Buscar tópicos..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="w-full pl-10 pr-4 py-2 border border-[var(--border)] rounded-md bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors" 
                    />
                </div>
                <button 
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="px-4 py-2 bg-transparent border-1 border-[var(--border)] text-[var(--muted-foreground)] rounded-md hover:bg-[var(--connectSection)] hover:text-[var(--foreground)] transition whitespace-nowrap cursor-pointer disabled:opacity-50"
                >
                    {isSearching ? "Buscando..." : "Buscar"}
                </button>
            </div>

            <div className="flex flex-col mt-4">
                {isSearching ? (
                    <div className="flex justify-center py-8">
                        <div className="text-[var(--muted-foreground)]">Buscando tópicos...</div>
                    </div>
                ) : hasResults ? (
                    <>
                        <TopicsCards />
                        <TopicsCards />
                        <TopicsCards />
                    </>
                ) : (
                    <NoResults 
                        searchTerm={searchTerm} 
                        onCreateTopic={handleCreateTopic}
                    />
                )}
            </div>
        </article>
    );
};