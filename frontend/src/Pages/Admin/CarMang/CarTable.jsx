import React from 'react';
import styles from '../UserMang/UserManagement.module.css';

function CarTable({ cars, onEdit, onDelete }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Type</th>
          <th>Year</th>
          <th>Rate</th>
          <th>Price</th>
          <th>Location</th>
          <th>Description (AR)</th>
          <th>Description (EN)</th>
          <th>Booking</th>
          <th>Images</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cars.map(car => (
          <tr key={car.id}>
            <td>{car.id}</td>
            <td>{car.brand}</td>
            <td>{car.model}</td>
            <td>{car.type}</td>
            <td>{car.year}</td>
            <td>{car.rate}</td>
            <td>{car.price}</td>
            <td>{car.location}</td>
            <td>{car.description_ar}</td>
            <td>{car.description_en}</td>
            <td>
              <a href={car.booking_link} target="_blank" rel="noreferrer">Link</a>
            </td>
            <td>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {car.images?.map((img, i) => (
                  <img
                    key={i}
                    src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                    alt={`car-${i}`}
                    style={{ width: '50px', height: '40px', objectFit: 'cover' }}
                  />
                ))}
              </div>
            </td>
            <td>
              <button className={styles.actionButton} onClick={() => onEdit(car)}>Edit</button>
              <button className={styles.actionButton} onClick={() => onDelete(car.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CarTable;
