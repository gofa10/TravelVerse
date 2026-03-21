import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import Header from '../../Utility/Navbar/Navbar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
      {/* Fixed Navbar — 64px tall via MUI Toolbar minHeight */}
      <Header />

      {/* marginTop: 64px guarantees content starts exactly below the fixed navbar */}
      {/* Flex container with fixed space for the navbar */}
      <div className="flex min-h-screen bg-slate-50 dark:bg-gray-900" style={{ paddingTop: '64px' }}>
        {/* LEFT: Sidebar */}
        <UserSidebar />

        {/* RIGHT: Main Content */}
        <main className="flex-1 overflow-y-auto p-8" style={{ paddingTop: '80px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;


