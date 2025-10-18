import { Alert, AlertType } from './alert';
import { useState } from 'react';

interface ToastNotification {
  id: string;
  message: string;
  type: AlertType;
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastNotification[];
  onRemoveToast: (id: string) => void;
}

export const ToastContainer = ({
  toasts,
  onRemoveToast
}: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 space-y-3 w-full max-w-md px-4">
      {toasts.map((toast) => (
        <Alert
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => onRemoveToast(toast.id)}
          autoClose={true}
          autoCloseDelay={toast.duration || 5000}
          showCloseButton={true}
        />
      ))}
    </div>
  );
};

// Hook para gerenciar toasts
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = (message: string, type: AlertType = 'info', duration = 5000) => {
    const id = Date.now().toString();
    const newToast: ToastNotification = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  // Helper methods
  const success = (message: string, duration?: number) => addToast(message, 'success', duration);
  const error = (message: string, duration?: number) => addToast(message, 'error', duration);
  const warning = (message: string, duration?: number) => addToast(message, 'warning', duration);
  const info = (message: string, duration?: number) => addToast(message, 'info', duration);

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info
  };
};