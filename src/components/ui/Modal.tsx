import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg p-4 mx-auto animate-in zoom-in-95 duration-200">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-xl shadow-xl dark:bg-slate-900 outline-none focus:outline-none overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              {title}
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-slate-500 float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              onClick={onClose}
            >
              <span className="block w-6 h-6 text-xl pb-1">&times;</span>
            </button>
          </div>
          {/* Body */}
          <div className="relative p-6 flex-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
