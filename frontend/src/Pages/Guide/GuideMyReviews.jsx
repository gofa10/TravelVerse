import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import api from '../../Radux/axios';

function Stars({ rating }) {
  const filled = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));

  return (
    <div className="flex items-center gap-0.5 text-amber-500" aria-label={`Rating ${filled} out of 5`}>
      {[...Array(5)].map((_, idx) => (
        <span key={idx}>{idx < filled ? '★' : '☆'}</span>
      ))}
    </div>
  );
}

export default function GuideMyReviews() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [drafts, setDrafts] = useState({});

  const { data, isLoading, isError } = useQuery({
    queryKey: ['guide-reviews'],
    queryFn: async () => {
      const res = await api.get('/guide/reviews');
      return res.data?.data || res.data || [];
    },
  });

  const replyMutation = useMutation({
    mutationFn: async ({ id, reply }) => {
      const res = await api.post(`/guide/reviews/${id}/reply`, { reply });
      return res.data?.data || res.data;
    },
    onSuccess: () => {
      toast.success(t('success'));
      queryClient.invalidateQueries({ queryKey: ['guide-reviews'] });
    },
    onError: (error) => toast.error(error.response?.data?.message || t('error_occurred')),
  });

  const reviews = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.data?.items)
      ? data.data.items
      : [];

  return (
    <div style={{ marginTop: '16px' }} className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('review')}</h1>
      </div>

      {isLoading ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-gray-600 dark:text-gray-300">{t('loading_reviews')}</div>
      ) : isError ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-red-600 dark:text-red-400">{t('error_occurred')}</div>
      ) : reviews.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm text-center py-16 text-gray-400 dark:text-gray-500">
          <p className="text-lg font-medium">{t('no_reviews_yet')}</p>
          <p className="text-sm mt-1">New traveler feedback will appear here</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-2 gap-4">
                <span className="font-semibold text-gray-800 dark:text-white">{review.user?.name || 'User'}</span>
                <Stars rating={review.rate} />
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Trip: {review.reviewable?.name_en || review.reviewable?.name_ar || 'N/A'}
              </p>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{review.comment || '-'}</p>

              {review.reply ? (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-200">
                  <span className="font-medium text-blue-600 dark:text-blue-400">Your reply: </span>
                  {review.reply}
                </div>
              ) : (
                <div className="space-y-2">
                  <textarea
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm dark:bg-gray-900 dark:text-white"
                    rows={3}
                    value={drafts[review.id] ?? ''}
                    onChange={(e) => setDrafts((prev) => ({ ...prev, [review.id]: e.target.value }))}
                    placeholder="Write your reply..."
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => replyMutation.mutate({ id: review.id, reply: drafts[review.id] ?? '' })}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all"
                    >
                      Save Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
