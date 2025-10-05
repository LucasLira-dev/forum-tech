'use client';

import { DeleteAlert } from "@/components/Alerts";
import Avatar from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";
import { FaClock, FaEdit, FaTrash } from "react-icons/fa";

interface TopicDetailProps {
//   id: string;
  title: string;
  description: string;
  user: {
    name: string;
    avatar?: string;
  };
  time: string;
  technologies?: string[];
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export const TopicDetail = ({
  title,
  description,
  user,
  time,
  technologies,
  onEdit,
  onDelete,
  showActions = false
}: TopicDetailProps) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // Função para ajustar altura do textarea baseado no conteúdo
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    if (onDelete) {
      onDelete(); // Callback para a página pai
    }
  };

  const handleCancelDelete = () => {
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

  return (
    <article className="bg-[var(--card)] text-[var(--card-foreground)] rounded-lg p-6 shadow-md">
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
          {time} atrás
        </div>
      </div>

      {showActions && (
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-[var(--border)]">
          <button
            onClick={() => { if (onEdit) onEdit(); setIsEditing(true); }}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--muted)] rounded-md transition-colors duration-200"
            title="Editar tópico"
          >
            <FaEdit size={14} />
          </button>
          
          <button
            onClick={handleDeleteClick}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200"
            title="Excluir tópico"
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
            className="w-full p-2 border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] resize-none outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent overflow-hidden"
            value={editedDescription}
            onChange={(e) => {
              setEditedDescription(e.target.value);
              adjustTextareaHeight();
            }}
            onInput={adjustTextareaHeight}
            style={{
              minHeight: '1.5rem',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit'
            }}
          />
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-[var(--border)]">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedDescription(description); // Restaura valor original
              }}
              className="px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={() => {
                // Aqui você salvaria as mudanças
                console.log("Salvando:", editedDescription);
                setIsEditing(false);
              }}
              className="px-4 py-2 text-sm font-bold bg-[var(--primary)] text-[var(--secondary)] hover:brightness-110 rounded-md transition-colors"
            >
              Salvar
            </button>
          </div>
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
        message="Tem certeza que deseja excluir este tópico? Esta ação não pode ser desfeita."
        isOpen={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Confirmar Exclusão"
        confirmText="Excluir"
        cancelText="Cancelar"
      />
 
    </article>
  );
};
