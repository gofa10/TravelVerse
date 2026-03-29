import React, { Suspense, lazy, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import api from '../../Radux/axios';
import CarsCard from '../../Utility/Cards/CarsCard';
import HotelCard from '../../Utility/Cards/HotelCard';
import CruiseCard from '../../Utility/Cards/CruiseCard';

const HeroPlane = lazy(() => import('../../Component/Home/Hero/HeroPlane'));
const FeaturedContainer = lazy(() => import('../../Component/Home/FeaturedContainer/FeaturedContainer'));
const ModernSlider = lazy(() => import('../../Utility/ModernSlider/ModernSlider'));
const ContainerCatCard = lazy(() => import('../../Component/Home/ContainerCatCard/ContainerCatCard'));
const Poster = lazy(() => import('../../Utility/Poster/Poster'));
const RecommendationsGrid = lazy(() => import('../../Utility/RecommendationsGrid/RecommendationsGrid'));

import ErrorMessage from '../../Component/Shared/ErrorMessage';
import EmptyState from '../../Component/Shared/EmptyState';

// ─── Loading fallback ────────────────────────────────────────────────────────

const LoadingFallback = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
      color: 'var(--text-secondary)',
    }}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '3px solid var(--border-color)',
        borderTopColor: 'var(--color-primary-500)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ─── Section header ──────────────────────────────────────────────────────────

