import React from 'react';
import styles from './UserManagement.module.css'; // استخدام CSS Module

function UserTable({ users, onEdit, onDelete, onViewDetails }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className='dark:text-white!'>ID</th>
            <th className='dark:text-white!'>Name</th>
            <th className='dark:text-white!'>Email </th>
            <th className='dark:text-white!'>Role</th>
            <th className='dark:text-white!'>Actions</th>
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
                  View Details
                </button>
                <button className={`${styles.actionButton} bg-blue-600! hover:bg-blue-700!`} onClick={() => onEdit(user)}>Update</button>
                <button className={`${styles.actionButton} bg-red-600! hover:bg-red-700!`} onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
