import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import api from '../../Radux/axios';
import { useDispatch } from 'react-redux';
import { updateUserAvatar } from '../../../src/Radux/authSlice';

const ProfileSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatar: null,
    preview: null,
    serverImage: null,
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/user');
        setProfile(prev => ({
          ...prev,
          name: res.data.name,
          email: res.data.email,
          serverImage: res.data.image?.url || null,
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files.length > 0) {
      setProfile(prev => ({ ...prev, avatar: files[0], preview: URL.createObjectURL(files[0]) }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    if (profile.avatar instanceof File) formData.append('avatar', profile.avatar);

    try {
      const res = await api.post('/update-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(t('profile.profileUpdated'));
      setProfile(prev => ({ ...prev, preview: null, avatar: null, serverImage: res.data.user?.image?.url || prev.serverImage }));
      if (res.data.user?.image?.url) {
        dispatch(updateUserAvatar(res.data.user.image.url));
      }
    } catch (err) {
      if (err.response?.status === 422 && err.response.data?.errors) {
        const messages = Object.values(err.response.data.errors).flat().join('\n');
        toast.error(messages);
      } else {
        toast.error(err.response?.data?.message || 'Failed to update profile');
      }
    }
  };

  const handlePasswordChange = e => setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handlePasswordSubmit = async e => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return toast.error(t('profile.passwordMismatch'));

    try {
      await api.post(
        '/change-password',
        { current: passwords.current, new: passwords.new, new_confirmation: passwords.confirm }
      );
      toast.success(t('profile.passwordChanged'));
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm(t('profile.deleteConfirm'))) return;
    try {
      await api.delete('/delete-account');
      toast.success(t('profile.deleteAccount'));
      localStorage.clear();
      window.location.href = '/login';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete account');
    }
  };

  const removeAvatar = async () => {
    try {
      await api.delete('/profile/avatar');

      setProfile(prev => ({ ...prev, avatar: null, preview: null, serverImage: null }));
      dispatch(updateUserAvatar(null));

      toast.success(t('profile.avatarRemoved') || 'Profile picture removed successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove profile picture');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 w-full space-y-8">
      {/* Avatar */}
      {(profile.preview || profile.serverImage) && (
        <div className="flex justify-center">
          <img
            className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-lg object-cover"
            src={profile.preview || profile.serverImage}
            alt="Avatar"
          />
        </div>
      )}

      <div className=' flex flex-col'>
        <div className="flex flex-col flex-1 space-y-6">
          <h2 className="text-2xl font-bold text-center">{t('profile.title')}</h2>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-white font-semibold mb-1">{t('profile.name')}</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-white font-semibold mb-1">{t('profile.email')}</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-white font-semibold mb-1">{t('profile.avatar')}</label>
              <div className="relative">
                <input
                  type="file"
                  name="avatar"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-300">
                      <span className="font-semibold">{t('profile.clickToUpload') || 'Click to upload'}</span>
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-400">PNG, JPG, GIF (MAX. 2MB)</p>
                  </div>
                </label>
              </div>
              {profile.preview && (
                <div className="flex items-center justify-center gap-3 mt-3">
                  <img src={profile.preview} alt="Preview" className="w-12 h-12 rounded-full object-cover border-2 border-blue-500" />
                  <button
                    type="button"
                    onClick={removeAvatar}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    {t('profile.removeAvatar')}
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              {t('profile.saveChanges')}
            </button>
          </form>

        </div>
        {/* Password Form */}
        <div className="flex flex-col flex-1 space-y-6">
          <h2 className="text-xl font-bold">{t('profile.changePassword')}</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-white font-semibold mb-1">{t('profile.currentPassword')}</label>
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-white font-semibold mb-1">{t('profile.newPassword')}</label>
              <input
                type="password"
                name="new"
                value={passwords.new}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-white font-semibold mb-1">{t('profile.confirmNewPassword')}</label>
              <input
                type="password"
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded mt-3 font-semibold hover:bg-green-700 transition"
            >
              {t('profile.saveChanges')}
            </button>
          </form>
        </div>

      </div>
      {/* Delete Account */}
      {/* <button
        onClick={handleDeleteAccount}
        className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
      >
        {t('profile.deleteAccount')}
      </button> */}
    </div>
  );
};

export default ProfileSettings;
