import React, { useEffect, useState } from 'react';
import styles from './UserManagement.module.css';
import { useTranslation } from 'react-i18next';

export default function GuideCreateModal({ isOpen, onClose, onSubmit, isSaving }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null,
  });

  useEffect(() => {
    if (!isOpen) return;
    setForm({
      name: '',
      email: '',
      password: '',
      avatar: null,
    });
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose} aria-label="Close">×</span>
        <h2>{t('create_tour_guide')}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="guide-name">{t('name')}</label>
          <input id="guide-name" type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />

          <label htmlFor="guide-email">{t('email')}</label>
          <input id="guide-email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />

          <label htmlFor="guide-password">Password</label>
          <input id="guide-password" type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required />

          <label htmlFor="guide-avatar">Profile Image (optional)</label>
          <input id="guide-avatar" type="file" accept="image/*" onChange={(e) => setForm((p) => ({ ...p, avatar: e.target.files?.[0] || null }))} />

          <button type="submit" className={styles.modalButton} disabled={isSaving}>
            {isSaving ? t('loading') : t('create_tour_guide')}
          </button>
        </form>
      </div>
    </div>
  );
}
