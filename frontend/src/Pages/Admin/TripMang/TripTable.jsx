import React from 'react';
import styles from '../UserMang/UserManagement.module.css';

function TripTable({ trips, onEdit, onDelete }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name (AR)</th>
          <th>Name (EN)</th>
          <th>Description (AR)</th>
          <th>Description (EN)</th>
          <th>Rate</th>
          <th>Price</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Duration</th>
          <th>Has Guide?</th>
          <th>Guide</th>
          <th>Booking Link</th>
          <th>Images</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {trips.map(trip => (
          <tr key={trip.id}>
            <td>{trip.id}</td>
            <td>{trip.name_ar}</td>
            <td>{trip.name_en}</td>
            <td>{trip.description_ar}</td>
            <td>{trip.description_en}</td>
            <td>{trip.rate}</td>
            <td>{trip.price}</td>
            <td>{trip.start_date}</td>
            <td>{trip.end_date}</td>
            <td>{trip.duration}</td>
            <td>{trip.has_guide ? 'Yes' : 'No'}</td>
            <td>{trip.has_guide ? trip.guide_name : '-'}</td>
            <td>
              <a href={trip.booking_link} target="_blank" rel="noreferrer">
                Link
              </a>
            </td>
            <td>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {trip.images?.map((img, i) => (
                  <img
                    key={i}
                    src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                    alt={`trip-${i}`}
                    style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                  />
                ))}
              </div>
            </td>
            <td>
              <button className={styles.actionButton} onClick={() => onEdit(trip)}>
                Edit
              </button>
              <button className={styles.actionButton} onClick={() => onDelete(trip.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TripTable;
