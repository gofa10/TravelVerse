import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useToggleWatchlist } from '../../Hooks/useWatchlist';
import LoginPromptModal from '../LoginPromptModal';

const WatchlistButton = ({ type, id, className, title: itemName }) => {
  const navigate = useNavigate();
  const { isFavorited, toggle } = useToggleWatchlist(type, id);
  const [loading, setLoading] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);

  const handle = async (e) => {
    e?.stopPropagation?.();
    e?.preventDefault?.();

    const token = localStorage.getItem('token');
    const isAuthenticated = token && token !== 'undefined' && token !== 'null';

    if (!isAuthenticated) {
      setPromptOpen(true);
      return;
    }

    try {
      setLoading(true);
      await toggle(itemName);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoginPromptModal
        open={promptOpen}
        onClose={() => setPromptOpen(false)}
        onGoLogin={() => { setPromptOpen(false); navigate('/login'); }}
        type="wishlist"
      />

      <IconButton
        onClick={handle}
        className={className}
        disabled={loading}
        aria-label={isFavorited ? 'remove from watchlist' : 'add to watchlist'}
        style={{
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '6px',
          width: '32px',
          height: '32px',
        }}
      >
        {isFavorited ? (
          <FavoriteIcon style={{ fontSize: '18px', color: '#ff4d4d' }} />
        ) : (
          <FavoriteBorderIcon style={{ fontSize: '18px' }} />
        )}
      </IconButton>
    </>
  );
};

export default WatchlistButton;
