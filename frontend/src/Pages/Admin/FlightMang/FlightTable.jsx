import React from 'react';
import styles from '../UserMang/UserManagement.module.css';

function FlightTable({ flights, onEdit, onDelete }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className='dark:text-white!'>ID</th>
          <th className='dark:text-white!'>Style</th>
          <th className='dark:text-white!'>From</th>
          <th className='dark:text-white!'>To</th>
          {/* <th>Departure</th>
          <th>Arrival</th> */}
          <th className='dark:text-white!'>Duration</th>
          <th className='dark:text-white!'>Stops</th>
          <th className='dark:text-white!'>Round Trip</th>
          <th className='dark:text-white!'>Return From</th>
          <th className='dark:text-white!'>Return To</th>
          {/* <th>Return Departure</th>
          <th>Return Arrival</th> */}
          {/* <th>Return Duration</th> */}
          <th className='dark:text-white!'>Price</th>
          <th className='dark:text-white!'>Booking</th>
          <th className='dark:text-white!'>Rate</th>
          <th className='dark:text-white!'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {flights.map(flight => (
          <tr key={flight.id}>
            <td className='dark:text-white!'>{flight.id}</td>
            <td className='dark:text-white!'>{flight.style || '—'}</td>
            <td className='dark:text-white!'>{flight.from_location}</td>
            <td className='dark:text-white!'>{flight.to_location}</td>
            {/* <td>{flight.departure_time}</td>
            <td>{flight.arrival_time}</td> */}
            <td className='dark:text-white!'>{flight.duration}</td>
            <td className='dark:text-white!'>{flight.stops_count > 0 ? `${flight.stops_count} stops` : 'Direct'}</td>
            <td className='dark:text-white!'>{flight.return_from ? 'Yes' : 'No'}</td>
            <td className='dark:text-white!'>{flight.return_from || '—'}</td>
            <td className='dark:text-white!'>{flight.return_to || '—'}</td>
            {/* <td>{flight.return_departure_time || '—'}</td>
            <td>{flight.return_arrival_time || '—'}</td> */}
            {/* <td>{flight.return_duration || '—'}</td> */}
            <td className='dark:text-white!'>{flight.price}</td>
            <td className='dark:text-white!'>{flight.booking_link ? <a href={flight.booking_link} target="_blank" rel="noreferrer">Link</a> : '—'}</td>
            <td className='dark:text-white!'>{flight.rate ?? '—'}</td>
            <td>
              <button className={`${styles.actionButton} bg-blue-600!`} onClick={() => onEdit(flight)}>Edit</button>
              <button className={`${styles.actionButton} bg-red-600!`} onClick={() => onDelete(flight.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FlightTable;
