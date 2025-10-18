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
          containerClass: 'bg-green-100 dark:bg-green-800 border-green-300 dark:border-green-700',
          textClass: 'text-green-900 dark:text-green-50',
          iconClass: 'text-green-500 dark:text-green-400',
          icon: FaCheckCircle
        };
      case 'warning':
        return {
          containerClass: 'bg-yellow-100 dark:bg-yellow-800 border-yellow-300 dark:border-yellow-700',
          textClass: 'text-yellow-900 dark:text-yellow-50',
          iconClass: 'text-yellow-500 dark:text-yellow-400',
          icon: FaExclamationTriangle
        };
      case 'error':
        return {
          containerClass: 'bg-red-100 dark:bg-red-800 border-red-300 dark:border-red-700',
          textClass: 'text-red-900 dark:text-red-50',
          iconClass: 'text-red-500 dark:text-red-400',
          icon: FaTimesCircle
        };
      case 'info':
      default:
        return {
          containerClass: 'bg-blue-100 dark:bg-blue-800 border-blue-300 dark:border-blue-700',
          textClass: 'text-blue-900 dark:text-blue-50',
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