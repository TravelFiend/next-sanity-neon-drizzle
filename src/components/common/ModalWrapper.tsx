'use client';

import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type ModalWrapperProps = {
  children: ReactNode;
  onClose?: () => void;
};

const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />

      <div className="relative z-10 w-full max-w-xl rounded-xl bg-primary p-6 shadow-lg">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalWrapper;
