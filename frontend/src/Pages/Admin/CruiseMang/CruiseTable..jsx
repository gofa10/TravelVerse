import React from 'react';
import styles from '../UserMang/UserManagement.module.css';

function CruiseTable({ cruises, onEdit, onDelete }) {
  if (!cruises || cruises.length === 0) {
    return <p style={{ padding: '1rem' }}>No cruises found.</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          {/* <th>Name (AR)</th> */}
          <th>Name (EN)</th>
          {/* <th>Description (AR)</th> */}
          <th>Description (EN)</th>
          <th>Rate</th>
          <th>Location</th>
          <th>Booking</th>
          <th>Price</th>
          <th>Images</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cruises.map((cruise) => (
          <tr key={cruise.id}>
            <td>{cruise.id}</td>
            <td>{cruise.name}</td>
            {/* <td>{cruise.name_en}</td> */}
            {/* <td>{cruise.description_ar?.length > 30 ? cruise.description_ar.slice(0, 30) + '...' : cruise.description_ar}</td> */}
            <td>{cruise.description?.length > 30 ? cruise.description.slice(0, 30) + '...' : cruise.description}</td>
            <td>{cruise.rate}</td>
            <td>{cruise.location}</td>
            <td>
              {cruise.booking_link ? (
                <a
                  href={cruise.booking_link}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  View
                </a>
              ) : (
                'N/A'
              )}
            </td>
            <td>{cruise.price} $</td>
            <td>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {Array.isArray(cruise.images) && cruise.images.length > 0 ? (
                  cruise.images.map((img, i) => (
                    <img
                      key={i}
                      src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                      alt={`cruise-${i}`}
                      style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: 4 }}
                    />
                  ))
                ) : (
                  <span>No Images</span>
                )}
              </div>
            </td>
            <td>
              <button className={styles.actionButton} onClick={() => onEdit(cruise)}>
                Edit
              </button>
              <button className={styles.actionButton} onClick={() => onDelete(cruise.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CruiseTable;
