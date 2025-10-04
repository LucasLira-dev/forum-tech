import { FaCommentSlash, FaRegLightbulb } from "react-icons/fa";

export const NoComments = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center border border-[var(--border)] rounded-lg bg-[var(--card)] min-h-[200px]">
            <div className="mb-4 text-[var(--muted-foreground)]">
                <FaCommentSlash className="text-6xl mx-auto mb-3 opacity-50" />
            </div>
            
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                Ainda não há comentários
            </h3>
            
            <p className="text-[var(--muted-foreground)] mb-4 max-w-md leading-relaxed">
                Seja o primeiro a compartilhar sua opinião sobre este tópico! 
                Sua contribuição pode ajudar outros desenvolvedores.
            </p>
            
            <div className="flex items-center gap-2 text-[var(--primary)] text-sm">
                <FaRegLightbulb className="text-base" />
                <span className="font-medium">Clique em &quot;Comentar&quot; para começar a discussão</span>
            </div>
        </div>
    );
};
