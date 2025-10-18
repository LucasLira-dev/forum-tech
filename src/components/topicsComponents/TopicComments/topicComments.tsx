import Avatar from "@/components/ui/avatar";
import { FaClock, FaEdit, FaTrash, FaEllipsisV, FaCheck, FaTimes } from "react-icons/fa";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState, useRef, useEffect } from "react";
import { DeleteAlert } from "@/components/Alerts";

interface TopicCommentsProps {
  userName: string;
  userAvatarUrl?: string;
  commentText: string;
  commentTime: string;
  onSave?: (newText: string) => Promise<void>;
  onDelete?: () => Promise<void>;
  showActions?: boolean;
}

export const TopicComments = ({ 
  userName, 
  userAvatarUrl, 
  commentText, 
  commentTime, 
  onSave,
  onDelete,
  showActions = false 
}: TopicCommentsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(commentText);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Função para ajustar altura do textarea
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      // Salvar o scrollHeight antes de modificar a altura
      const scrollHeight = textareaRef.current.scrollHeight;
      
      // Só ajustar se necessário para evitar layout shift
      if (textareaRef.current.style.height !== `${scrollHeight}px`) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${scrollHeight}px`;
      }
    }
  };

  // Ajusta altura quando entra em modo de edição
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      setTimeout(() => {
        adjustTextareaHeight();
        textareaRef.current?.focus();
      }, 10);
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(commentText);
    setErrorMessage("");
  };

  const handleSave = async () => {
    if (!editedText.trim()) {
      setErrorMessage("O comentário não pode estar vazio.");
      return;
    }

    if (editedText.trim() === commentText) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    try {
      if (onSave) {
        await onSave(editedText.trim());
      }
      setIsEditing(false);
    } catch (error) {
      setErrorMessage("Erro ao salvar o comentário. Tente novamente.");
      console.error("Error saving comment:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedText(commentText);
    setErrorMessage("");
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (onDelete) {
        await onDelete();
      }
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const formattedTime = formatRelativeTime(commentTime);

  return (
    <article className="flex flex-col rounded-lg shadow-md">
      <div className="flex flex-col p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--muted-foreground)]">
        <div className="flex justify-between items-start">
          <div className="flex gap-4 text-[var(--muted-foreground)] text-sm">
            <div className="flex items-center gap-2">
              <Avatar src={userAvatarUrl} alt="Usuário" size="sm" />
              <span className="font-medium">{userName}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaClock size={12} />
              {formattedTime}
            </div>
          </div>

          {showActions && (
            <DropdownMenu.Root modal={false}>
              <DropdownMenu.Trigger asChild>
                <button 
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[var(--muted)] transition-colors duration-200 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  aria-label="Opções do comentário"
                >
                  <FaEllipsisV size={12} />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content 
                  className="min-w-[160px] bg-[var(--card)] border border-[var(--border)] rounded-md shadow-lg z-50 p-1"
                  sideOffset={5}
                  align="end"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <DropdownMenu.Item 
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-sm cursor-pointer hover:bg-[var(--muted)] hover:outline-none text-[var(--foreground)]"
                    onClick={handleEdit}
                  >
                    <FaEdit size={12} />
                    Editar comentário
                  </DropdownMenu.Item>
                  
                  <DropdownMenu.Separator className="h-px bg-[var(--border)] my-1" />
                  
                  <DropdownMenu.Item 
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-sm cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 hover:outline-none text-red-600 dark:text-red-400"
                    onClick={handleDeleteClick}
                  >
                    <FaTrash size={12} />
                    Excluir comentário
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}
        </div>

        {isEditing ? (
          <div className="mt-4">
            <textarea
              ref={textareaRef}
              value={editedText}
              onChange={(e) => {
                setEditedText(e.target.value);
                setErrorMessage("");
                adjustTextareaHeight();
              }}
              className="w-full box-border p-3 border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] resize-none outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent min-h-[100px]"
              style={{
                fontFamily: 'inherit',
                fontSize: 'inherit',
                lineHeight: '1.5',
                overflow: 'hidden'
              }}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaTimes size={12} />
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || !editedText.trim() || editedText.trim() === commentText}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-[var(--primary)] text-[var(--secondary)] hover:brightness-110 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaCheck size={12} />
                {isSaving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
            {commentText}
          </p>
        )}
      </div>

      {showDeleteModal && (
        <DeleteAlert
          message="Tem certeza que deseja excluir este comentário? Esta ação não pode ser desfeita."
          isOpen={showDeleteModal}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          confirmText="Excluir"
          title="Confirmar Exclusão"
          cancelText="Cancelar"
        />
      )}
    </article>
  );
};

const MINUTE_IN_MS = 60 * 1000;
const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const DATE_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

function formatRelativeTime(rawTime: string) {
  const parsedDate = new Date(rawTime);
  if (Number.isNaN(parsedDate.getTime())) {
    return rawTime;
  }

  const now = Date.now();
  const diffInMs = Math.max(0, now - parsedDate.getTime());

  if (diffInMs >= DAY_IN_MS) {
    return DATE_FORMATTER.format(parsedDate);
  }

  if (diffInMs < MINUTE_IN_MS) {
    return "há instantes";
  }

  if (diffInMs < HOUR_IN_MS) {
    const minutes = Math.floor(diffInMs / MINUTE_IN_MS);
    return `há ${minutes} min`;
  }

  const hours = Math.floor(diffInMs / HOUR_IN_MS);
  return `há ${hours} h`;
}
