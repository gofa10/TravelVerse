import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Tag, DollarSign, ChevronDown } from 'lucide-react';

const PLANE_ANIMATION_MS = 1400;
const NAVIGATION_DELAY_MS = 1210;

const buildSearchParams = (values) => {
  const params = new URLSearchParams();

  Object.entries(values).forEach(([key, value]) => {
    const normalized = String(value ?? '').trim();
    if (normalized !== '') {
      params.set(key, normalized);
    }
  });

  return params;
};

const UnifiedSearchBar = ({
  className = '',
  values,
  onFieldChange,
  onSearch,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navDestName, setNavDestName] = useState('');
  const [internalForm, setInternalForm] = useState({
    category: '',
    location: '',
    min_price: '',
    max_price: '',
  });

  const form = values ?? internalForm;

  const categoryOptions = useMemo(
    () => [
      { value: '', label: t('all_categories') },
      { value: 'trip', label: t('trips') },
      { value: 'hotel', label: t('hotels') },
      { value: 'restaurant', label: t('restaurants') },
      { value: 'activity', label: t('activity') },
    ],
    [t]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (key, value) => {
    if (onFieldChange) {
      onFieldChange(key, value);
      return;
    }

    setInternalForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = buildSearchParams(form);
    const targetLabel = form.location || t('search');

    setNavDestName(targetLabel);
    setIsNavigating(true);

    setTimeout(() => {
      if (onSearch) {
        onSearch(params);
        return;
      }

      navigate(`/search${params.toString() ? `?${params.toString()}` : ''}`);
    }, NAVIGATION_DELAY_MS);
  };

  const selectedCategory =
    categoryOptions.find((option) => option.value === form.category)?.label ||
    t('all_categories');

  return (
    <form
      onSubmit={handleSubmit}
      className={`mx-auto w-full max-w-[800px] ${className}`.trim()}
    >
      <style>{`
        .hero-unified-search {
          width: 100%;
        }

        .hero-unified-search-shell {
          display: flex;
          align-items: stretch;
          width: 100%;
          min-height: 64px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.82);
          background: #ffffff;
          box-shadow: 0 18px 42px rgba(15, 23, 42, 0.14);
          overflow: visible;
          position: relative;
          z-index: 1000;
        }

        .dark .hero-unified-search-shell {
          border: 1px solid rgba(71, 85, 105, 0.82);
          background: #1e293b;
          box-shadow: 0 18px 42px rgba(0, 0, 0, 0.3);
        }

        .hero-unified-search-section {
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 64px;
          padding: 0 16px;
          border-right: 1px solid rgba(226, 232, 240, 0.95);
          transition: background-color 0.2s ease;
        }

        .dark .hero-unified-search-section {
          border-right: 1px solid rgba(71, 85, 105, 0.95);
        }

        .hero-unified-search-section:hover {
          background: rgba(248, 250, 252, 0.88);
        }

        .dark .hero-unified-search-section:hover {
          background: rgba(51, 65, 85, 0.88);
        }

        .hero-unified-search-section:last-of-type {
          border-right: none;
        }

        .hero-unified-search-icon {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          color: #64748b;
        }

        .dark .hero-unified-search-icon {
          color: #94a3b8;
        }

        .hero-unified-search-input,
        .hero-unified-search-select-trigger {
          border: none !important;
          outline: none !important;
          background: transparent !important;
          color: #1e293b !important;
          font-size: 16px !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
          padding: 0 !important;
          margin: 0 !important;
          box-shadow: none !important;
        }

        .dark .hero-unified-search-input,
        .dark .hero-unified-search-select-trigger {
          color: #f8fafc !important;
        }

        .hero-unified-search-input {
          width: 100% !important;
          min-width: 0 !important;
        }

        .hero-unified-search-input::placeholder {
          color: #94a3b8 !important;
          opacity: 1 !important;
        }

        .dark .hero-unified-search-input::placeholder {
          color: #94a3b8 !important;
        }

        .hero-unified-search-category {
          position: relative;
          min-width: 170px;
          flex: 0.85;
        }

        .hero-unified-search-location {
          min-width: 140px;
          flex: 0.64;
        }

        .hero-unified-search-price {
          min-width: 138px;
          flex: 0.62;
        }

        .hero-unified-search-price .hero-unified-search-input {
          min-width: 56px !important;
        }

        .hero-unified-search-select-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }

        .hero-unified-search-label {
          min-width: 0;
          flex: 1;
          white-space: nowrap;
          color: #1e293b;
          font-size: 16px;
          font-weight: 500;
        }

        .dark .hero-unified-search-label {
          color: #f8fafc;
        }

        .hero-unified-search-buttonWrap {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 12px 0 8px;
          flex-shrink: 0;
        }

        .hero-unified-search-button {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          min-width: 120px !important;
          height: 48px !important;
          padding: var(--space-3) var(--space-8) !important;
          border: none !important;
          border-radius: 999px !important;
          background: var(--color-accent-terracotta) !important;
          color: #ffffff !important;
          font-size: 14px !important;
          font-weight: 700 !important;
          box-shadow: var(--shadow-md) !important;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease !important;
        }

        .hero-unified-search-button:hover {
          transform: translateY(-1px);
          background: var(--accent-primary-hover) !important;
          box-shadow: var(--shadow-lg) !important;
        }

        .hero-unified-search-dropdown {
          position: absolute;
          left: 18px;
          right: 18px;
          top: calc(100% + 12px);
          z-index: 9999;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          background: #ffffff;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
        }

        .dark .hero-unified-search-dropdown {
          border: 1px solid #475569;
          background: #1e293b;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
        }

        .flight-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          z-index: 99999;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          animation: fadeOverlayIn 0.3s forwards;
        }

        @keyframes fadeOverlayIn {
          to { opacity: 1; }
        }

        .plane-emoji {
          font-size: 80px;
          animation: flyAcross ${PLANE_ANIMATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
          margin-bottom: 30px;
        }

        @keyframes flyAcross {
          0% {
            transform: translate(-100vw, 150px) rotate(10deg) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: translate(-30vw, 50px) rotate(15deg) scale(0.8);
          }
          70% {
            opacity: 1;
            transform: translate(30vw, -50px) rotate(15deg) scale(1.2);
          }
          100% {
            transform: translate(100vw, -150px) rotate(15deg) scale(1.5);
            opacity: 0;
          }
        }

        .dest-text {
          font-size: 32px;
          font-weight: 800;
          color: #1a73e8;
          text-align: center;
          background: linear-gradient(90deg, #1a73e8, #FF8C00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: pulseText 1s infinite alternate;
        }

        @keyframes pulseText {
          from { transform: scale(1); opacity: 0.8; }
          to { transform: scale(1.05); opacity: 1; }
        }

        @media (max-width: 1024px) {
          .hero-unified-search-shell {
            flex-direction: column;
            border-radius: 32px;
            padding: 10px;
          }

          .hero-unified-search-section {
            min-height: 58px;
            border-right: none;
            border-bottom: 1px solid rgba(226, 232, 240, 0.95);
            padding: 0 18px;
          }

          .dark .hero-unified-search-section {
            border-bottom: 1px solid rgba(71, 85, 105, 0.95);
          }

          .hero-unified-search-buttonWrap {
            padding: 10px 6px 2px;
          }

          .hero-unified-search-button {
            width: 100% !important;
            min-width: 0 !important;
          }
        }
      `}</style>
      {isNavigating && (
        <div className="flight-overlay">
          <div className="plane-emoji">✈️</div>
          <div className="dest-text" dir="auto">
            Heading to {navDestName}...
          </div>
        </div>
      )}
      <div className="relative rounded-full">
        <div className="hero-unified-search-shell">
          <div
            ref={dropdownRef}
            className="hero-unified-search-section hero-unified-search-category"
          >
            <button
              type="button"
              onClick={() => setCategoryOpen((prev) => !prev)}
              className="hero-unified-search-select-trigger"
            >
              <Tag className="hero-unified-search-icon" />
              <span className="hero-unified-search-label">
                {selectedCategory}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${categoryOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {categoryOpen && (
              <div className="absolute left-3 right-3 top-[calc(100%+12px)] z-[9999] overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 shadow-2xl shadow-slate-900/20">
                {categoryOptions
                  .filter((option) => option.value !== form.category)
                  .map((option) => (
                    <button
                      key={option.value || 'all'}
                      type="button"
                      onClick={() => {
                        handleChange('category', option.value);
                        setCategoryOpen(false);
                      }}
                      className={`flex w-full items-center px-4 py-3 text-left text-sm transition-colors ${form.category === option.value
                        ? 'bg-blue-50 font-semibold text-blue-700'
                        : 'text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
              </div>
            )}
          </div>

          <div className="hero-unified-search-section hero-unified-search-location">
            <MapPin className="hero-unified-search-icon" />
            <input
              id="search-location"
              name="location"
              aria-label={t('location')}
              type="text"
              value={form.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder={t('location')}
              className="hero-unified-search-input"
            />
          </div>

          <div className="hero-unified-search-section hero-unified-search-price">
            <DollarSign className="hero-unified-search-icon" />
            <input
              id="search-min-price"
              name="min_price"
              aria-label={t('min_price')}
              type="number"
              value={form.min_price}
              onChange={(e) => handleChange('min_price', e.target.value)}
              placeholder={t('min_price')}
              className="hero-unified-search-input [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>

          <div className="hero-unified-search-section hero-unified-search-price !border-r-0">
            <DollarSign className="hero-unified-search-icon" />
            <input
              id="search-max-price"
              name="max_price"
              aria-label={t('max_price')}
              type="number"
              value={form.max_price}
              onChange={(e) => handleChange('max_price', e.target.value)}
              placeholder={t('max_price')}
              className="hero-unified-search-input [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>

          <div className="hero-unified-search-buttonWrap">
            <button
              type="submit"
              disabled={isNavigating}
              className="hero-unified-search-button"
            >
              <Search className="h-[18px] w-[18px] text-white" />
              <span className="whitespace-nowrap">{t('search')}</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UnifiedSearchBar;
