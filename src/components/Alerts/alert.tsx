import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

export type AlertType = 'success' | 'warning' | 'info' | 'error';

interface AlertProps {
  message: string;
  type?: AlertType;
  isVisible?: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  showCloseButton?: boolean;
}

export const Alert = ({
  message,
  type = 'info',
  isVisible = true,
  onClose,
  autoClose = false,
  autoCloseDelay = 5000,
  showCloseButton = true
}: AlertProps) => {
  const [visible, setVisible] = useState(isVisible);

  // Auto close functionality
  useEffect(() => {
    if (autoClose && visible) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, visible]);

  // Update visibility when prop changes
  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  // Don't render if not visible
  if (!visible) return null;

  // Get styles and icon based on type
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          containerClass: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
          textClass: 'text-green-800 dark:text-green-200',
          iconClass: 'text-green-500 dark:text-green-400',
          icon: FaCheckCircle
        };
      case 'warning':
        return {
          containerClass: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
          textClass: 'text-yellow-800 dark:text-yellow-200',
          iconClass: 'text-yellow-500 dark:text-yellow-400',
          icon: FaExclamationTriangle
        };
      case 'error':
        return {
          containerClass: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
          textClass: 'text-red-800 dark:text-red-200',
          iconClass: 'text-red-500 dark:text-red-400',
          icon: FaTimesCircle
        };
      case 'info':
      default:
        return {
          containerClass: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
          textClass: 'text-blue-800 dark:text-blue-200',
          iconClass: 'text-blue-500 dark:text-blue-400',
          icon: FaInfoCircle
        };
    }
  };

  const { containerClass, textClass, iconClass, icon: IconComponent } = getAlertStyles();

  return (
    <div className={`relative flex items-start gap-3 p-4 border rounded-lg shadow-sm ${containerClass} transition-all duration-300 animate-in slide-in-from-top-2`}>
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        <IconComponent className={`w-5 h-5 ${iconClass}`} />
      </div>

      {/* Message */}
      <div className={`flex-grow text-sm font-medium ${textClass} leading-relaxed`}>
        {message}
      </div>

      {/* Close Button */}
      {showCloseButton && (
        <button
          onClick={handleClose}
          className={`flex-shrink-0 ml-2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${textClass}`}
          aria-label="Fechar alerta"
        >
          <FaTimes className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};