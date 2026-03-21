import React, { Suspense, lazy, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import api from '../../Radux/axios';

const HeroPlane = lazy(() => import('../../Component/Home/Hero/HeroPlane'));
const FeaturedContainer = lazy(() => import('../../Component/Home/FeaturedContainer/FeaturedContainer'));
const ModernSlider = lazy(() => import('../../Utility/ModernSlider/ModernSlider'));
const ContainerCatCard = lazy(() => import('../../Component/Home/ContainerCatCard/ContainerCatCard'));
const Poster = lazy(() => import('../../Utility/Poster/Poster'));
const RecommendationsGrid = lazy(() => import('../../Utility/RecommendationsGrid/RecommendationsGrid'));

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
      marginBottom: 'var(--space-8, 32px)',
      padding: '0 var(--space-4, 16px)',
    }}
  >
    <h2
      style={{
        fontSize: 'var(--font-size-3xl, 1.875rem)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-2, 8px)',
      }}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        style={{
          fontSize: 'var(--font-size-base, 1rem)',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
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

const Home = () => {
  const { t } = useTranslation();
  const currency = useSelector((state) => state.currency.currency);

  // ── Aggregated home data state ─────────────────────────────────────────────
  const [homeData, setHomeData] = useState({
    activities: [],
    trips: [],
    hotels: [],
    restaurants: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Single fetch for all four categories ──────────────────────────────────
  useEffect(() => {
    let cancelled = false; // prevent state update on unmounted component

    const fetchHomeData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await api.get(`${API_BASE}/home`);

        if (!cancelled) {
          setHomeData({
            activities: Array.isArray(data.activities) ? data.activities : [],
            trips: Array.isArray(data.trips) ? data.trips : [],
            hotels: Array.isArray(data.hotels) ? data.hotels : [],
            restaurants: Array.isArray(data.restaurants) ? data.restaurants : [],
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
          backgroundColor: 'var(--bg-tertiary)',
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
          <div
            role="alert"
            style={{
              background: 'var(--color-error)',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '24px',
              fontSize: '0.875rem',
            }}
          >
            ⚠️ Could not load some sections. Please refresh the page.
          </div>
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
      </section>

      <Poster />
    </Suspense>
  );
};

export default Home;
