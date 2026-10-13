import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const { type = 'info', message } = toast;

  const icons = {
    success: <CheckCircle2 size={20} className="toast-icon text-success" />,
    error: <AlertCircle size={20} className="toast-icon text-danger" />,
    info: <Info size={20} className="toast-icon text-info" />,
  };

  return (
    <div className={`toast-container toast-${type}`} role="alert">
      <div className="toast-content">
        {icons[type]}
        <span className="toast-message">{message}</span>
      </div>
      <button
        type="button"
        className="toast-close-btn"
        onClick={onClose}
        aria-label="Dismiss alert"
      >
        <X size={16} />
      </button>
    </div>
  );
}
