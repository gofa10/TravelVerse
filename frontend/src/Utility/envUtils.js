/**
 * Environment utilities for consistent URL handling across the app
 */

export const getStorageBaseUrl = () => {
  // In dev, prefer same-origin via Vite proxy to avoid CORS on /storage assets.
  if (import.meta.env.DEV && !import.meta.env.VITE_STORAGE_BASE_URL) {
    return '';
  }

  // Use dedicated storage URL if available, otherwise derive from API URL
  const baseUrl = import.meta.env.VITE_STORAGE_BASE_URL ||
    (import.meta.env.VITE_API_BASE_URL || '').split('/api')[0] ||
    'http://localhost:8000';

  // Return base URL without trailing slash - paths from API should handle the rest
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
};

export const getStorageUrl = (path) => {
  const baseUrl = getStorageBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}/storage${cleanPath}`;
};

export const getApiOrigin = () => {
  return (import.meta.env.VITE_API_BASE_URL || '').replace('/api', '') ||
    'http://localhost:8000';
};

export const normalizeStorageAssetUrl = (url) => {
  if (typeof url !== 'string' || !url.trim()) {
    return url;
  }

  const trimmedUrl = url.trim();

  if (trimmedUrl.startsWith('/storage/') || trimmedUrl.startsWith('storage/')) {
    return getStorageUrl(trimmedUrl.replace(/^\/?storage\/?/, ''));
  }

  if (!trimmedUrl.startsWith('http')) {
    return trimmedUrl;
  }

  if (!import.meta.env.DEV || import.meta.env.VITE_STORAGE_BASE_URL) {
    try {
      const parsed = new URL(trimmedUrl);
      if (parsed.hostname.endsWith('cloudfront.net')) {
        const apiOrigin = getApiOrigin();
        return `${apiOrigin}/api/image-proxy?url=${encodeURIComponent(trimmedUrl)}`;
      }
    } catch {
      return trimmedUrl;
    }
    return trimmedUrl;
  }

  const apiOrigin = getApiOrigin();

  try {
    const parsed = new URL(trimmedUrl);
    if (parsed.hostname.endsWith('cloudfront.net')) {
      const apiOrigin = getApiOrigin();
      return `${apiOrigin}/api/image-proxy?url=${encodeURIComponent(trimmedUrl)}`;
    }
    if (parsed.origin === apiOrigin && parsed.pathname.startsWith('/storage/')) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch {
    return trimmedUrl;
  }

  return trimmedUrl;
};

const CORS_BLOCKED_IMAGE_HOSTS = new Set([
  'd1bv4heaa2n05k.cloudfront.net',
]);

export const isCorsBlockedImageHost = (url) => {
  if (typeof url !== 'string' || !url.trim().startsWith('http')) {
    return false;
  }

  try {
    const parsed = new URL(url.trim());
    return CORS_BLOCKED_IMAGE_HOSTS.has(parsed.hostname);
  } catch {
    return false;
  }
};
