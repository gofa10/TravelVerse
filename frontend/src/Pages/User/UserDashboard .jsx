import React from 'react';
import styles from './UserDashboard.module.css'; // تأكد من وجود ملف CSS module بنفس الاسم

const dashboardSections = [
  {
    title: "Reservations",
    description: "Check your upcoming trips and booking status.",
  },
  {
    title: "Favorites",
    description: "Explore the tours and hotels you loved.",
  },
  {
    title: "My Reviews",
    description: "See what you shared and improve our community.",
  },
  {
    title: "Profile Settings",
    description: "Update your name, password, and preferences.",
  },
];

const UserDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.title}>Welcome to Your Dashboard</h2>
      <p className={styles.subtitle}>
        You can view your reservations, favorites, reviews, and manage your profile here.
      </p>

      <div className={styles.cardsContainer}>
        {dashboardSections.map((section, index) => (
          <div key={index} className={styles.card}>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
