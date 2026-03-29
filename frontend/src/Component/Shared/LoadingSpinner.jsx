import React from 'react';
import styles from '../../Style/Shared/LoadingSpinner.module.css';

const LoadingSpinner = ({ size = 'md', fullPage = false }) => {
  const baseClass = `${styles.spinnerContainer} ${fullPage ? styles.fullPage : styles.inline}`;
  const sizeClass = styles[size] || styles.md;

  return (
    <div className={baseClass}>
      <div className={`${styles.spinner} ${sizeClass}`} />
    </div>
  );
};

export default LoadingSpinner;
