import React from 'react';
import styles from '../UserMang/UserManagement.module.css';

function ActivityTable({ activities, onEdit, onDelete }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className='dark:text-white/70!'>ID</th>
          {/* <th>Name (AR)</th> */}
          <th className='dark:text-white/70!'>Name </th>
          {/* <th>Description (AR)</th> */}
          <th className='dark:text-white/70!'>Description </th>
          <th className='dark:text-white/70!'>Rate</th>
          <th className='dark:text-white/70!'>Location</th>
          <th className='dark:text-white/70!'>Booking</th>
          <th className='dark:text-white/70!'>Price</th>
          <th className='dark:text-white/70!'>Duration</th>
          <th className='dark:text-white/70!'>Type</th>
          {/* <th>Start Times</th> */}
          <th className='dark:text-white/70!'>Live Guide</th>
          <th className='dark:text-white/70!'>Guide Languages</th>
          <th className='dark:text-white/70!'>Images</th>
          <th className='dark:text-white/70!'>Actions</th>
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
                Link
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
            <td className='dark:text-white/80!'>{activity.live_guide ? 'Yes' : 'No'}</td>
            <td className='dark:text-white/80!'>{activity.guide_languages?.join(', ')}</td>
            <td>
              <div className='grid grid-cols-2 gap-2'>
                {activity.images?.map((img, i) => (
                  <img
                    key={i}
                    src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                    alt={`activity-${i}`}
                    style={{ width: '50px', height: '40px', objectFit: 'cover' }}
                  />
                ))}
              </div>
            </td>
            <td className='flex flex-row gap-2 py-5'>
              <button className={`${styles.actionButton} bg-blue-600! hover:bg-blue-800!`} onClick={() => onEdit(activity)}>
                Edit
              </button>
              <button className={`${styles.actionButton} bg-red-600! hover:bg-red-800!`} onClick={() => onDelete(activity.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ActivityTable;
