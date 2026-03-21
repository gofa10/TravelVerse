import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import api from '../Radux/axios';

/* ─── useDarkMode — watches html.dark class via MutationObserver ─ */
const useDarkMode = () => {
     const [dark, setDark] = useState(
          () => document.documentElement.classList.contains('dark')
     );
     useEffect(() => {
          const observer = new MutationObserver(() =>
               setDark(document.documentElement.classList.contains('dark'))
          );
          observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
          return () => observer.disconnect();
     }, []);
     return dark;
};

/* ─── Type config ───────────────────────────────────────────────── */
const TYPE_CFG = {
     trip: { badge: '#3b82f6', label: 'Trip', icon: '🗺️', gradient: 'linear-gradient(135deg,#dbeafe,#bfdbfe)', darkGradient: 'linear-gradient(135deg,#1e3a5f,#1e40af)' },
     hotel: { badge: '#a855f7', label: 'Hotel', icon: '🏨', gradient: 'linear-gradient(135deg,#f3e8ff,#e9d5ff)', darkGradient: 'linear-gradient(135deg,#3b0764,#6b21a8)' },
     restaurant: { badge: '#f97316', label: 'Restaurant', icon: '🍽️', gradient: 'linear-gradient(135deg,#ffedd5,#fed7aa)', darkGradient: 'linear-gradient(135deg,#431407,#9a3412)' },
     activity: { badge: '#22c55e', label: 'Activity', icon: '🎯', gradient: 'linear-gradient(135deg,#dcfce7,#bbf7d0)', darkGradient: 'linear-gradient(135deg,#052e16,#166534)' },
     flight: { badge: '#0ea5e9', label: 'Flight', icon: '✈️', gradient: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', darkGradient: 'linear-gradient(135deg,#082f49,#0369a1)' },
};
const DEFAULT_CFG = { badge: '#6b7280', label: 'Other', icon: '📌', gradient: 'linear-gradient(135deg,#f3f4f6,#e5e7eb)', darkGradient: 'linear-gradient(135deg,#1f2937,#374151)' };

const FILTERS = ['All', 'trip', 'hotel', 'restaurant', 'activity', 'flight'];
const FILTER_LABELS = { All: 'All', trip: 'Trips', hotel: 'Hotels', restaurant: 'Restaurants', activity: 'Activities', flight: 'Flights' };

/* ─── Injected keyframes ────────────────────────────────────────── */
const STYLE = `
@keyframes cardFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
}
.sr-shimmer-light {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 800px 100%;
  animation: shimmer 1.4s infinite linear;
}
.sr-shimmer-dark {
  background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
  background-size: 800px 100%;
  animation: shimmer 1.4s infinite linear;
}
`;

/* ─── Skeleton Card ─────────────────────────────────────────────── */
const SkeletonCard = ({ dark }) => {
     const cls = dark ? 'sr-shimmer-dark' : 'sr-shimmer-light';
     return (
          <div style={{ background: dark ? '#1f2937' : '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
               <div className={cls} style={{ height: 220 }} />
               <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className={cls} style={{ height: 18, borderRadius: 6, width: '75%' }} />
                    <div className={cls} style={{ height: 13, borderRadius: 6, width: '50%' }} />
                    <div className={cls} style={{ height: 13, borderRadius: 6, width: '35%' }} />
                    <div style={{ marginTop: 8 }}>
                         <div className={cls} style={{ height: 36, borderRadius: 8 }} />
                    </div>
               </div>
          </div>
     );
};

/* ─── Result Card ───────────────────────────────────────────────── */
const ResultCard = ({ item, index, onSelect, dark }) => {
     const cfg = TYPE_CFG[item.type] || DEFAULT_CFG;
     const [hovered, setHovered] = useState(false);

     return (
          <div
               onClick={() => onSelect(item)}
               onMouseEnter={() => setHovered(true)}
               onMouseLeave={() => setHovered(false)}
               style={{
                    background: dark ? '#1f2937' : '#fff',
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: hovered
                         ? (dark ? '0 12px 32px rgba(0,0,0,0.4)' : '0 12px 32px rgba(0,0,0,0.12)')
                         : (dark ? '0 1px 4px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.08)'),
                    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: 'cardFadeIn 0.4s ease forwards',
                    animationDelay: `${Math.min(index * 60, 600)}ms`,
                    opacity: 0,
               }}
          >
               {/* IMAGE */}
               <div style={{ position: 'relative', height: 220, overflow: 'hidden', flexShrink: 0 }}>
                    {item.image ? (
                         <img
                              src={item.image}
                              alt={item.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
                         />
                    ) : (
                         <div style={{
                              width: '100%', height: '100%',
                              background: dark ? cfg.darkGradient : cfg.gradient,
                              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52,
                         }}>
                              {cfg.icon}
                         </div>
                    )}
                    {/* Badge */}
                    <span style={{
                         position: 'absolute', top: 12, left: 12,
                         background: cfg.badge, color: '#fff',
                         fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 9999,
                         textTransform: 'capitalize', letterSpacing: '0.03em', boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}>
                         {cfg.label}
                    </span>
               </div>

               {/* BODY */}
               <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{
                         fontWeight: 700, fontSize: 17, lineHeight: 1.35,
                         color: dark ? '#f9fafb' : '#111827',
                         overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                         marginBottom: 8,
                    }}>
                         {item.title}
                    </div>

                    {item.location && (
                         <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                              <MapPin size={13} color={dark ? '#60a5fa' : '#3b82f6'} style={{ flexShrink: 0 }} />
                              <span style={{ fontSize: 13, color: dark ? '#9ca3af' : '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                   {item.location}
                              </span>
                         </div>
                    )}

                    <div style={{ flex: 1 }} />
                    <div style={{ borderTop: `1px solid ${dark ? '#374151' : '#f3f4f6'}`, margin: '16px 0' }} />

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                         <span style={{ fontSize: 12, color: dark ? '#6b7280' : '#9ca3af', textTransform: 'capitalize', fontWeight: 500 }}>
                              {cfg.label}
                         </span>
                         <button
                              onClick={e => { e.stopPropagation(); onSelect(item); }}
                              style={{
                                   background: hovered ? '#1d4ed8' : '#2563eb',
                                   color: '#fff', border: 'none', borderRadius: 8,
                                   padding: '8px 16px', fontSize: 12, fontWeight: 600,
                                   cursor: 'pointer', transition: 'background 0.18s ease',
                                   whiteSpace: 'nowrap',
                              }}
                         >
                              View Details →
                         </button>
                    </div>
               </div>
          </div>
     );
};

/* ─── Main Page ─────────────────────────────────────────────────── */
const SearchResults = () => {
     const [searchParams] = useSearchParams();
     const q = searchParams.get('q') || '';
     const navigate = useNavigate();
     const dark = useDarkMode();

     const [results, setResults] = useState([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(false);
     const [activeFilter, setFilter] = useState('All');
     const [heroQuery, setHeroQuery] = useState(q);

     /* ── fetch ── */
     useEffect(() => {
          setHeroQuery(q);
          setFilter('All');
          if (!q.trim()) { setResults([]); return; }
          let cancelled = false;
          const doFetch = async () => {
               setLoading(true); setError(false);
               try {
                    const { data } = await api.get(`/search?q=${encodeURIComponent(q.trim())}`);
                    if (!cancelled) setResults(Array.isArray(data) ? data : []);
               } catch {
                    if (!cancelled) setError(true);
               } finally {
                    if (!cancelled) setLoading(false);
               }
          };
          doFetch();
          return () => { cancelled = true; };
     }, [q]);

     /* ── filter ── */
     const displayed = activeFilter === 'All' ? results : results.filter(r => r.type === activeFilter);

     /* ── hero search submit ── */
     const handleHeroSearch = () => {
          if (heroQuery.trim()) navigate(`/search?q=${encodeURIComponent(heroQuery.trim())}`);
     };

     /* ── navigate to detail ── */
     const handleSelect = item => navigate(`/itemdetail/${item.id}?type=${item.type}`);

     /* ── computed theme values ── */
     const t = {
          pageBg: dark ? '#030712' : '#f8fafc',
          heroBg: dark ? 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)' : 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
          heroLabel: dark ? 'rgba(147,197,253,0.8)' : 'rgba(255,255,255,0.7)',
          heroSub: dark ? 'rgba(191,219,254,0.7)' : 'rgba(255,255,255,0.6)',
          searchBarBg: dark ? '#1e293b' : '#fff',
          searchBorder: dark ? '1px solid #334155' : '1px solid transparent',
          searchIcon: dark ? '#60a5fa' : '#2563eb',
          inputColor: dark ? '#f1f5f9' : '#1a1a1a',
          filterBarBg: dark ? '#111827' : '#fff',
          filterBarBorder: dark ? '1px solid rgba(55,65,81,0.5)' : '1px solid #e5e7eb',
          pillActiveBg: dark ? '#3b82f6' : '#2563eb',
          pillInactiveBg: dark ? '#1f2937' : '#fff',
          pillInactiveColor: dark ? '#d1d5db' : '#4b5563',
          pillInactiveBorder: dark ? '1px solid #374151' : '1px solid #e5e7eb',
          pillHoverBg: dark ? '#374151' : '#f9fafb',
          countColor: dark ? '#6b7280' : '#9ca3af',
          errorTitle: dark ? '#e5e7eb' : '#374151',
          errorSub: dark ? '#6b7280' : '#9ca3af',
          emptyTitle: dark ? '#f9fafb' : '#1f2937',
          emptySub: dark ? '#9ca3af' : '#6b7280',
     };

     return (
          <>
               <style>{STYLE}</style>
               <div style={{ minHeight: '100vh', background: t.pageBg, transition: 'background 0.2s ease' }}>

                    {/* ══════════════════════════════════════════════════════════ */}
                    {/* HERO BANNER                                               */}
                    {/* ══════════════════════════════════════════════════════════ */}
                    <div style={{ background: t.heroBg, padding: '48px 24px 64px', textAlign: 'center', transition: 'background 0.2s ease' }}>
                         <p style={{ color: t.heroLabel, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                              Search Results
                         </p>
                         <h1 style={{ color: '#fff', fontSize: 36, fontWeight: 800, margin: 0, marginBottom: 8 }}>
                              Results for "{q}"
                         </h1>
                         <p style={{ color: t.heroSub, fontSize: 16, margin: '0 0 32px' }}>
                              {loading ? 'Searching…' : `${results.length} destination${results.length !== 1 ? 's' : ''} found`}
                         </p>

                         {/* Search bar */}
                         <div style={{
                              display: 'flex', maxWidth: 540, margin: '0 auto',
                              background: t.searchBarBg, border: t.searchBorder,
                              borderRadius: 9999, padding: '6px 6px 6px 20px',
                              boxShadow: '0 8px 32px rgba(0,0,0,0.22)', alignItems: 'center', gap: 8,
                              transition: 'background 0.2s ease',
                         }}>
                              <Search size={18} color={t.searchIcon} style={{ flexShrink: 0 }} />
                              <input
                                   value={heroQuery}
                                   onChange={e => setHeroQuery(e.target.value)}
                                   onKeyDown={e => e.key === 'Enter' && handleHeroSearch()}
                                   placeholder="Search destinations..."
                                   style={{
                                        flex: 1, border: 'none', outline: 'none',
                                        fontSize: 15, color: t.inputColor,
                                        background: 'transparent', fontFamily: 'inherit',
                                   }}
                              />
                              <button
                                   onClick={handleHeroSearch}
                                   style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 9999, padding: '10px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
                                   onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                                   onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
                              >
                                   Search
                              </button>
                         </div>
                    </div>

                    {/* ══════════════════════════════════════════════════════════ */}
                    {/* STICKY FILTER BAR                                         */}
                    {/* ══════════════════════════════════════════════════════════ */}
                    <div style={{
                         position: 'sticky', top: 64, zIndex: 40,
                         background: t.filterBarBg, borderBottom: t.filterBarBorder,
                         padding: '12px 24px', transition: 'background 0.2s ease',
                    }}>
                         <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                              {/* Pills */}
                              <div style={{ display: 'flex', gap: 8, flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: 2 }}>
                                   {FILTERS.map(f => {
                                        const active = activeFilter === f;
                                        return (
                                             <button
                                                  key={f}
                                                  onClick={() => setFilter(f)}
                                                  style={{
                                                       background: active ? t.pillActiveBg : t.pillInactiveBg,
                                                       color: active ? '#fff' : t.pillInactiveColor,
                                                       border: active ? `1px solid ${t.pillActiveBg}` : t.pillInactiveBorder,
                                                       borderRadius: 9999, padding: '8px 20px', fontSize: 13, fontWeight: 600,
                                                       cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s ease', outline: 'none',
                                                  }}
                                                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = t.pillHoverBg; }}
                                                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = t.pillInactiveBg; }}
                                             >
                                                  {FILTER_LABELS[f]}
                                             </button>
                                        );
                                   })}
                              </div>
                              {/* Count */}
                              <span style={{ fontSize: 13, color: t.countColor, fontWeight: 500, whiteSpace: 'nowrap' }}>
                                   {loading ? '…' : `${displayed.length} result${displayed.length !== 1 ? 's' : ''}`}
                              </span>
                         </div>
                    </div>

                    {/* ══════════════════════════════════════════════════════════ */}
                    {/* MAIN CONTENT                                              */}
                    {/* ══════════════════════════════════════════════════════════ */}
                    <div style={{ minHeight: '60vh', padding: '32px 24px 64px' }}>
                         <div style={{ maxWidth: 1280, margin: '0 auto' }}>

                              {/* Loading */}
                              {loading && (
                                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} dark={dark} />)}
                                   </div>
                              )}

                              {/* Error */}
                              {error && !loading && (
                                   <div style={{ textAlign: 'center', padding: '80px 0' }}>
                                        <div style={{ fontSize: 64, marginBottom: 16 }}>⚠️</div>
                                        <div style={{ fontSize: 22, fontWeight: 700, color: t.errorTitle, marginBottom: 8 }}>Something went wrong</div>
                                        <div style={{ fontSize: 14, color: t.errorSub }}>Please try again later.</div>
                                   </div>
                              )}

                              {/* Empty */}
                              {!loading && !error && displayed.length === 0 && (
                                   <div style={{ textAlign: 'center', padding: '80px 0' }}>
                                        <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
                                        <div style={{ fontSize: 24, fontWeight: 700, color: t.emptyTitle, marginBottom: 8 }}>
                                             {results.length === 0 ? `No results found for "${q}"` : `No ${FILTER_LABELS[activeFilter]} found`}
                                        </div>
                                        <div style={{ fontSize: 15, color: t.emptySub, marginBottom: 32 }}>
                                             {results.length === 0 ? 'Try a different keyword — e.g. "Cairo", "Hotel", "Beach"' : 'Try selecting a different filter'}
                                        </div>
                                        <button
                                             onClick={() => navigate('/')}
                                             style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 9999, padding: '12px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
                                        >
                                             Go back home
                                        </button>
                                   </div>
                              )}

                              {/* Results grid */}
                              {!loading && !error && displayed.length > 0 && (
                                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {displayed.map((item, idx) => (
                                             <ResultCard key={`${item.type}-${item.id}`} item={item} index={idx} onSelect={handleSelect} dark={dark} />
                                        ))}
                                   </div>
                              )}
                         </div>
                    </div>
               </div>
          </>
     );
};

export default SearchResults;
