// src/Utility/CardCarousel/CardCarousel.jsx
import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ItemCard from '../Cards/ItemCard';

/**
 * CardCarousel
 *
 * Props:
 *  title      – section heading string
 *  isLoading  – boolean, renders skeleton placeholders when true
 *  children   – <ItemCard /> elements (or any elements) to display
 *  skeletonCount – number of skeleton cards to show while loading (default 4)
 */
const CardCarousel = ({ title, isLoading = false, children, skeletonCount = 4 }) => {
     const trackRef = useRef(null);

     // Scroll by exactly one card width + gap on each arrow press
     const scroll = useCallback((dir) => {
          const track = trackRef.current;
          if (!track) return;
          const cardWidth = 320 + 24; // Large card width (320px) + gap (24px)
          track.scrollBy({ left: dir === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
     }, []);

     const childCount = React.Children.count(children);
     const hasContent = !isLoading && childCount > 0;
     const isEmpty = !isLoading && childCount === 0;

     return (
          <Section>
               {/* Section header */}
               {title && <h2 className="carousel-title">{title}</h2>}

               <div className="carousel-wrapper">
                    {/* Left arrow */}
                    <button
                         className="arrow arrow-left"
                         onClick={() => scroll('left')}
                         aria-label="Previous item"
                         disabled={isLoading}
                    >
                         <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>

                    {/* Scroll track */}
                    <div
                         ref={trackRef}
                         className="carousel-track"
                         role="region"
                         aria-label={title ? `${title} carousel` : 'Content carousel'}
                    >
                         {isLoading
                              ? Array.from({ length: skeletonCount }, (_, i) => (
                                   <ItemCard key={`sk-${i}`} isLoading={true} />
                              ))
                              : children
                         }

                         {isEmpty && (
                              <p className="empty-msg">No items available at the moment.</p>
                         )}
                    </div>

                    {/* Right arrow */}
                    <button
                         className="arrow arrow-right"
                         onClick={() => scroll('right')}
                         aria-label="Next item"
                         disabled={isLoading}
                    >
                         <ChevronRight size={20} strokeWidth={2.5} />
                    </button>
               </div>
          </Section>
     );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const Section = styled.section`
  width: 100%;
  padding: 0 0 var(--space-6, 24px);

  .carousel-title {
    font-size: var(--font-size-xl, 1.25rem);
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 var(--space-4, 16px) 0;
    padding: 0 var(--space-4, 16px);
    text-transform: capitalize;
  }

  /* Outer wrapper contains both arrows and the track */
  .carousel-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  /* ── Arrow buttons ── */
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--bg-secondary, #fff);
    color: var(--text-primary);
    border: 1px solid var(--border-color, #e2e8f0);
    box-shadow: var(--shadow-md);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
    flex-shrink: 0;
  }

  .arrow:hover:not(:disabled) {
    background: var(--color-primary-500, #3b82f6);
    color: #fff;
    border-color: transparent;
    box-shadow: var(--shadow-lg);
  }

  .arrow:active:not(:disabled) {
    transform: translateY(-50%) scale(0.92);
  }

  .arrow:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .arrow-left  { left: 4px; }
  .arrow-right { right: 4px; }

  /* ── Scroll track ── */
  .carousel-track {
    display: flex;
    flex-direction: row;
    gap: 24px;
    overflow-x: auto;
    overflow-y: visible;

    /* Scroll snapping */
    scroll-snap-type: x mandatory;

    /* Hide scrollbar – all browsers */
    scrollbar-width: none;          /* Firefox */
    -ms-overflow-style: none;       /* IE / Edge legacy */

    /* Breathing room so cards don't clip on the sides - adjusted for larger cards */
    padding: 8px 60px 16px;
    scroll-padding-left: 60px;

    /* Smooth native scroll on touch */
    -webkit-overflow-scrolling: touch;
  }

  /* Hide scrollbar – Chrome / Safari / WebKit */
  .carousel-track::-webkit-scrollbar {
    display: none;
  }

  /* Empty message */
  .empty-msg {
    color: var(--text-muted);
    font-size: var(--font-size-sm, 0.875rem);
    padding: var(--space-4, 16px) 0;
    text-align: center;
    width: 100%;
  }
`;

export default CardCarousel;
