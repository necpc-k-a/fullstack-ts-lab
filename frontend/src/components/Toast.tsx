import React, { useEffect, useRef } from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {

  const timeRef = useRef<NodeJS.Timeout | null>(null);

  // タイマー開始処理
  const startTimer = () => {
    clearTimer();
    timeRef.current = setTimeout(() => {
      onClose();
    }, 3000);
  };

  // タイマークリア処理
  const clearTimer = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
    }
  };

  useEffect(() => {
    if (message) {
      startTimer();
    }
    return () => clearTimer();
  }, [message]);

  if (!message) return null;

  return (
    <div
      onMouseEnter={clearTimer} // マウスが乗ったらタイマー停止
      onMouseLeave={startTimer} // マウスが離れたら3秒タイマー開始
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center bg-slate-800 text-white px-5 py-3 rounded-lg shadow-xl border border-slate-700 transition-all duration-300 transform scale-100 max-w-md w-11/12 md:w-auto"
    >
      {/* チェックマークアイコン */}
      <svg
        className="w-5 h-5 text-green-400 mr-2 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span className="text-sm font-medium">{message}</span>

      <button
        onClick={onClose}
        type="button"
        className="ml-auto text-slate-400 hover:text-white hover:bg-slate-700 p-1 rounded-md transition-colors focus:outline-none"
        aria-label="閉じる"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};