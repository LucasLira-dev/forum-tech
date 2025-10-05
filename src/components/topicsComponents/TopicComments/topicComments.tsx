import Avatar from "@/components/ui/avatar";
import { FaClock, FaEdit, FaTrash, FaEllipsisV, FaCheck, FaTimes } from "react-icons/fa";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState, useRef, useEffect } from "react";
import { DeleteAlert } from "@/components/Alerts";

interface TopicCommentsProps {
    userName: string;
    userAvatarUrl: string;
    commentText: string;
    commentTime: string;
    onEdit?: () => void;
    onDelete?: () => void;
    onSave?: (newText: string) => void;
    showActions?: boolean;
}

export const TopicComments = ({ 
  userName, 
  userAvatarUrl, 
  commentText, 
  commentTime, 
  onEdit, 
  onDelete,
  onSave,
  showActions = false 
}: TopicCommentsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(commentText);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Função para ajustar altura do textarea
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
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
    if (onEdit) onEdit();
  };

  const handleSave = () => {
    if (onSave && editedText.trim()) {
      onSave(editedText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(commentText);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    if (onDelete) onDelete();
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

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
              {commentTime} atrás
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
                adjustTextareaHeight();
              }}
              className="w-full p-2 border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] resize-none outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              style={{
                minHeight: '60px',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                lineHeight: '1.5',
                overflow: 'hidden'
              }}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-md transition-colors"
              >
                <FaTimes size={12} />
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={!editedText.trim() || editedText.trim() === commentText}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-[var(--primary)] text-[var(--secondary)] hover:brightness-110 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaCheck size={12} />
                Salvar
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
