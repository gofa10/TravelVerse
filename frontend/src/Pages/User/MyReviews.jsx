import React from 'react';
import { Star, Trash2, MessageCircle, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../Radux/axios';
import { toast } from 'react-toastify';
import ErrorBoundary from '../../Components/ErrorBoundary/ErrorBoundary';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SkeletonCard } from '../../Utility/Cards/ItemCard';

const UserReviews = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading, error } = useQuery({
    queryKey: ['my-reviews'],
    queryFn: () => api.get('/my-reviews').then((r) => r.data),
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (id) => api.delete(`/reviews/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-reviews'] });
      toast.success('Review removed successfully');
    },
    onError: (err) => {
      console.error(err);
      toast.error('Failed to delete review');
    },
  });

  const deleteReview = (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    deleteReviewMutation.mutate(id);
  };

  const getTypeSlug = (reviewableType) => {
    const model = reviewableType?.split('\\').pop()?.toLowerCase();
    const map = {
      trip: 'trip',
      hotel: 'hotel',
      restaurant: 'restaurant',
      activity: 'activity',
      flight: 'flight',
      car: 'car',
      cruise: 'cruise',
    };
    return map[model];
  };

  const getItemName = (review) => {
    const item = review?.reviewable;
    if (!item) return 'Deleted Item';
    if (review?.reviewable_type === 'App\\Models\\Flight') {
      const from = item.from_location;
      const to = item.to_location;
      return (from && to) ? `${from} → ${to}` : 'Flight';
    }
    return item.name || item.name_en || item.name_ar || item.title || 'Deleted Item';
  };

  const openReviewItem = (review) => {
    const type = getTypeSlug(review?.reviewable_type);
    const id = review?.reviewable_id;
    if (!type || !id || !review?.reviewable) return;
    navigate(`/itemdetail/${id}?type=${type}`);
  };

  if (isLoading) {
    return (
      <div className="grid gap-6">
        {[...Array(3)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-12 w-full flex flex-col justify-center items-center min-h-[400px]">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-2xl flex items-center justify-center mb-4">
          <Trash2 size={32} />
        </div>
        <p className="text-red-500 font-bold text-lg mb-2">Oops! Something went wrong</p>
        <p className="text-gray-500 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Your Reviews</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage all the feedback you've shared with the community.</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl border border-blue-100 dark:border-blue-800">
          <span className="text-blue-700 dark:text-blue-400 font-bold text-lg">{reviews.length}</span>
          <span className="text-blue-600/70 dark:text-blue-400/70 text-sm ml-2 font-medium">Total Reviews</span>
        </div>
      </div>

      <ErrorBoundary>
        {reviews.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-700 p-20 text-center">
            <div className="w-20 h-20 bg-slate-50 dark:bg-gray-900 text-slate-300 dark:text-gray-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No reviews yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">You haven't written any reviews yet.</p>
            <button
              onClick={() => window.location.href = '/trips'}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all transform hover:-translate-y-0.5"
            >
              Explore and Review
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {reviews.map(r => (
              <div key={r.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex flex-col md:flex-row">
                  {/* Left Accent Bar */}
                  <div className="w-full md:w-2 bg-blue-600" />

                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            {r.reviewable_type ? r.reviewable_type.split('\\').pop() : 'Travel'}
                          </span>
                          <div className="flex items-center gap-1 text-yellow-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                fill={star <= (r.rate || r.rating) ? 'currentColor' : 'none'}
                                className={star <= (r.rate || r.rating) ? '' : 'text-gray-200 dark:text-gray-700'}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <h3
                            className={`text-xl font-bold transition-colors ${
                              r.reviewable
                                ? 'text-gray-800 dark:text-white group-hover:text-blue-600 cursor-pointer'
                                : 'text-gray-800 dark:text-white'
                            }`}
                            onClick={() => openReviewItem(r)}
                          >
                            {getItemName(r)}
                          </h3>
                          {r.reviewable && (
                            <button
                              type="button"
                              className="text-blue-600 hover:text-blue-700 transition-colors"
                              onClick={() => openReviewItem(r)}
                              title="Open item"
                            >
                              <ExternalLink size={16} />
                            </button>
                          )}
                        </div>
                        {r.reviewable?.location && (
                          <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-sm mt-1">
                            <MapPin size={14} />
                            <span>{r.reviewable.location}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-sm bg-gray-50 dark:bg-gray-900/50 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                        <Calendar size={14} />
                        <span>{new Date(r.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4 mb-6 italic text-gray-600 dark:text-gray-300 border-l-4 border-slate-200 dark:border-slate-700">
                      "{r.comment}"
                    </div>

                    <div className="flex justify-end">
                      <button
                        className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                        onClick={() => deleteReview(r.id)}
                        disabled={deleteReviewMutation.isPending}
                      >
                        <Trash2 size={16} />
                        Delete Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default UserReviews;
