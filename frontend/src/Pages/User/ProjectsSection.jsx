// ProjectsSection.js
import React, { useState } from 'react';
import styles from './admin.module.css'; // استيراد الـ CSS Modules

function UserDash() {
        const [isListView, setIsListView] = useState(false);

    const projects = [
  {
    date: "June 20, 2025",
    title: "Trip to Paris",
    subtitle: "Eiffel Tower & Louvre Museum",
    progress: 70,
    progressColor: "#4caf50",
    daysLeft: "5 ",
    backgroundColor: "#e0f7e9",
    participants: []
  },
  { 
    date: "June 22, 2025",
    title: "Hotel Booking - Hilton",
    subtitle: "Awaiting Check-in",
    progress: 100,
    progressColor: "#2196f3",
    daysLeft: "4.6",
    backgroundColor: "#e3f2fd",
    participants: [
      "https://randomuser.me/api/portraits/women/68.jpg",
      "https://randomuser.me/api/portraits/men/74.jpg"
    ]
  },
  {
    date: "June 25, 2025",
    title: "Dinner at Le Jules Verne",
    subtitle: "Reservation Confirmed",
    progress: 0,
    progressColor: "#ff9800",
    daysLeft: "5 ",
    backgroundColor: "#fff3e0",
    participants: []
  },
  {
    date: "June 30, 2025",
    title: "Tour Guide: Marie Dupont",
    subtitle: "City Walk & Boat Tour",
    progress: 30,
    progressColor: "#f44336",
    daysLeft: "4.8",
    backgroundColor: "#ffebee",
    participants: [
      "https://randomuser.me/api/portraits/women/65.jpg"
    ]
  },
  {
    date: "July 2, 2025",
    title: "Car Rental - Peugeot 208",
    subtitle: "From Paris Airport",
    progress: 50,
    progressColor: "#9c27b0",
    daysLeft: "4.7",
    backgroundColor: "#f3e5f5",
    participants: []
  },
  {
    date: "July 5, 2025",
    title: "Cruise: Seine River",
    subtitle: "Dinner & Music",
    progress: 20,
    progressColor: "#03a9f4",
    daysLeft: "4.5",
    backgroundColor: "#e1f5fe",
    participants: [
      "https://randomuser.me/api/portraits/men/52.jpg",
      "https://randomuser.me/api/portraits/women/57.jpg"
    ]
  }
];

const toggleView = (viewType) => {
        setIsListView(viewType === 'list');
    };
    return (
        <div className={styles['projects-section']}>
            <div className={styles['projects-section-header']}>
                <p>HOME</p>
                <p className={styles.time}>December, 12</p>
            </div>
            <div className={styles['projects-section-line']}>

                <div className={styles['view-actions']}>
                    <button className={`${styles['view-btn']} ${styles['list-view']} ${isListView ? styles.active : ''}`} title="List View" onClick={() => toggleView('list')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles['feather-list']}>
                            <line x1="8" y1="6" x2="21" y2="6" />
                            <line x1="8" y1="12" x2="21" y2="12" />
                            <line x1="8" y1="18" x2="21" y2="18" />
                            <line x1="3" y1="6" x2="3.01" y2="6" />
                            <line x1="3" y1="12" x2="3.01" y2="12" />
                            <line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                    </button>
                    <button className={`${styles['view-btn']} ${styles['grid-view']} ${!isListView ? styles.active : ''}`} title="Grid View" onClick={() => toggleView('grid')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles['feather-grid']}>
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`${styles['project-boxes']} ${isListView ? styles.jsListView : styles.jsGridView}`}>
                {projects.map((project, index) => (
                    <div className={styles['project-box-wrapper']} key={index}>
                        <div className={styles['project-box']} style={{ backgroundColor: project.backgroundColor }}>
                            <div className={styles['project-box-header']}>
                                <span>{project.date}</span>
                                <div className={styles['more-wrapper']}>
                                    <button className={styles['project-btn-more']}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles['feather-more-vertical']}>
                                            <circle cx="12" cy="12" r="1" />
                                            <circle cx="12" cy="5" r="1" />
                                            <circle cx="12" cy="19" r="1" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className={styles['project-box-content-header']}>
                                <p className={styles['box-content-header']}>{project.title}</p>
                                <p className={styles['box-content-subheader']}>{project.subtitle}</p>
                            </div>
                            {/* <div className={styles['box-progress-wrapper']}>
                                <p className={styles['box-progress-header']}>Progress</p>
                                <div className={styles['box-progress-bar']}>
                                    <span className={styles['box-progress']} style={{ width: `${project.progress}%`, backgroundColor: project.progressColor }}></span>
                                </div>
                                <p className={styles['box-progress-percentage']}>{project.progress}%</p>
                            </div> */}
                            <div className={styles['project-box-footer']}>
                                <div className={styles.participants}>
                                    {project.participants.map((src, pIndex) => (
                                        <img src={src} alt="participant" key={pIndex} />
                                    ))}
                                    <button className={styles['add-participant']} style={{ color: project.progressColor }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles['feather-plus']}>
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    </button>
                                </div>
                                <div className={styles['days-left']} style={{ color: project.progressColor }}>
                                    {project.daysLeft}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserDash;
