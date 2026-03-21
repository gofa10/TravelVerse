import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, House, CalendarCheck, Heart, Star, Settings, LogOut, User as UserIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../Radux/authSlice';
import api from '../../Radux/axios';

const UserSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ name: 'User', email: '', avatar: null });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await api.get('/user');
        setUser({
          name: res.data.name || 'User',
          email: res.data.email || '',
          avatar: res.data.image?.url || null
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
    { to: "/", label: "Home", icon: <Home size={20} /> },
    { to: "/user", label: "Overview", icon: <House size={20} />, end: true },
    { to: "/user/reservations", label: "My Reservations", icon: <CalendarCheck size={20} /> },
    { to: "/user/favorites", label: "My Favorites", icon: <Heart size={20} /> },
    { to: "/user/reviews", label: "My Reviews", icon: <Star size={20} /> },
    { to: "/user/profile", label: "Profile Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 flex-shrink-0 hidden md:block">
      <div className="sticky top-[64px] bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 h-[calc(100vh-64px)] flex flex-col border border-gray-100 dark:border-gray-700">

        {/* User Info */}
        <div className="flex flex-col items-center justify-center py-6 border-b border-gray-100 dark:border-gray-700">
          {user.avatar ? (
            <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-4 border-blue-50 shadow-sm mb-3" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold shadow-sm mb-3">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <h3 className="font-bold text-gray-800 dark:text-white text-lg truncate w-11/12 text-center">{user.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate w-11/12 text-center">{user.email}</p>
        </div>

        {/* Navigation */}
        <ul className="flex-1 overflow-y-auto mt-6 space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium
                  ${isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750 hover:text-gray-900 dark:hover:text-white border-l-4 border-transparent'
                  }
                `}
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Action Bottom */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserSidebar;
