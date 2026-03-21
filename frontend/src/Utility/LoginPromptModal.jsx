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
                .login-btn-primary:hover { 
                    background: #0f3460 !important; 
                }
                .login-btn-secondary:hover { 
                    background: #f5f5f5 !important; 
                }
            `}</style>

               <div
                    onClick={onClose}
                    style={{
                         position: 'fixed', inset: 0,
                         background: 'rgba(0,0,0,0.35)',
                         zIndex: 9999999,
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         padding: '20px',
                    }}
               >
                    <div
                         className="login-modal-card"
                         onClick={e => e.stopPropagation()}
                         style={{
                              background: '#ffffff',
                              borderRadius: '20px',
                              padding: '36px 28px',
                              maxWidth: '380px',
                              width: '100%',
                              textAlign: 'center',
                              boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                         }}
                    >
                         <div style={{
                              width: '64px', height: '64px',
                              borderRadius: '50%',
                              background: '#f0f4ff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 20px',
                              fontSize: '28px',
                         }}>
                              🔐
                         </div>

                         <h3 style={{
                              fontSize: '20px', fontWeight: 700,
                              color: '#1a1a2e', margin: '0 0 10px',
                         }}>
                              Login Required
                         </h3>

                         <p style={{
                              fontSize: '14px', color: '#888',
                              margin: '0 auto 28px',
                              maxWidth: '260px', lineHeight: '1.6',
                         }}>
                              Please login to continue and enjoy all features
                         </p>

                         <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '10px'
                         }}>
                              <button
                                   className="login-btn-primary"
                                   onClick={onGoLogin}
                                   style={{
                                        background: '#1a1a2e',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '12px',
                                        height: '48px',
                                        fontSize: '15px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'background 0.2s',
                                        width: '100%',
                                   }}
                              >
                                   Login
                              </button>

                              <button
                                   className="login-btn-secondary"
                                   onClick={onClose}
                                   style={{
                                        background: 'transparent',
                                        color: '#888',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '12px',
                                        height: '44px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        transition: 'background 0.2s',
                                        width: '100%',
                                   }}
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

