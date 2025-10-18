'use client';

import { DeleteAlert } from "@/components/Alerts";
import Avatar from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";
import { FaClock, FaEdit, FaTrash } from "react-icons/fa";

interface TopicDetailProps {
  title: string;
  description: string;
  user: {
    name: string;
    avatar?: string;
  };
  time: string;
  technologies?: string[];
  onEdit?: () => void;
  onSaveDescription?: (newDescription: string) => Promise<void> | void;
  onDelete?: () => Promise<void> | void;
  isSaving?: boolean;
  isDeleting?: boolean;
  showActions?: boolean;
}

export const TopicDetail = ({
  title,
  description,
  user,
  time,
  technologies,
  onEdit,
  onSaveDescription,
  onDelete,
  isSaving = false,
  isDeleting = false,
  showActions = false
}: TopicDetailProps) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [localSaving, setLocalSaving] = useState(false);
  const [localDeleting, setLocalDeleting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // // Função para ajustar altura do textarea baseado no conteúdo
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

  const handleSaveClick = async () => {
    if (!onSaveDescription) {
      setIsEditing(false);
      return;
    }

    const trimmed = editedDescription.trim();
    if (!trimmed || trimmed === description.trim()) {
      setIsEditing(false);
      setEditedDescription(description);
      return;
    }

    setSaveError(null);
    setLocalSaving(true);

    try {
      await onSaveDescription(trimmed);
      setEditedDescription(trimmed);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating topic:', error);
      setSaveError('Não foi possível salvar as alterações. Tente novamente.');
    } finally {
      setLocalSaving(false);
    }
  };

  const handleDeleteClick = () => {
    setDeleteError(null);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!onDelete || localDeleting) {
      return;
    }

    setDeleteError(null);
    setLocalDeleting(true);

    try {
      await onDelete();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting topic:', error);
      setDeleteError('Não foi possível excluir o tópico. Tente novamente.');
    } finally {
      setLocalDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    if (localDeleting) {
      return;
    }
    setShowDeleteModal(false);
  };

  // Quando entra em modo de edição, ajusta a altura
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      // Pequeno delay para garantir que o textarea foi renderizado
      setTimeout(() => {
        adjustTextareaHeight();
        textareaRef.current?.focus();
      }, 10);
    }
  }, [isEditing]);

  useEffect(() => {
    setEditedDescription(description);
  }, [description]);

  return (
    <article className="w-full bg-[var(--card)] text-[var(--card-foreground)] rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>
      <div className="flex gap-4 text-[var(--muted-foreground)] text-sm">
        <div className="flex items-center gap-2">
          <Avatar src={user.avatar} alt="Usuário" size="sm" />
          <span className="font-medium">{user.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaClock size={12} />
          {formatRelativeTime(time)}
        </div>
      </div>

      {showActions && (
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-[var(--border)]">
          <button
            onClick={() => {
              onEdit?.();
              setIsEditing(true);
              setSaveError(null);
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--muted)] rounded-md transition-colors duration-200"
            title="Editar tópico"
          >
            <FaEdit size={14} />
          </button>
          
          <button
            onClick={handleDeleteClick}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200"
            title="Excluir tópico"
            disabled={isDeleting || localDeleting}
          >
            <FaTrash size={14} />
          </button>
        </div>
      )}

      <div>
        { technologies && (
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="bg-[var(--muted)] text-[var(--accent-foreground)] rounded-full px-3 py-1 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-6">
          <textarea
            ref={textareaRef}
            className="w-full box-border p-3 border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] resize-none outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent overflow-hidden min-h-[150px]"
            value={editedDescription}
            onChange={(e) => {
              setEditedDescription(e.target.value);
              adjustTextareaHeight();
            }}
            onInput={adjustTextareaHeight}
            style={{
              fontFamily: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit'
            }}
          />
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-[var(--border)]">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedDescription(description); 
              }}
              className="px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] rounded-md transition-colors"
              disabled={localSaving || isSaving}
            >
              Cancelar
            </button>
            <button 
              onClick={handleSaveClick}
              className="px-4 py-2 text-sm font-bold bg-[var(--primary)] text-[var(--secondary)] hover:brightness-110 rounded-md transition-colors"
              disabled={localSaving || isSaving || editedDescription.trim() === description.trim()}
            >
              {localSaving || isSaving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
          {saveError && (
            <p className="mt-2 text-sm text-red-500">{saveError}</p>
          )}
        </div>
      ): (
        <p
          ref={descriptionRef}
          className="mt-6 text-[var(--muted-foreground)] leading-relaxed"
        >
          {description}
        </p>
      )}

      <DeleteAlert
        message={deleteError ?? 'Tem certeza que deseja excluir este tópico? Esta ação não pode ser desfeita.'}
        isOpen={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Confirmar Exclusão"
        confirmText={localDeleting || isDeleting ? 'Excluindo...' : 'Excluir'}
        cancelText="Cancelar"
      />
 
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
