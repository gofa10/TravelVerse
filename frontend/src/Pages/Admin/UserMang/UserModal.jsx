import React, { useState, useEffect } from 'react';
import styles from './UserManagement.module.css';
import { useTranslation } from 'react-i18next';

function UserModal({ isOpen, onClose, onSubmit, initialData }) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setRole(initialData.user_type);
      setPassword('');
    } else {
      setName('');
      setEmail('');
      setRole('');
      setPassword('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !role.trim()) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const data = { id: initialData?.id, name, email, user_type: role };
    if (!initialData && password.trim()) data.password = password;

    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose} aria-label="Close">×</span>
        <h2>{initialData ? 'Update User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">{t('name')}</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

          <label htmlFor="email">{t('email')}</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="role">{t('role')}</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value=""> Select Role </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {!initialData && (
            <>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </>
          )}

          <button type="submit" className={styles.modalButton}>{t('save')}</button>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
