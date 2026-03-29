import React from 'react';
import styles from '../UserMang/UserManagement.module.css';
import { useTranslation } from 'react-i18next';

function ActivityTable({ activities, onEdit, onDelete }) {
  const { t } = useTranslation();
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className='dark:text-white/70!'>{t('id')}</th>
          {/* <th>Name (AR)</th> */}
          <th className='dark:text-white/70!'>{t('name')}</th>
          {/* <th>Description (AR)</th> */}
          <th className='dark:text-white/70!'>{t('description')}</th>
          <th className='dark:text-white/70!'>{t('rate')}</th>
          <th className='dark:text-white/70!'>{t('location')}</th>
          <th className='dark:text-white/70!'>{t('booking')}</th>
          <th className='dark:text-white/70!'>{t('price')}</th>
          <th className='dark:text-white/70!'>{t('duration')}</th>
          <th className='dark:text-white/70!'>{t('type')}</th>
          {/* <th>Start Times</th> */}
          <th className='dark:text-white/70!'>{t('live_guide')}</th>
          <th className='dark:text-white/70!'>{t('guide_languages')}</th>
          <th className='dark:text-white/70!'>{t('images')}</th>
          <th className='dark:text-white/70!'>{t('actions')}</th>
        </tr>
      </thead>
      <tbody>
        {activities.map(activity => (
          <tr key={activity.id}>
            <td className='dark:text-white/80!'>{activity.id}</td>
            <td className='dark:text-white/80!'>{activity.name}</td>
            {/* <td>{activity.name}</td> */}
            {/* <td>{activity.description}</td> */}
            <td className='dark:text-white/80!'>
              {activity.description
                ? activity.description.split(" ").slice(0, 5).join(" ") +
                (activity.description.split(" ").length > 5 ? "..." : "")
                : "—"}
            </td>

            <td className='dark:text-white/80!'>{activity.rate}</td>
            <td className='dark:text-white/80!'>{activity.location}</td>
            <td>
              <a href={activity.booking_link} target="_blank" rel="noreferrer">
                {t('link')}
              </a>
            </td>
            <td className='dark:text-white/80!'>{activity.price}</td>
            <td className='dark:text-white/80!'>{activity.duration}</td>
            <td className='dark:text-white/80!'>{activity.type}</td>
            {/* <td>
              <ul style={{ paddingLeft: '1em' }}>
                {activity.start_time?.map((time, i) => (
                  <li key={i}>{time}</li>
                ))}
              </ul>
            </td> */}
            <td className='dark:text-white/80!'>{activity.live_guide ? t('yes') : t('no')}</td>
            <td className='dark:text-white/80!'>{activity.guide_languages?.join(', ')}</td>
            <td>
              <div className='grid grid-cols-2 gap-2'>
                {activity.images?.map((img, i) => (
                  <img
                    key={i}
                    src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                    alt={`Activity image ${i + 1}`}
                    style={{ width: '50px', height: '40px', objectFit: 'cover' }}
                    loading="lazy"
                  />
                ))}
              </div>
            </td>
            <td className='flex flex-row gap-2 py-5'>
              <button className={`${styles.actionButton} bg-blue-600! hover:bg-blue-800!`} onClick={() => onEdit(activity)}>
                {t('edit')}
              </button>
              <button className={`${styles.actionButton} bg-red-600! hover:bg-red-800!`} onClick={() => onDelete(activity.id)}>
                {t('delete')}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ActivityTable;
