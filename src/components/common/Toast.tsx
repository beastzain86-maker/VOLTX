import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-[#229C32] shrink-0" />,
          info: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
          warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
          error: <XCircle className="w-5 h-5 text-[#D93636] shrink-0" />,
        };

        const borderColors = {
          success: 'border-[#229C32]/40',
          info: 'border-blue-500/40',
          warning: 'border-amber-500/40',
          error: 'border-[#D93636]/40',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-[#18191D] border ${borderColors[toast.type]} shadow-2xl backdrop-blur-md text-white transition-all duration-300 animate-in slide-in-from-bottom-5`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              {toast.title && (
                <p className="text-xs font-bold uppercase tracking-wider text-[#A0A5B1] mb-0.5">
                  {toast.title}
                </p>
              )}
              <p className="text-sm font-medium leading-snug text-white/90">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
