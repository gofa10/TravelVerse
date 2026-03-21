import React from 'react';
import { Menu, MenuItem, IconButton, ListItemText, ListItemAvatar, Avatar, Typography, Box, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWatchlist as useWL, useRemoveFavorite } from '../../Hooks/useWatchlist';

const modelToTypeMap = {
  'App\\Models\\Trip': 'trip',
  'App\\Models\\Hotel': 'hotel',
  'App\\Models\\Restaurant': 'restaurant',
  'App\\Models\\Activity': 'activity',
  'App\\Models\\Cruise': 'cruise',
  'App\\Models\\Car': 'car',
  'App\\Models\\Flight': 'flight',
};

const getTypeFromFavorite = (f) => {
  const model = f.favoritable_type || f.reservable_type;
  return modelToTypeMap[model] || 'trip';
};

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const WatchlistDropdown = ({ anchorEl, open, onClose }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const { data: favorites = [], isLoading } = useWL();
  const remove = useRemoveFavorite();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      disableScrollLock
      TransitionProps={{ timeout: 0 }}
      PaperProps={{
        sx: {
          width: 380,
          maxHeight: 500,
          borderRadius: "16px",
          marginTop: "12px",
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          '&.dark': {
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }
        },
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
          px: 2.5,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <FavoriteIcon sx={{ fontSize: 22 }} />
          <Typography fontWeight="700" variant="subtitle1" sx={{ letterSpacing: '0.5px' }}>
            My Favorites
          </Typography>
        </Box>
        {favorites.length > 0 && (
          <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 600, background: 'rgba(255,255,255,0.2)', px: 1, py: 0.2, borderRadius: '4px' }}>
            {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
          </Typography>
        )}
      </Box>

      <Box sx={{ p: 1, maxHeight: 400, overflowY: 'auto' }}>
        <AnimatePresence>
          {open && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {isLoading && (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Loading your favorites…</Typography>
                </Box>
              )}

              {!isLoading && !token && (
                <MenuItem
                  component={Link}
                  to="/login"
                  onClick={onClose}
                  sx={{ borderRadius: '12px', m: 0.5 }}
                >
                  <ListItemText
                    primary="Welcome back!"
                    secondary="Log in to see your favorites"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </MenuItem>
              )}

              {!isLoading && token && favorites.length === 0 && (
                <Box
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'rgba(239, 68, 68, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1
                    }}
                  >
                    <FavoriteIcon sx={{ fontSize: 30, color: '#ef4444', opacity: 0.4 }} />
                  </Box>
                  <Typography variant="body1" fontWeight={600} color="text.primary">
                    Your list is empty
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '200px' }}>
                    Save the places you love to find them easily later.
                  </Typography>
                </Box>
              )}

              {!isLoading &&
                favorites.map((f) => {
                  const source = f.favoritable || f.reservable || {};
                  const typeName = getTypeFromFavorite(f);
                  const itemId = f.reservable?.id ?? f.favoritable_id ?? f.reservable_id;

                  const image =
                    Array.isArray(source.images)
                      ? source.images[0]
                      : source.image || '/fallback.jpg';

                  const title =
                    source.name || source.title || source.name_en || 'Item';

                  return (
                    <motion.div key={f.id} variants={itemVariants}>
                      <MenuItem
                        component={Link}
                        to={`/itemdetail/${itemId}?type=${typeName}`}
                        onClick={onClose}
                        sx={{
                          borderRadius: '12px',
                          mx: 0.5,
                          my: 0.5,
                          py: 1.5,
                          px: 1.5,
                          transition: 'all 0.25s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(59, 130, 246, 0.08)',
                            transform: 'translateX(4px)',
                          },
                          '&:hover .remove-btn': {
                            opacity: 1,
                            transform: 'scale(1)',
                          },
                        }}
                      >
                        <Avatar
                          src={image}
                          variant="rounded"
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: '10px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            border: '2px solid white'
                          }}
                        />

                        <Box sx={{ flexGrow: 1, minWidth: 0, ml: 2 }}>
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            noWrap
                            sx={{ color: 'text.primary', mb: 0.5 }}
                          >
                            {title}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: '#3b82f6',
                                display: 'inline-block'
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                letterSpacing: '0.5px',
                                color: 'text.secondary',
                                fontSize: '0.65rem'
                              }}
                            >
                              {typeName}
                            </Typography>
                          </Box>
                        </Box>

                        <IconButton
                          className="remove-btn"
                          size="small"
                          sx={{
                            opacity: 0,
                            transform: 'scale(0.8)',
                            transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            color: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            '&:hover': {
                              backgroundColor: 'rgba(239, 68, 68, 0.2)',
                              transform: 'scale(1.1) !important',
                            },
                          }}
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            await remove.mutateAsync(f.id);
                          }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </MenuItem>
                    </motion.div>
                  );
                })}
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {favorites.length > 0 && (
        <>
          <Divider sx={{ opacity: 0.5 }} />
          <Box sx={{ p: 1.5, textAlign: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontStyle: 'italic',
                fontWeight: 500
              }}
            >
              Tip: Hover and click for more details
            </Typography>
          </Box>
        </>
      )}
    </Menu>
  );
};


export default WatchlistDropdown;
