import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import styles from '../Admin/UserMang/UserManagement.module.css';

const DeleteAccount = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm(t('confirm_delete'))) {
      // simulate delete
      toast.success(t('success'));
      navigate('/login');
    }
  };

  return (
    <div className={styles.card}>
      <h2>{t('delete_account')}</h2>
      <p>{t('proceed_with_caution')}</p>
      <button className={styles.dangerButton} onClick={handleDelete}>{t('delete_my_account')}</button>
    </div>
  );
};

export default DeleteAccount;
