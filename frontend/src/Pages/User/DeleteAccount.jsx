import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from '../Admin/UserMang/UserManagement.module.css';

const DeleteAccount = () => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      // simulate delete
      toast.success('Account deleted successfully');
      navigate('/login');
    }
  };

  return (
    <div className={styles.card}>
      <h2>Delete Account</h2>
      <p>This action is irreversible. Proceed with caution.</p>
      <button className={styles.dangerButton} onClick={handleDelete}>Delete My Account</button>
    </div>
  );
};

export default DeleteAccount;