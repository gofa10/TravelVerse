import React from 'react';
import styles from '../UserMang/UserManagement.module.css';
import { useTranslation } from 'react-i18next';

function HotelTable({ Hotels, onEdit, onDelete }) {
  const { t } = useTranslation();
  // console.log(Hotels);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className='dark:text-white/70!'>{t('id')}</th>
          <th className='dark:text-white/70!'>{t('name')}</th>
          <th className='dark:text-white/70!'>{t('description')}</th>
          <th className='dark:text-white/70!'>{t('rate')}</th>
          <th className='dark:text-white/70!'>{t('location')}</th>
          <th className='dark:text-white/70!'>{t('class')}</th>
          <th className='dark:text-white/70!'>{t('price')}</th>
          <th className='dark:text-white/70!'>{t('old_price')}</th>
          <th className='dark:text-white/70!'>{t('style')}</th>
          {/* <th>amenities</th> */}
          <th className='dark:text-white/70!'>{t('booking_link')}</th>
          <th className='dark:text-white/70!'>{t('images')}</th>
          <th className='dark:text-white/70!'>{t('actions')}</th>
        </tr>
      </thead>
      <tbody>
        {Hotels.map(hotel => (
          <tr key={hotel.id}>
            <td className='dark:text-white/80!'>{hotel.id}</td>
            <td className='dark:text-white/80!'>{hotel.name}</td>
            <td className='dark:text-white/80!'>{hotel.description}</td>
            <td className='dark:text-white/80!'>{hotel.rate}</td>
            <td className='dark:text-white/80!'>{hotel.location}</td>
            <td className='dark:text-white/80!'>{hotel.class}</td>
            <td className='dark:text-white/80!'>${hotel.price}</td>
            <td className='dark:text-white/80!'>${hotel.old_price}</td>
            <td className='dark:text-white/80!'>{hotel.style}</td>
            {/* <td>{Array.isArray(hotel.amenities) ? hotel.amenities.join(', ') : hotel.amenities}</td> */}
            <td className='dark:text-white!'><a href={hotel.booking_link} target="_blank" rel="noreferrer">{t('link')}</a> </td>
            <td className="p-1">
              <div className="grid grid-cols-2 gap-2">
                {(hotel.images || []).map((img, i) => {
                  // إذا كانت الصورة مجرد string
                  const imageUrl = typeof img === 'string'
                    ? (img.startsWith('http') ? img : `${import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8000'}/${img}`)
                    : (img?.image?.startsWith('http') ? img.image : `${import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8000'}/${img.image}`);

                  return (
                    <img
                      key={i}
                      src={imageUrl}
                      alt={`Hotel image ${i + 1}`}
                      style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                      loading="lazy"
                    />
                  );
                })}
              </div>
            </td>

            <td className='flex flex-row gap-2 p-5'>
              <button className={`${styles.actionButton} bg-blue-600!`} onClick={() => onEdit(hotel)}>{t('update')}</button>
              <button className={`${styles.actionButton} bg-red-600!`} onClick={() => onDelete(hotel.id)}>{t('delete')}</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HotelTable;
