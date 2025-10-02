import { FaArrowRight } from "react-icons/fa";

export const CtaSection = () => {
    return(
        <article className="bg-[var(--secondary)] text-[var(--primary-foreground)] rounded-lg p-8 flex flex-col items-center justify-center gap-6">
           <h2
           className="text-3xl sm:text-4xl md:text-5xl lg:6xl  text-center font-bold mb-2 text-[var(--foreground)]">
            Pronto para fazer parte da comunidade?
           </h2> 
           <p
           className="text-[var(--muted-foreground)] text-[16px] text-center">
            Junte-se a nós e aproveite todos os benefícios de ser um membro da nossa comunidade!
           </p> 
           <div
           className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
            className="bg-[var(--primary)] text-[var(--foreground)] px-6 py-3 rounded-md hover:bg-[var(--connectSection)] hover:text-[var(--foreground)] transition-colors cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[200px]">
                Criar primeiro tópico
                <FaArrowRight className="inline ml-2" />
            </button>
            <button
            className="bg-[var(--background)] text-[var(--foreground)] px-6 py-3 rounded-md hover:bg-transparent hover:text-[var(--foreground)] transition-colors cursor-pointer w-full sm:w-auto sm:min-w-[200px] border border-[var(--border)]">
                Explorar comunidade
            </button>
           </div>   
        </article>
    )
}