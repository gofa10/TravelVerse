import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // مهم جداً استيراد Outlet
import Navbar from './Navbar';
import dashboardStyles from './Main.module.css';
import Sidebar from './Sidebar2';
import Header from '../../Utility/Navbar/Navbar';

const AdminDash = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarHidden(prev => !prev);
  };

  return (
    <div className={dashboardStyles.container}>
      <Sidebar isHidden={isSidebarHidden} toggleSidebar={toggleSidebar} />
      <Header />

      <section id="content" className={`${dashboardStyles.content} ${isSidebarHidden ? dashboardStyles.hide : ''} left-64! dark:bg-gray-900/80! `}>
        <div className="admin-sub-content top-15! relative!">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default AdminDash;
