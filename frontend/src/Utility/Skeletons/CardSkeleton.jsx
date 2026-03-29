import React from 'react';
import './Skeletons.css';

const CardSkeleton = () => {
  return (
    <div className="card skeleton-card h-100">
      <div className="skeleton skeleton-img" />
      <div className="card-body">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text short" />
      </div>
    </div>
  );
};

export default CardSkeleton;
