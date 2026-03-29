import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 | TravelVerse";
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light text-center py-5">
      <div className="container px-4 py-5" style={{ maxWidth: '600px' }}>
        <h1 
          className="display-1 fw-bold mb-3" 
          style={{ color: 'var(--color-primary-500, #1a73e8)' }}
        >
          404
        </h1>
        <h2 className="mb-4">
          {t('notFound.title', 'Page Not Found')}
        </h2>
        <p className="text-muted mb-5 fs-5">
          {t('notFound.subtitle', "The page you're looking for doesn't exist.")}
        </p>
        <button 
          onClick={() => navigate('/')} 
          className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm"
          style={{ background: 'var(--color-accent-terracotta, #FF8C00)', border: 'none' }}
        >
          {t('notFound.button', 'Go Home')}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
