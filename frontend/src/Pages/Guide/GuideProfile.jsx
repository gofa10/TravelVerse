import React from 'react';
import { useTranslation } from 'react-i18next';
import ProfileSettings from '../User/ProfileSettings';

export default function GuideProfile() {
  const { t } = useTranslation();
  return (
    <div style={{ marginTop: '16px' }} className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('profile_settings')}</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 [&>div]:bg-transparent [&>div]:shadow-none [&>div]:p-0">
        <ProfileSettings />
      </div>
    </div>
  );
}
