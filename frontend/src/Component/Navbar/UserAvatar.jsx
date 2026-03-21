import React, { useState } from 'react';
import person from '../../Assets/images/aaaaaaaaaaaa.png';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Radux/authSlice';
import { hasValidToken } from '../../Utility/authToken';
import {
  MenuItem,
  Tooltip,
  Avatar,
  Box,
  IconButton,
  Menu,
} from '@mui/material';

const UserAvatar = () => {
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = hasValidToken();

  const openMenu = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="User Settings">
        <IconButton sx={{ p: 0 }} onClick={openMenu}>
          <Avatar alt="User Avatar" src={person} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={closeMenu}
      >
        {user && (
          <MenuItem
            component={Link}
            to={user.user_type === 'admin' ? '/admin' : user.user_type === 'tour_guide' ? '/guide' : '/user'}
            onClick={closeMenu}
          >
            Dashboard
          </MenuItem>
        )}

        {user && user.user_type === 'user' && (
          <MenuItem component={Link} to="/user/reservations" onClick={closeMenu}>
            My Reservations
          </MenuItem>
        )}
        {!user ? (
          <MenuItem component={Link} to="/login" onClick={closeMenu}>
            Login
          </MenuItem>
        ) : (
          <MenuItem onClick={handleLogout}>
            Logout
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default UserAvatar;
