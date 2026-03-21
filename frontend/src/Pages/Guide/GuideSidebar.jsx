import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Calendar, Home, LogOut, Map, MessageCircle, User } from 'lucide-react';
import { logout } from '../../Radux/authSlice';

const linkClassName = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${isActive
    ? 'bg-blue-600 text-white'
    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
  }`;

export default function GuideSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <aside
      className="fixed left-0 w-52 bg-white dark:bg-gray-800 shadow-sm flex flex-col justify-between z-40 overflow-y-auto"
      style={{ top: '72px', height: 'calc(100vh - 72px)' }}
    >
      <div>
        <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Guide</h2>
        </div>

        <nav className="flex flex-col gap-2 p-4 mt-3">
          <NavLink to="/" className={linkClassName}>
            <Home className="w-5 h-5" />
            Home
          </NavLink>

          <NavLink to="/guide/trips" className={linkClassName}>
            <Map className="w-5 h-5" />
            My Trips
          </NavLink>

          <NavLink to="/guide/reservations" className={linkClassName}>
            <Calendar className="w-5 h-5" />
            Reservations
          </NavLink>

          <NavLink to="/guide/reviews" className={linkClassName}>
            <MessageCircle className="w-5 h-5" />
            Reviews
          </NavLink>

          <NavLink to="/guide/profile" className={linkClassName}>
            <User className="w-5 h-5" />
            Profile
          </NavLink>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
