import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div style={{
      backgroundColor: 'rgba(239, 68, 68, 0.08)',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      borderRadius: '12px',
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: '12px',
      width: '100%',
      maxWidth: '500px',
      margin: '20px auto'
    }}>
      <div style={{ color: '#dc2626', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>⚠️</span>
        <span>{message}</span>
      </div>
      {onRetry && (
        <button 
          onClick={onRetry}
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--primary-color, #2563eb)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
