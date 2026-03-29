import React from 'react';
import { createPortal } from 'react-dom';

const LoginPromptModal = ({ open, onClose, onGoLogin, type }) => {
     if (!open) return null;

     return createPortal(
          <>
               <style>{`
                @keyframes popIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to   { opacity: 1; transform: scale(1); }
                }
                .login-modal-card {
                    animation: popIn 200ms ease-out forwards;
                }
            `}</style>

               <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 dark:bg-black/60 z-[9999999] flex items-center justify-center p-5 backdrop-blur-[1px]"
               >
                    <div
                         className="login-modal-card bg-white dark:bg-gray-900 rounded-[22px] p-9 max-w-[380px] w-full text-center shadow-2xl border border-gray-100 dark:border-gray-800"
                         onClick={e => e.stopPropagation()}
                    >
                         <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-5 text-2xl shadow-sm">
                              🔐
                         </div>

                         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              Login Required
                         </h3>

                         <p className="text-[14px] text-gray-500 dark:text-gray-400 mx-auto mb-7 max-w-[260px] leading-relaxed">
                              Please login to continue and enjoy all features
                         </p>

                         <div className="flex flex-col gap-3">
                              <button
                                   onClick={onGoLogin}
                                   className="w-full h-12 bg-[#1a1a2e] dark:bg-blue-600 text-white rounded-xl text-[15px] font-semibold transition-all hover:bg-[#0f3460] dark:hover:bg-blue-700 active:scale-[0.98]"
                              >
                                   Login
                              </button>

                              <button
                                   onClick={onClose}
                                   className="w-full h-11 bg-transparent text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] font-medium transition-all hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-[0.98]"
                              >
                                   Maybe Later
                              </button>
                         </div>
                    </div>
               </div>
          </>,
          document.body
     );
};

export default LoginPromptModal;

