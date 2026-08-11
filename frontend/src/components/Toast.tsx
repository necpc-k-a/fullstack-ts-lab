import React, { useEffect, useRef } from 'react';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string | null;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  // タイプに応じた背景色、枠線、アイコンの切り替え
  const isError = type === 'error';
  const bgColor = isError ? 'bg-red-600' : 'bg-slate-800';
  const icon = isError ? '⚠️' : '✓';

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-bounce-short">
      <div
        className={`${bgColor} text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center space-x-2 text-sm font-medium transition-all duration-200`}
      >
        <span>{icon}</span>
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-white/70 hover:text-white transition-colors text-xs font-bold px-1"
          aria-label="閉じる"
        >
          ✕
        </button>
      </div>
    </div>
  );
};