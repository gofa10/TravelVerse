import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Utility/Navbar/Navbar';
import GuideSidebar from './GuideSidebar';

export default function GuideDashboard() {
  return (
    <div className="min-h-screen">
      <Header />
      <GuideSidebar />
      <main
        className="ml-52 min-h-screen bg-gray-100 dark:bg-gray-900"
        style={{ paddingTop: '72px' }}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
