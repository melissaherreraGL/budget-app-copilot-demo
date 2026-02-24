import type { ReactNode } from "react";


interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onMouseDown={onClose}
        aria-hidden="true"
        data-testid="modal-overlay"
      />

      {/* Container */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        data-testid="modal-container"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 border-b border-slate-200 px-6 py-4 flex justify-between items-center bg-white">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              type="button"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    </>
  );
}
