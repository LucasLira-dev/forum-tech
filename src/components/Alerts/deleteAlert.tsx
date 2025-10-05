import { FaTrash, FaExclamationTriangle } from "react-icons/fa";

interface DeleteAlertProps {
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

export const DeleteAlert = ({
  message,
  isOpen,
  onConfirm,
  onCancel,
  title = "Confirmar Exclusão",
  confirmText = "Excluir",
  cancelText = "Cancelar"
}: DeleteAlertProps) => {
  // Don't render if not open
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in-0">
      <div 
        className="fixed inset-0"
        onClick={handleBackdropClick}
      />
      
      <div className="relative bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg max-w-md w-full mx-auto animate-in zoom-in-95 slide-in-from-bottom-8">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 pb-4">
          <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              {title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-6 pt-0">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-md transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors"
          >
            <FaTrash className="w-3 h-3" />
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