const SectionHeader = ({ title, subtitle }) => (
  <div
    style={{
      textAlign: 'center',
      marginBottom: 'var(--space-10, 40px)',
      padding: '0 var(--space-4, 16px)',
    }}
  >
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2, 8px)',
        padding: 'var(--space-1, 4px) var(--space-3, 12px)',
        borderRadius: 'var(--radius-full)',
        background: 'color-mix(in srgb, var(--accent-primary) 14%, var(--bg-secondary))',
        color: 'var(--color-primary-700)',
        fontSize: 'var(--font-size-xs, 0.75rem)',
        letterSpacing: '0.08em',
        fontWeight: 600,
        textTransform: 'uppercase',
        marginBottom: 'var(--space-4, 16px)',
      }}
    >
      TravelVerse
    </span>
    <h2
      style={{
        fontSize: 'clamp(var(--font-size-2xl, 1.5rem), 3vw, var(--font-size-4xl, 2.25rem))',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-3, 12px)',
      }}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        style={{
          fontSize: 'var(--font-size-base, 1rem)',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          lineHeight: 1.75,
          margin: '0 auto',
        }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

// ─── Home page ───────────────────────────────────────────────────────────────

const API_BASE = '';
const normalizeList = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.data)) return value.data;
  return [];
};

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currency = useSelector((state) => state.currency.currency);

  useEffect(() => {
    document.title = "TravelVerse | Explore the World";
  }, []);

  // ── Aggregated home data state ─────────────────────────────────────────────
  const [homeData, setHomeData] = useState({
    activities: [],
    trips: [],
    hotels: [],
    restaurants: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cars, setCars] = useState([]);
  const [cruises, setCruises] = useState([]);
  const [carsLoading, setCarsLoading] = useState(true);
  const [cruisesLoading, setCruisesLoading] = useState(true);

  // ── Single fetch for all four categories ──────────────────────────────────
  useEffect(() => {
    let cancelled = false; // prevent state update on unmounted component

    const fetchHomeData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await api.get(`${API_BASE}/home`);
        const homePayload = data?.data ?? data;

        if (!cancelled) {
          setHomeData({
            activities: normalizeList(homePayload?.activities),
            trips: normalizeList(homePayload?.trips),
            hotels: normalizeList(homePayload?.hotels),
            restaurants: normalizeList(homePayload?.restaurants),
          });
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[Home] Failed to load /api/home:', err);
          setError(err?.response?.data?.message ?? err.message ?? 'Unknown error');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchHomeData();

    return () => {
      cancelled = true; // cleanup on unmount
    };
  }, []); // run once on mount

  useEffect(() => {
    let cancelled = false;

    const fetchCars = async () => {
      setCarsLoading(true);
      try {
        const { data } = await api.get('/cars');
        const carsPayload = data?.data ?? data;
        if (!cancelled) {
          setCars(normalizeList(carsPayload));
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[Home] Failed to load /api/cars:', err);
          setCars([]);
        }
      } finally {
        if (!cancelled) {
          setCarsLoading(false);
        }
      }
    };

    const fetchCruises = async () => {
      setCruisesLoading(true);
      try {
        const { data } = await api.get('/cruises');
        const cruisesPayload = data?.data ?? data;
        if (!cancelled) {
          setCruises(normalizeList(cruisesPayload));
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[Home] Failed to load /api/cruises:', err);
          setCruises([]);
        }
      } finally {
        if (!cancelled) {
          setCruisesLoading(false);
        }
      }
    };

    fetchCars();
    fetchCruises();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Suspense fallback={<LoadingFallback />}>
      {/* ── Hero ── */}
      <HeroPlane />

      {/* ── Featured container (unchanged) ── */}
      <FeaturedContainer />

      {/* ── Recommendations Grid (Replaces Legacy Featured Trips) ── */}
      <RecommendationsGrid homeData={homeData} isLoading={isLoading} />

      {/* ── Travelers' Choice (ModernSlider – unchanged) ── */}
      <section
        style={{
          padding: 'var(--space-16, 64px) 0',
          background:
            'radial-gradient(circle at center, color-mix(in srgb, var(--accent-primary) 10%, transparent) 0%, transparent 60%), var(--bg-tertiary)',
        }}
      >
        <SectionHeader
          title={t('treat_yourself')}
          subtitle={t('choice_awards')}
        />
        <ModernSlider />
      </section>

      {/* ── Category Carousels – fed from /api/home ── */}
      <section
        className="container"
        style={{
          padding: 'var(--space-16, 64px) var(--space-4, 16px)',
        }}
      >
        {/* Optional error banner */}
        {error && !isLoading && (
          <ErrorMessage 
            message={error?.message ?? error.toString()} 
            onRetry={() => window.location.reload()} 
          />
        )}

        {/* Activities carousel */}
        <ContainerCatCard
          type="activitie"
          data={homeData.activities}
          isLoading={isLoading}
        />

        {/* Trips carousel */}
        <ContainerCatCard
          type="trip"
          data={homeData.trips}
          isLoading={isLoading}
        />

        {/* Hotels carousel */}
        <ContainerCatCard
          type="hotel"
          data={homeData.hotels}
          isLoading={isLoading}
        />

        {/* Restaurants carousel */}
        <ContainerCatCard
          type="restaurant"
          data={homeData.restaurants}
          isLoading={isLoading}
        />

        <div style={{ padding: '20px 0 40px' }}>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 700,
                margin: 0,
                color: '#1a1a1a',
                paddingLeft: '10px',
                borderLeft: '5px solid #1a73e8',
                textTransform: 'capitalize',
              }}
            >
              {t('cars')}
            </h2>
          </div>

          {!carsLoading && cars.length === 0 ? (
            <EmptyState title="No cars available" subtitle="Check back later" icon="🚗" inline />
          ) : (
            <CarsCard products={cars.slice(0, 4)} loading={carsLoading} />
          )}
        </div>

        <div style={{ padding: '20px 0 40px' }}>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 700,
                margin: 0,
                color: '#1a1a1a',
                paddingLeft: '10px',
                borderLeft: '5px solid #1a73e8',
                textTransform: 'capitalize',
              }}
            >
              {t('cruises')}
            </h2>
          </div>

          {!cruisesLoading && cruises.length === 0 ? (
            <EmptyState title="No cruises available" subtitle="Check back later" icon="🚢" inline />
          ) : (
            <CruiseCard cruises={cruises.slice(0, 4)} loading={cruisesLoading} />
          )}
        </div>
      </section>

      <Poster />
    </Suspense>
  );
};

export default Home;
