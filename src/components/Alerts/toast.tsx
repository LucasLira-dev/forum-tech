import { Alert, AlertType } from './alert';
import { useState, useEffect } from 'react';

interface ToastNotification {
  id: string;
  message: string;
  type: AlertType;
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastNotification[];
  onRemoveToast: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const ToastContainer = ({
  toasts,
  onRemoveToast,
  position = 'top-right'
}: ToastContainerProps) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className={`fixed z-50 space-y-2 w-96 max-w-sm ${getPositionClasses()}`}>
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