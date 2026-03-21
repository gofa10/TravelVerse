import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../Radux/axios';
import { useSelector } from 'react-redux';
import { hasValidToken } from '../Utility/authToken';

import { toast } from 'react-toastify';

const modelMap = {
  trip: 'App\\Models\\Trip',
  hotel: 'App\\Models\\Hotel',
  restaurant: 'App\\Models\\Restaurant',
  activity: 'App\\Models\\Activity',
  activitie: 'App\\Models\\Activity',
  cruise: 'App\\Models\\Cruise',
  car: 'App\\Models\\Car',
  flight: 'App\\Models\\Flight',
};

export const toFavoritableType = (type) => modelMap[type?.toLowerCase()] || type;

const fetchFavorites = async () => {
  const res = await api.get('/favorites');
  return res.data?.data ?? res.data;
};

export function useWatchlist() {
  const { user } = useSelector((state) => state.auth);
  const tokenOk = hasValidToken();

  return useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
    enabled: tokenOk && (user?.user_type === 'user' || user?.user_type === 'admin'),
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
}

export function useAddFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => api.post('/favorites', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['favorites'] }),
  });
}

export function useRemoveFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (favoriteId) => api.delete(`/favorites/${favoriteId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['favorites'] }),
  });
}

export function useToggleWatchlist(type, id) {
  const { data: favorites = [] } = useWatchlist();
  const add = useAddFavorite();
  const remove = useRemoveFavorite();

  const favoritable_type = toFavoritableType(type);

  const existing = favorites.find(
    (f) => f.favoritable_type === favoritable_type && Number(f.favoritable_id) === Number(id)
  );

  const isFavorited = !!existing;

  // Badge colors matching TypeBadge.jsx
  const typeColors = {
    trip: '#3b82f6',
    hotel: '#a855f7',
    restaurant: '#f97316',
    activity: '#22c55e',
    activitie: '#22c55e',
    cruise: '#06b6d4',
    car: '#ef4444',
    flight: '#6366f1',
  };

  const activeColor = typeColors[type?.toLowerCase()] || '#64748b';

  const toggle = async (itemName = '') => {
    try {
      if (isFavorited) {
        await remove.mutateAsync(existing.id);
        toast.info(
          <div className="flex items-center gap-3">
            <span style={{ fontSize: '20px' }}>🗑️</span>
            <div>
              <div className="font-bold">Removed from Favorites</div>
              {itemName && <div className="text-xs opacity-80">{itemName}</div>}
            </div>
          </div>,
          {
            style: { borderLeft: `6px solid ${activeColor}` },
            icon: false,
          }
        );
      } else {
        await add.mutateAsync({ favoritable_id: id, favoritable_type });
        toast.success(
          <div className="flex items-center gap-3">
            <span style={{ fontSize: '20px' }}>❤️</span>
            <div>
              <div className="font-bold">Added to Favorites!</div>
              {itemName && <div className="text-xs opacity-80">{itemName}</div>}
            </div>
          </div>,
          {
            style: { borderLeft: `6px solid ${activeColor}` },
            icon: false,
          }
        );
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update favorites');
    }
  };

  return { isFavorited, favoriteId: existing?.id, toggle, add, remove };
}

export default useWatchlist;
