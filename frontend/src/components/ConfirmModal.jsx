import React from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Employee',
  message,
  employeeName,
  isSubmitting,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-card-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="danger-icon-wrapper">
            <AlertTriangle size={24} className="text-danger" />
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body text-center">
          <h3 className="modal-title">{title}</h3>
          <p className="modal-subtitle">
            {message || (
              <>
                Are you sure you want to delete <strong>{employeeName}</strong>? This action cannot be undone.
              </>
            )}
          </p>
        </div>

        <div className="modal-footer modal-footer-center">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 size={18} />
                <span>Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
