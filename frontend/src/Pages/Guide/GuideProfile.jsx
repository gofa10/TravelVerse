import React from 'react';
import ProfileSettings from '../User/ProfileSettings';

export default function GuideProfile() {
  return (
    <div style={{ marginTop: '16px' }} className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Profile Settings</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 [&>div]:bg-transparent [&>div]:shadow-none [&>div]:p-0">
        <ProfileSettings />
      </div>
    </div>
  );
}
