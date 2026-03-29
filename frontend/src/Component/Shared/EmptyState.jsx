import React from 'react';

const EmptyState = ({ title, subtitle, icon = '🔍' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '300px',
      textAlign: 'center',
      gap: '12px',
      padding: '2rem'
    }}>
      <div style={{ fontSize: '3rem' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#374151', margin: 0 }}>
        {title}
      </h3>
      {subtitle && (
        <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default EmptyState;
