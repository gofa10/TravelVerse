import axios from 'axios';

import { clearAuth, getToken, isValidToken } from '../Utility/authToken';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL + '',
});

// Auto-attach token to every request
api.interceptors.request.use((config) => {
  const token = getToken();
  const language = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null;

  if (!config.headers['Accept-Language']) {
    config.headers['Accept-Language'] = language || 'en';
  }

  if (isValidToken(token)) {
    // Prevent duplicate Bearer if already set
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear storage
      clearAuth();
    }
    return Promise.reject(error);
  }
);

export default api;
