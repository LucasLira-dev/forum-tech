import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

interface BanReasonAlertProps {
  isOpen: boolean;
  type: "ban" | "unban";
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const BanReasonAlert = ({
  isOpen,
  type,
  onConfirm,
  onCancel,
  isLoading = false,
}: BanReasonAlertProps) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in-0" onClick={handleBackdropClick}>
      <div className="relative bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg max-w-md w-full mx-auto animate-in zoom-in-95 slide-in-from-bottom-8">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 pb-4">
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${type === "ban" ? "bg-red-100 dark:bg-red-900/30" : "bg-green-100 dark:bg-green-900/30"}`}>
            {type === "ban" ? (
              <FaUserPlus className="w-5 h-5 text-red-600 dark:text-red-400" />
            ) : (
              <FaUserCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              {type === "ban" ? "Banir Usuário" : "Desbanir Usuário"}
            </h3>
          </div>
        </div>

        {/* Motivo */}
        <div className="px-6 pb-2">
          <label htmlFor="ban-reason" className="block text-sm font-medium text-[var(--muted-foreground)] mb-1">
            Motivo
          </label>
          <textarea
            id="ban-reason"
            className="w-full border border-[var(--border)] rounded-md p-2 text-sm bg-[var(--input)] text-[var(--foreground)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            rows={3}
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder={type === "ban" ? "Descreva o motivo do banimento..." : "Descreva o motivo do desbanimento..."}
            disabled={isLoading}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-6 pt-0">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-md transition-colors"
            disabled={isLoading}
          >
            <FaTimes className="w-3 h-3 inline mr-1" />
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(reason)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${type === "ban" ? "bg-red-600 text-white hover:bg-red-700" : "bg-green-600 text-white hover:bg-green-700"}`}
            disabled={isLoading || reason.trim().length === 0}
          >
            {type === "ban" ? <FaUserPlus className="w-3 h-3" /> : <FaUserCheck className="w-3 h-3" />}
            {type === "ban" ? "Banir" : "Desbanir"}
            {isLoading && <span className="ml-2 animate-pulse">...</span>}
          </button>
        </div>
      </div>
    </div>
  );
};