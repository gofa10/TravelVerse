import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Home, Map, Calendar, MessageCircle, Settings, LogOut } from 'lucide-react';
import { logout } from '../../Radux/authSlice';
import { useTranslation } from 'react-i18next';
import api from '../../Radux/axios';

export default function GuideSidebar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: 'Guide', email: '', avatar: null });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await api.get('/profile');
        const userData = res.data?.data || res.data || {};
        setUser({
          name: userData.name || 'Guide',
          email: userData.email || '',
          avatar: userData.image?.url || null
        });
      } catch (err) {
        console.error("Failed to fetch guide data for sidebar", err);
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
    { to: "/", label: "home", icon: <Home size={20} />, end: true },
    { to: "/guide/trips", label: "my_trips", icon: <Map size={20} /> },
    { to: "/guide/reservations", label: "reservations", icon: <Calendar size={20} /> },
    { to: "/guide/reviews", label: "reviews", icon: <MessageCircle size={20} /> },
    { to: "/guide/profile", label: "profile_settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside
      className="fixed left-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col z-40"
      style={{ top: '64px', height: 'calc(100vh - 64px)' }}
    >
      <div className="flex flex-col h-full p-4">
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
        <nav className="flex-1 overflow-y-auto space-y-3 mt-2 px-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
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
          ))}
        </nav>

        {/* Action Bottom */}
        <div className="mt-auto pt-4 px-2 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium text-sm text-red-500 hover:text-red-600"
          >
            <LogOut size={20} />
            <span>{t('logout')}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
