// Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import navbarStyles from './Main.module.css'; // تم ربطه بملف الـ CSS الموحد

const Navbar = ({ toggleSidebar, isSidebarHidden }) => { // تم إضافة props للتحكم في الـ sidebar
  const { t } = useTranslation();
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSearchFormActive, setIsSearchFormActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const searchButtonRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchButtonIconRef = useRef(null);
  const searchFormRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    // Handle Dark Mode toggle
    if (isDarkMode) {
      document.body.classList.add(navbarStyles.dark);
    } else {
      document.body.classList.remove(navbarStyles.dark);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close notification menu if clicked outside
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotificationMenu(false);
      }
      // Close profile menu if clicked outside
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearchButtonClick = (e) => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      setIsSearchFormActive(prev => !prev);
    }
  };

  const handleNotificationClick = () => {
    setShowNotificationMenu(prev => !prev);
    setShowProfileMenu(false); // Close profile menu when notification opens
  };

  const handleProfileClick = () => {
    setShowProfileMenu(prev => !prev);
    setShowNotificationMenu(false); // Close notification menu when profile opens
  };

  const handleDarkModeToggle = (e) => {
    setIsDarkMode(e.target.checked);
  };

  return (
    <nav className={navbarStyles.navbar}> {/* إضافة كلاس لتحديد الـ scope */}
      {/* تم تغيير icon الـ menu عشان يتم التحكم فيه من الأب Dashboard component */}
      {/* <i className={`bx bx-menu bx-sm ${navbarStyles.bxMenu}`} onClick={toggleSidebar}></i> */}
      <a href="#" className={navbarStyles['nav-link']}>{t('categories')}</a>
      <form action="#" className={isSearchFormActive ? navbarStyles.show : ''} ref={searchFormRef}>
        <div className={navbarStyles['form-input']}>
          <input type="search" placeholder={t('search_dots')} ref={searchInputRef} />
          <button type="submit" className={navbarStyles['search-btn']} onClick={handleSearchButtonClick} ref={searchButtonRef}>
            <i className={`bx ${isSearchFormActive ? 'bx-x' : 'bx-search'}`} ref={searchButtonIconRef}></i>
          </button>
        </div>
      </form>

      <input type="checkbox" className={navbarStyles.checkbox} id="switch-mode" hidden onChange={handleDarkModeToggle} checked={isDarkMode} />
      <label className={navbarStyles['swith-lm']} htmlFor="switch-mode">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
        <div className={navbarStyles.ball}></div>
      </label>

      <a href="#" className={navbarStyles.notification} onClick={handleNotificationClick} ref={notificationRef}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></svg>
        <span className={navbarStyles.num}>8</span>
      </a>
      <div className={`${navbarStyles['notification-menu']} ${showNotificationMenu ? navbarStyles.show : ''}`}>
        <ul>
          <li>{t('new_msg_john')}</li>
          <li>{t('order_shipped')}</li>
          <li>{t('new_comment_post')}</li>
          <li>{t('update_app_available')}</li>
          <li>{t('reminder_meeting_3pm')}</li>
        </ul>
      </div>

      <a href="#" className={navbarStyles.profile} onClick={handleProfileClick} ref={profileRef}>
        <img src="https://placehold.co/600x400/png" alt="Profile" />
      </a>
      <div className={`${navbarStyles['profile-menu']} ${showProfileMenu ? navbarStyles.show : ''}`}>
        <ul>
          <li><a href="#">{t('my_profile_label')}</a></li>
        </ul>
        <ul> {/* تم الفصل بين الـ li لوجود border-bottom */}
          <li><a href="#">{t('settings_label')}</a></li>
          <li><a href="#">{t('logout_label')}</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
