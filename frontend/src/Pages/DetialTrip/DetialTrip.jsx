// src/Pages/Details/DetialItem.jsx
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Rating from '@mui/material/Rating';
import { Skeleton } from '@mui/material';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import api from '../../Radux/axios';

import LoginPromptModal from '../../Utility/LoginPromptModal';

import style from '../../Style/DetialTrip/DetialTrip.module.css';
import ImageGallery from '../../Utility/ImageGallery/ImageGallery';
import DetialtripCard from '../../Utility/Cards/DetialtripCard';
import ContainerCatCard from '../../Component/Home/ContainerCatCard/ContainerCatCard';
import CommentCard from '../../Utility/Cards/CommentCard';
import { ArrowBigLeft, MessageSquare, Star } from 'lucide-react';
import ErrorBoundary from '../../Components/ErrorBoundary/ErrorBoundary';
import ReviewForm from '../../Component/Reviews/ReviewForm';
import { getApiEndpoint, normalizeType } from '../../Utility/typeUtils.js';

const normalizePayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return payload ?? null;
};

const fetchItem = async ({ queryKey }) => {
  const [_key, { type, id }] = queryKey;
  const endpoint = getApiEndpoint(type);
  const res = await api.get(`/${endpoint}/${id}`);
  const payload = normalizePayload(res.data?.data ?? res.data);
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
    return { ...payload, endpoint };
  }
  return { endpoint };
};

const fetchReviews = async () => {
  try {
    const res = await api.get('/reviews');
    const payload = res.data?.data ?? res.data;
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    if (Array.isArray(payload?.data)) return payload.data;
    return [];
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return [];
  }
};

const translateListValue = (t, value) => {
  if (!value || typeof value !== 'string') return value;

  return value
    .split(',')
    .map((part) => {
      const trimmed = part.trim();
      if (!trimmed) return trimmed;

      const key = trimmed.toLowerCase().replace(/\s+/g, '_');
      const translated = t(key);
      return translated && translated !== key ? translated : trimmed;
    })
    .join(', ');
};

