import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Quote } from 'lucide-react';
import useImageFallback from '../../Components/Common/useImageFallback.jsx';

const CommentCard = ({ name, image, description, rating, date }) => {
  const { t } = useTranslation();
  const { src: safeAvatarSrc, onError: handleAvatarError } = useImageFallback(image);

  return (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 p-6 rounded-2xl relative transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-lg hover:shadow-blue-500/5 group">
      {/* Quote Icon Background */}
      <div className="absolute top-4 right-6 text-gray-50 dark:text-gray-800 pointer-events-none group-hover:text-blue-50 dark:group-hover:text-blue-900/20 transition-colors">
        <Quote size={48} fill="currentColor" />
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        {/* Header: Avatar, Name, Stars */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={safeAvatarSrc}
                alt={name ?? 'User avatar'}
                className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                onError={handleAvatarError}
                loading="lazy"
              />
              {/* Optional: Verified badge if we had one */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 scale-75">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-gray-800 dark:text-white text-base m-0 leading-tight">
                {name || 'Traveler'}
              </h5>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={star <= (rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 dark:text-gray-700'}
                  />
                ))}
              </div>
            </div>
          </div>

          {date && (
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900/50 px-3 py-1 rounded-full">
              {new Date(date).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="mt-2">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">
            "{t(description)}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CommentCard);
