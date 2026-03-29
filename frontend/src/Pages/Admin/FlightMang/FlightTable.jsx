import React from 'react';
import styles from '../UserMang/UserManagement.module.css';
import { useTranslation } from 'react-i18next';

function FlightTable({ flights, onEdit, onDelete }) {
  const { t } = useTranslation();
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className='dark:text-white!'>{t('id')}</th>
          <th className='dark:text-white!'>{t('style')}</th>
          <th className='dark:text-white!'>{t('from')}</th>
          <th className='dark:text-white!'>{t('to')}</th>
          {/* <th>Departure</th>
          <th>Arrival</th> */}
          <th className='dark:text-white!'>{t('duration')}</th>
          <th className='dark:text-white!'>{t('stops')}</th>
          <th className='dark:text-white!'>{t('round_trip')}</th>
          <th className='dark:text-white!'>{t('return_from')}</th>
          <th className='dark:text-white!'>{t('return_to')}</th>
          {/* <th>Return Departure</th>
          <th>Return Arrival</th> */}
          {/* <th>Return Duration</th> */}
          <th className='dark:text-white!'>{t('price')}</th>
          <th className='dark:text-white!'>{t('booking')}</th>
          <th className='dark:text-white!'>{t('rate')}</th>
          <th className='dark:text-white!'>{t('actions')}</th>
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
            <td className='dark:text-white!'>{flight.stops_count > 0 ? `${flight.stops_count} ${t('stops_label')}` : t('direct')}</td>
            <td className='dark:text-white!'>{flight.return_from ? t('yes') : t('no')}</td>
            <td className='dark:text-white!'>{flight.return_from || '—'}</td>
            <td className='dark:text-white!'>{flight.return_to || '—'}</td>
            {/* <td>{flight.return_departure_time || '—'}</td>
            <td>{flight.return_arrival_time || '—'}</td> */}
            {/* <td>{flight.return_duration || '—'}</td> */}
            <td className='dark:text-white!'>{flight.price}</td>
            <td className='dark:text-white!'>{flight.booking_link ? <a href={flight.booking_link} target="_blank" rel="noreferrer">{t('link')}</a> : '—'}</td>
            <td className='dark:text-white!'>{flight.rate ?? '—'}</td>
            <td>
              <button className={`${styles.actionButton} bg-blue-600!`} onClick={() => onEdit(flight)}>{t('edit')}</button>
              <button className={`${styles.actionButton} bg-red-600!`} onClick={() => onDelete(flight.id)}>{t('delete')}</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FlightTable;