const hasValue = (value) => {
  if (value == null) return false;
  if (typeof value === 'string') return value.trim() !== '';
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

const getItemTitle = (item, type) => {
  if (!item) return 'Details';
  if (hasValue(item.name)) return item.name;
  if (hasValue(item.name_en)) return item.name_en;
  if (hasValue(item.title)) return item.title;
  if (type === 'car') {
    const carName = [item.brand, item.model].filter(hasValue).join(' ');
    if (hasValue(carName)) return carName;
  }
  if (type === 'flight') {
    const flightName = [item.from_location, item.to_location].filter(hasValue).join(' → ');
    if (hasValue(flightName)) return flightName;
  }
  return 'Details';
};

const getItemLocation = (item, type, t) => {
  if (!item) return null;
  if (hasValue(item.location)) return translateListValue(t, item.location);
  if (type === 'flight') {
    const route = [item.from_location, item.to_location].filter(hasValue).join(' - ');
    return hasValue(route) ? route : null;
  }
  return null;
};

const getItemRating = (item) => {
  const rawRating = item?.rate ?? item?.rating ?? item?.average_rating;
  return hasValue(rawRating) ? Number(rawRating) : null;
};

const DetialItem = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const rawType = searchParams.get('type')?.toLowerCase() || 'trip';
  const type = normalizeType(rawType);



  const navigate = useNavigate();

  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

  const [visibleCount, setVisibleCount] = useState(3);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const {
    data: selectedItem,
    isLoading: itemLoading
  } = useQuery({
    queryKey: ['item', { type, id }],
    queryFn: fetchItem
  });

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const isAuthenticated = !!(token && token !== 'undefined' && token !== 'null');

  useEffect(() => {
    if (!isAuthenticated) {
      setLoginPromptOpen(true);
    }
  }, [isAuthenticated]);

  const {
    data: allReviews = [],
    isLoading: reviewLoading,
    refetch: refetchReviews
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
    enabled: !!token,
  });




  const itemReviews = (allReviews || [])
    .filter((r) => {
      // Logic to match reviewable_type (e.g., "App\Models\Trip") with type (e.g., "trip")
      const reviewType = r.reviewable_type?.toLowerCase().split('\\').pop();
      return r.reviewable_id === Number(id) && reviewType === type;
    })
    .slice(0, visibleCount);
  const itemTitle = getItemTitle(selectedItem, type);
  const itemLocation = getItemLocation(selectedItem, type, t);
  const itemRating = getItemRating(selectedItem);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };
  // useEffect(() => {
  //   console.log('API Response:', selectedItem);
  // }, [selectedItem]);

  return (
    <Container className="my-5" style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <LoginPromptModal
        open={loginPromptOpen}
        onClose={() => setLoginPromptOpen(false)}
        onGoLogin={() => {
          setLoginPromptOpen(false);
          navigate('/login');
        }}
        type={type}
      />
      <h1>{itemLoading ? <Skeleton width={300} /> : itemTitle}</h1>
      <div className="flex items-center mb-4">
        <Link
          to={-1}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                     bg-slate-200 dark:bg-slate-700 
                     text-slate-800 dark:text-white
                     hover:bg-slate-300 dark:hover:bg-slate-600
                     transition-all duration-200 font-medium text-sm
                     no-underline hover:-translate-x-1"
        >
          <ArrowBigLeft size={20} />
          {t('back')}
        </Link>
      </div>
      <Row className={style.info}>
        <Col>
          {itemLoading ? (
            <Skeleton width={120} />
          ) : itemRating != null ? (
            <Rating
              name="rating"
              value={itemRating}
              precision={0.5}
              readOnly
            />
          ) : null}
        </Col>
        <Col>
          {itemLoading ? <Skeleton width={80} /> : itemLocation ? <p>{t('location')}: {itemLocation}</p> : null}
        </Col>
        {/* Duration+Guide col — shown only for trip and activity */}
        {(type === 'trip' || type === 'activity') && (
          <Col>
            <ul>
              {hasValue(selectedItem?.duration) && <li>{t('duration')}: {selectedItem.duration} {t('hours')}</li>}
              {hasValue(selectedItem?.guide?.name) && <li>🧭 {t('guide')}: {selectedItem.guide.name}</li>}
            </ul>
          </Col>
        )}

        {/* Hotel-specific col */}
        {type === 'hotel' && (hasValue(selectedItem?.class) || hasValue(selectedItem?.style)) && (
          <Col>
            <ul>
              {hasValue(selectedItem?.class) && <li>⭐ Class: {selectedItem.class}</li>}
              {hasValue(selectedItem?.style) && <li>🎨 Style: {selectedItem.style}</li>}
            </ul>
          </Col>
        )}

        {/* Restaurant-specific col */}
        {type === 'restaurant' && (hasValue(selectedItem?.cuisine) || hasValue(selectedItem?.property_type)) && (
          <Col>
            <ul style={{ display: 'flex', gap: '1.5em', flexWrap: 'nowrap', listStyle: 'none', padding: 0, margin: 0 }}>
              {hasValue(selectedItem?.cuisine) && <li style={{ whiteSpace: 'nowrap' }}>🍽️ {t('cuisine')}: {translateListValue(t, selectedItem.cuisine)}</li>}
              {hasValue(selectedItem?.property_type) && <li style={{ whiteSpace: 'nowrap' }}>🏠 {t('type')}: {translateListValue(t, selectedItem.property_type)}</li>}
            </ul>
          </Col>
        )}

        {/* Flight style col */}
        {type === 'flight' && hasValue(selectedItem?.style) && (
          <Col>
            <ul>
              <li>💺 {t('class') || 'Class'}: {selectedItem.style}</li>
            </ul>
          </Col>
        )}
      </Row>

      <Row className={style.info}>
        <Col md={7}>
          <ErrorBoundary>
            <ImageGallery images={selectedItem?.images || []} />
          </ErrorBoundary>
        </Col>
        <Col md={5}>
          <ErrorBoundary>
            <DetialtripCard trip={selectedItem} loading={itemLoading} reservable_type={type} />
          </ErrorBoundary>
        </Col>
      </Row>

      <ErrorBoundary>
        <ContainerCatCard type={type} />
      </ErrorBoundary>

      <div className="mt-20 border-t border-gray-100 dark:border-gray-800 pt-16 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-2 block">
                Community Feedback
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-0">
                Customer Reviews
              </h2>
            </div>
            {itemReviews.length > 0 && (
              <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-50 dark:border-gray-700">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={18} fill={itemRating != null && s <= Math.round(itemRating) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                {itemRating != null ? (
                  <span className="font-bold text-gray-800 dark:text-gray-200">{itemRating} / 5.0</span>
                ) : null}
              </div>
            )}
          </div>

          <Row className="g-5">
            {/* Left: Review List */}
            <Col lg={7}>
              <div className="space-y-6">
                {reviewLoading || itemLoading ? (
                  [1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse bg-slate-100 dark:bg-slate-800 h-32 rounded-2xl w-full" />
                  ))
                ) : (itemReviews || []).length > 0 ? (
                  <ErrorBoundary>
                    <div className="grid gap-6">
                      {(itemReviews || []).map((review) => (
                        <CommentCard
                          key={review.id}
                          name={review.user?.name || 'Anonymous'}
                          image={review.user?.avatar || review.user?.image?.url}
                          description={review.comment}
                          rating={review.rate}
                          date={review.created_at}
                        />
                      ))}
                    </div>
                    {(itemReviews || []).length < (allReviews || []).filter((r) => r.reviewable_id === Number(id) && r.reviewable_type?.toLowerCase().split('\\').pop() === type).length && (
                      <div className="mt-10 text-center">
                        <button
                          className="bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-gray-750 transition-all shadow-sm"
                          onClick={handleLoadMore}
                        >
                          Load More Reviews
                        </button>
                      </div>
                    )}
                  </ErrorBoundary>
                ) : (
                  <div className="relative overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 rounded-[2.5rem] p-16 text-center shadow-2xl shadow-slate-500/5 group">
                    {/* Background glow */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-slate-200/30 dark:bg-slate-800/20 rounded-full blur-[80px] group-hover:bg-blue-200/20 transition-colors duration-700"></div>

                    <div className="relative z-10">
                      <div className="w-24 h-24 bg-white/80 dark:bg-slate-800/80 text-slate-300 dark:text-slate-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm border border-white dark:border-slate-700/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <MessageSquare size={40} strokeWidth={1} />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-3">No reviews yet</h4>
                      <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto font-medium leading-relaxed">
                        Be the first to share your journey and help other travelers explore!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Col>

            {/* Right: Review Form */}
            <Col lg={5}>
              <div className="sticky top-24">
                <ReviewForm
                  type={type}
                  id={selectedItem?.id || id}
                  onReviewSubmitted={refetchReviews}
                  selectedItem={selectedItem}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>

    </Container>
  );
};

export default DetialItem;
