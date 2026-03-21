// FavoriteButton.jsx
import React, { useEffect, useState, useRef } from 'react';
import api from '../../Radux/axios'; // عدّل المسار حسب مشروعك
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';

const modelMap = {
  trip: 'Trip',
  hotel: 'Hotel',
  restaurant: 'Restaurant',
  activity: 'Activity',
};

const FavoriteButton = ({ type, id }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const favoriteId = useRef(null);

  const modelType = modelMap[type?.toLowerCase()];
  const favoritable_type = `App\\Models\\${modelType}`;

  // جلب حالة العنصر (مضاف أم لا)
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get('/favorites');
        const match = res.data.find(
          (f) => f.favoritable_id === id && f.favoritable_type === favoritable_type
        );
        if (match) {
          favoriteId.current = match.id;
          setIsFavorite(true);
        }
      } catch (err) {
        console.error('Failed to load favorites:', err);
      }
    };

    if (type && id) {
      fetchFavorites();
    }
  }, [type, id]);

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${favoriteId.current}`);
        toast.success('Removed from wishlist');
        setIsFavorite(false);
        favoriteId.current = null;
      } else {
        const res = await api.post('/favorites', {
          favoritable_id: id,
          favoritable_type,
        });
        toast.success('Added to wishlist');
        favoriteId.current = res.data.id;
        setIsFavorite(true);
      }
    } catch (err) {
      if (err.response?.status === 409) {
        toast('Already in wishlist');
        setIsFavorite(true);
      } else {
        toast.error('Action failed');
        console.error(err);
      }
    }
  };

  return (
    <Button
      variant={isFavorite ? 'outline-danger' : 'outline-primary'}
      size="sm"
      onClick={handleToggleFavorite}
      className="mt-2"
    >
      {isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
    </Button>
  );
};

export default FavoriteButton;
