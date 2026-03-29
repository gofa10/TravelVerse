import { useEffect, useMemo, useState } from 'react';
import warmTravelFallback from '../../assets/warm-travel-fallback.svg';
import { isCorsBlockedImageHost, normalizeStorageAssetUrl } from '../../Utility/envUtils.js';

const EMPTY_DATA_URI =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

export default function useImageFallback(source, fallbackSrc = warmTravelFallback) {
  const normalizedSrc = useMemo(() => {
    if (typeof source === 'string' && source.trim().length > 0) {
      const resolvedSource = normalizeStorageAssetUrl(source);
      if (isCorsBlockedImageHost(resolvedSource)) {
        return fallbackSrc;
      }
      return resolvedSource;
    }
    return fallbackSrc;
  }, [source, fallbackSrc]);

  const [currentSrc, setCurrentSrc] = useState(normalizedSrc);

  useEffect(() => {
    setCurrentSrc(normalizedSrc);
  }, [normalizedSrc]);

  const handleImageError = (event) => {
    const target = event?.currentTarget || event?.target;
    if (!target) {
      setCurrentSrc(fallbackSrc);
      return;
    }

    if (target.src === fallbackSrc || target.src.endsWith('warm-travel-fallback.svg')) {
      target.onerror = null;
      target.src = EMPTY_DATA_URI;
      return;
    }

    target.onerror = null;
    target.src = fallbackSrc;
    setCurrentSrc(fallbackSrc);
  };

  return {
    src: currentSrc,
    fallbackSrc,
    onError: handleImageError,
  };
}
