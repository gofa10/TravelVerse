import React from 'react';
import styles from './UserManagement.module.css'; // استخدام CSS Module
import { useTranslation } from 'react-i18next';

function UserTable({ users, onEdit, onDelete, onViewDetails }) {
  const { t } = useTranslation();
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className='dark:text-white!'>{t('id')}</th>
            <th className='dark:text-white!'>{t('name')}</th>
            <th className='dark:text-white!'>{t('email')}</th>
            <th className='dark:text-white!'>{t('role')}</th>
            <th className='dark:text-white!'>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className='dark:text-white!'>{user.id}</td>
              <td className='dark:text-white!'>{user.name}</td>
              <td className='dark:text-white!'>{user.email}</td>
              <td className='dark:text-white!'>{user.user_type}</td>
              <td>
                <button className={`${styles.actionButton} bg-indigo-600! hover:bg-indigo-700!`} onClick={() => onViewDetails(user)}>
                  {t('view_details')}
                </button>
                <button className={`${styles.actionButton} bg-blue-600! hover:bg-blue-700!`} onClick={() => onEdit(user)}>{t('update')}</button>
                <button className={`${styles.actionButton} bg-red-600! hover:bg-red-700!`} onClick={() => onDelete(user.id)}>{t('delete')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
