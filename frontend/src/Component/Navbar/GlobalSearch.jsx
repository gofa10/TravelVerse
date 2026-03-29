import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../Radux/axios';

/* ── type config ──────────────────────────────────────────────── */
const TYPE_CFG = {
     trip: { color: 'bg-blue-100 text-blue-700', icon: '🗺️' },
     hotel: { color: 'bg-purple-100 text-purple-700', icon: '🏨' },
     restaurant: { color: 'bg-orange-100 text-orange-700', icon: '🍽️' },
     activity: { color: 'bg-green-100 text-green-700', icon: '🎯' },
     flight: { color: 'bg-sky-100 text-sky-700', icon: '✈️' },
};

/* ── skeleton row ─────────────────────────────────────────────── */
const SkeletonRow = () => (
     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 20px' }}>
          <div className="skeleton-shimmer" style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
               <div className="skeleton-shimmer" style={{ height: 14, borderRadius: 6, marginBottom: 8, width: '65%' }} />
               <div className="skeleton-shimmer" style={{ height: 11, borderRadius: 6, width: '40%' }} />
          </div>
          <div className="skeleton-shimmer" style={{ width: 60, height: 22, borderRadius: 999 }} />
     </div>
);

/* ── main component ───────────────────────────────────────────── */
const GlobalSearch = () => {
     const [query, setQuery] = useState('');
     const [results, setResults] = useState([]);
     const [loading, setLoading] = useState(false);
     const [searched, setSearched] = useState(false);
     const [open, setOpen] = useState(false);   // overlay mounted
     const [visible, setVisible] = useState(false);   // controls enter/exit anim class
     const [pillFocused, setPillFocused] = useState(false);

     const pillRef = useRef(null);
     const overlayRef = useRef(null);
     const navigate = useNavigate();

     /* open overlay */
     const openOverlay = () => {
          setOpen(true);
          requestAnimationFrame(() => setVisible(true));
     };

     /* close overlay — animate out then unmount */
     const closeOverlay = useCallback(() => {
          setVisible(false);
          setTimeout(() => {
               setOpen(false);
               setQuery('');
               setResults([]);
               setSearched(false);
          }, 160);
     }, []);

     /* pill input → open overlay when typing */
     const handlePillChange = (e) => {
          const v = e.target.value;
          setQuery(v);
          if (v.trim().length >= 1 && !open) openOverlay();
     };

     /* Escape key */
     useEffect(() => {
          const onKey = (e) => { if (e.key === 'Escape') closeOverlay(); };
          document.addEventListener('keydown', onKey);
          return () => document.removeEventListener('keydown', onKey);
     }, [closeOverlay]);

     /* debounced API call */
     useEffect(() => {
          if (query.trim().length < 1) {
               setResults([]);
               setSearched(false);
               return;
          }
          const t = setTimeout(async () => {
               setLoading(true);
               try {
                    const { data } = await api.get(`/search?q=${encodeURIComponent(query.trim())}`);
                    setResults(Array.isArray(data.data) ? data.data : []);
                    setSearched(true);
               } catch {
                    setResults([]);
                    setSearched(true);
               } finally {
                    setLoading(false);
               }
          }, 300);
          return () => clearTimeout(t);
     }, [query]);

     /* click outside overlay card → close */
     const handleBackdrop = (e) => {
          if (e.target === overlayRef.current) closeOverlay();
     };

     const handleSelect = useCallback((item) => {
          navigate(`/itemdetail/${item.id}?type=${item.type}`);
          closeOverlay();
     }, [navigate, closeOverlay]);

     const handleEnterAll = () => {
          navigate(`/search?q=${encodeURIComponent(query)}`);
          closeOverlay();
     };

     return (
          <>
               {/* ── Pill trigger ──────────────────────────────────────── */}
               <div
                    ref={pillRef}
                    style={{
                         display: 'flex',
                         alignItems: 'center',
                         gap: '8px',
                         background: pillFocused ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)',
                         border: pillFocused
                              ? '1px solid rgba(255,255,255,0.9)'
                              : '1px solid rgba(255,255,255,0.3)',
                         boxShadow: pillFocused ? '0 0 0 2px rgba(255,255,255,0.45)' : 'none',
                         borderRadius: '999px',
                         padding: '6px 14px',
                         width: pillFocused ? '320px' : '220px',
                         transition: 'width 0.3s ease, background 0.2s ease, box-shadow 0.2s ease, border 0.2s ease',
                         cursor: 'text',
                         backdropFilter: 'blur(8px)',
                    }}
                    onClick={() => { if (!open) openOverlay(); pillRef.current?.querySelector('input')?.focus(); }}
               >
                    <Search size={15} color="rgba(255,255,255,0.85)" style={{ flexShrink: 0 }} />
                    <input
                         className="gs-pill-input"
                         value={query}
                         onChange={handlePillChange}
                         onFocus={() => setPillFocused(true)}
                         onBlur={() => setPillFocused(false)}
                         placeholder="Search destinations..."
                         aria-label="Search"
                    />
                    {query && (
                         <button
                              onMouseDown={(e) => { e.preventDefault(); setQuery(''); setResults([]); setSearched(false); }}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                         >
                              <X size={13} color="rgba(255,255,255,0.75)" />
                         </button>
                    )}
               </div>

               {/* ── Overlay ───────────────────────────────────────────── */}
               {open && (
                    <>
                         {/* Backdrop */}
                         <div
                              ref={overlayRef}
                              onClick={handleBackdrop}
                              style={{
                                   position: 'fixed',
                                   inset: 0,
                                   background: 'rgba(0,0,0,0.20)',
                                   backdropFilter: 'blur(2px)',
                                   zIndex: 9998,
                              }}
                         />

                         {/* Floating card */}
                         <div
                              className={visible ? 'search-overlay-enter' : 'search-overlay-exit'}
                              style={{
                                   position: 'fixed',
                                   top: '70px',
                                   left: '50%',
                                   transform: 'translateX(-50%)',
                                   width: '600px',
                                   maxWidth: '90vw',
                                   background: 'white',
                                   borderRadius: '20px',
                                   boxShadow: '0 25px 60px rgba(0,0,0,0.20)',
                                   zIndex: 9999,
                                   overflow: 'hidden',
                              }}
                         >
                              {/* Card header */}
                              <div style={{
                                   display: 'flex',
                                   alignItems: 'center',
                                   gap: '10px',
                                   padding: '14px 20px',
                                   borderBottom: '1px solid #f3f4f6',
                              }}>
                                   <Search size={18} color="#6366f1" style={{ flexShrink: 0 }} />
                                   <input
                                        className="gs-overlay-input"
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        placeholder="Search trips, hotels, restaurants, activities…"
                                        autoFocus
                                   />
                                   {query && (
                                        <button
                                             onClick={() => { setQuery(''); setResults([]); setSearched(false); }}
                                             style={{ background: '#f3f4f6', border: 'none', borderRadius: '6px', cursor: 'pointer', padding: '4px 10px', fontSize: '0.7rem', color: '#6b7280', fontWeight: 700, letterSpacing: '0.04em', flexShrink: 0 }}
                                        >
                                             CLEAR
                                        </button>
                                   )}
                                   <button
                                        onClick={closeOverlay}
                                        style={{ background: '#f3f4f6', border: 'none', borderRadius: '6px', cursor: 'pointer', padding: '4px 10px', fontSize: '0.7rem', color: '#6b7280', fontWeight: 700, letterSpacing: '0.04em', flexShrink: 0 }}
                                   >
                                        ESC
                                   </button>
                              </div>

                              {/* Sub-header when query active */}
                              {query.trim().length > 0 && !loading && (
                                   <div style={{ padding: '8px 20px 2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.73rem', color: '#9ca3af', fontWeight: 500 }}>
                                             Results for <strong style={{ color: '#374151' }}>"{query}"</strong>
                                        </span>
                                   </div>
                              )}

                              {/* Loading skeletons */}
                              {loading && (
                                   <div style={{ padding: '8px 0' }}>
                                        <SkeletonRow />
                                        <SkeletonRow />
                                        <SkeletonRow />
                                   </div>
                              )}

                              {/* Results list */}
                              {!loading && results.length > 0 && (
                                   <ul style={{ listStyle: 'none', margin: 0, padding: '6px 0 0', maxHeight: '380px', overflowY: 'auto' }}>
                                        {results.map((item, idx) => {
                                             const cfg = TYPE_CFG[item.type] || { color: 'bg-gray-100 text-gray-600', icon: '📌' };
                                             return (
                                                  <li
                                                       key={`${item.type}-${item.id}`}
                                                       onClick={() => handleSelect(item)}
                                                       style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '14px',
                                                            padding: '10px 20px',
                                                            cursor: 'pointer',
                                                            transition: 'background 0.15s',
                                                            borderBottom: idx < results.length - 1 ? '1px solid #f9fafb' : 'none',
                                                            borderLeft: '3px solid transparent',
                                                       }}
                                                       onMouseEnter={e => {
                                                            e.currentTarget.style.background = '#f8faff';
                                                            e.currentTarget.style.borderLeft = '3px solid #6366f1';
                                                       }}
                                                       onMouseLeave={e => {
                                                            e.currentTarget.style.background = 'transparent';
                                                            e.currentTarget.style.borderLeft = '3px solid transparent';
                                                       }}
                                                  >
                                                       {/* Thumbnail */}
                                                       <div style={{
                                                            width: 48, height: 48, borderRadius: 12, overflow: 'hidden', flexShrink: 0,
                                                            background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
                                                       }}>
                                                            {item.image
                                                                 ? <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                 : cfg.icon}
                                                       </div>

                                                       {/* Text */}
                                                       <div style={{ flex: 1, minWidth: 0 }}>
                                                            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                                 {item.title}
                                                            </div>
                                                            {item.location && (
                                                                 <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '3px' }}>
                                                                      <MapPin size={11} color="#9ca3af" />
                                                                      <span style={{ fontSize: '0.75rem', color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                                           {item.location}
                                                                      </span>
                                                                 </div>
                                                            )}
                                                       </div>

                                                       {/* Type badge */}
                                                       <span
                                                            className={cfg.color}
                                                            style={{ padding: '3px 11px', borderRadius: 999, fontSize: '0.7rem', fontWeight: 700, textTransform: 'capitalize', whiteSpace: 'nowrap', flexShrink: 0 }}
                                                       >
                                                            {item.type}
                                                       </span>
                                                  </li>
                                             );
                                        })}
                                   </ul>
                              )}

                              {/* Empty state */}
                              {!loading && searched && query.trim().length > 0 && results.length === 0 && (
                                   <div style={{ padding: '36px 20px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '2.4rem', marginBottom: '10px' }}>🔍</div>
                                        <div style={{ fontWeight: 700, color: '#374151', fontSize: '0.95rem', marginBottom: '6px' }}>
                                             No results for "{query}"
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                                             Try searching for trips, hotels, or restaurants
                                        </div>
                                   </div>
                              )}

                              {/* No query hint */}
                              {!query && !loading && (
                                   <div style={{ padding: '22px 20px', textAlign: 'center', color: '#d1d5db', fontSize: '0.83rem' }}>
                                        Start typing to search across trips, hotels, restaurants &amp; activities
                                   </div>
                              )}

                              {/* Footer */}
                              {results.length > 0 && !loading && (
                                   <button
                                        onClick={handleEnterAll}
                                        style={{
                                             width: '100%',
                                             padding: '12px 20px',
                                             borderTop: '1px solid #f3f4f6',
                                             background: '#fafafa',
                                             border: 'none',
                                             cursor: 'pointer',
                                             fontSize: '0.8rem',
                                             color: '#6366f1',
                                             fontWeight: 600,
                                             textAlign: 'center',
                                             transition: 'background 0.15s',
                                             display: 'block',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#f5f3ff'}
                                        onMouseLeave={e => e.currentTarget.style.background = '#fafafa'}
                                   >
                                        Press Enter to see all results →
                                   </button>
                              )}
                         </div>
                    </>
               )}
          </>
     );
};

export default GlobalSearch;
