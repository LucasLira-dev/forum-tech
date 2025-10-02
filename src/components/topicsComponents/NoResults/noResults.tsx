import { FaSearch, FaPlus, FaExclamationTriangle } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";

interface NoResultsProps {
  searchTerm?: string;
  onCreateTopic?: () => void;
}

export const NoResults = ({ searchTerm, onCreateTopic }: NoResultsProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Ícone principal */}
      <div className="mb-6 p-4 rounded-full bg-[var(--muted)] opacity-50">
        <BiSearchAlt size={48} className="text-[var(--muted-foreground)]" />
      </div>

      {/* Título */}
      <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-3">
        Nenhum tópico encontrado
      </h3>

      {/* Mensagem personalizada baseada na pesquisa */}
      <div className="mb-6 space-y-2">
        {searchTerm ? (
          <>
            <p className="text-[var(--muted-foreground)] text-lg">
              Não encontramos resultados para <span className="font-medium text-[var(--foreground)]">{searchTerm}</span>
            </p>
            <p className="text-[var(--muted-foreground)] text-sm max-w-md mx-auto">
              Tente usar palavras-chave diferentes ou seja o primeiro a criar um tópico sobre este assunto!
            </p>
          </>
        ) : (
          <p className="text-[var(--muted-foreground)] text-lg max-w-md mx-auto">
            Ainda não há tópicos criados. Que tal ser o primeiro a iniciar uma discussão?
          </p>
        )}
      </div>

      {/* Sugestões */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 max-w-md w-full mb-6">
        <h4 className="font-medium text-[var(--card-foreground)] mb-3 flex items-center gap-2">
          <FaExclamationTriangle size={16} className="text-[var(--ring)]" />
          Sugestões:
        </h4>
        <ul className="text-sm text-[var(--muted-foreground)] space-y-2 text-left">
          <li>• Verifique a ortografia das palavras-chave</li>
          <li>• Use termos mais gerais na busca</li>
          <li>• Tente sinônimos ou termos relacionados</li>
          <li>• Crie um novo tópico sobre o assunto</li>
        </ul>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <button
          onClick={onCreateTopic}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md hover:brightness-110 transition-all font-medium"
        >
          <FaPlus size={14} />
          Criar Tópico
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-[var(--border)] text-[var(--foreground)] rounded-md hover:bg-[var(--muted)] transition-all"
        >
          <FaSearch size={14} />
          Ver Todos
        </button>
      </div>

      {/* Estatística motivacional */}
      <div className="mt-8 text-xs text-[var(--muted-foreground)]">
        💡 Dica: Os melhores tópicos começam com perguntas interessantes!
      </div>
    </div>
  );
};

export default NoResults;