import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, House, CalendarCheck, Heart, Map, Star, Settings, LogOut, User as UserIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../Radux/authSlice';
import api from '../../Radux/axios';
import { useTranslation } from 'react-i18next';

const UserSidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ name: 'User', email: '', avatar: null });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await api.get('/profile');
        const userData = res.data?.data || res.data || {};
        setUser({
          name: userData.name || 'User',
          email: userData.email || '',
          avatar: userData.image?.url || null
        });
      } catch (err) {
        console.error("Failed to fetch user data for sidebar", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate('/login');
  };

  const links = [
    { to: "/", label: "home", icon: <Home size={20} /> },
    { to: "/user", label: "overview", icon: <House size={20} />, end: true },
    { to: "/user/reservations", label: "my_reservations", icon: <CalendarCheck size={20} /> },
    { to: "/user/trip-builder", label: "trip_builder", icon: <Map size={20} /> },
    { to: "/user/favorites", label: "my_favorites", icon: <Heart size={20} /> },
    { to: "/user/reviews", label: "my_reviews", icon: <Star size={20} /> },
    { to: "/user/profile", label: "profile_settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 flex-shrink-0 hidden md:block border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="sticky top-[64px] h-[calc(100vh-64px)] flex flex-col p-4">

        {/* User Info */}
        <div className="flex items-center gap-3 pt-4 pb-6 px-4">
          {user.avatar ? (
            <img src={user.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover shadow-sm bg-gray-100" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold shadow-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <h3 className="font-bold text-gray-800 dark:text-white text-base truncate">{user.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          </div>
        </div>

        <div className="w-full h-px bg-gray-100 dark:bg-gray-800 mb-4 px-4"></div>

        {/* Navigation */}
        <ul className="flex-1 overflow-y-auto space-y-3 mt-2 px-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm
                  ${isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                {link.icon}
                <span>{t(link.label)}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Action Bottom */}
        <div className="mt-auto pt-4 px-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium text-sm"
          >
            <LogOut size={20} />
            <span>{t('logout')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserSidebar;
