import React from 'react';
import styles from '../UserMang/UserManagement.module.css';
import { useTranslation } from 'react-i18next';

function RestaurantTable({ restaurants, onEdit, onDelete }) {
  const { t } = useTranslation();
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className='dark:text-white/70!'>{t('id')}</th>
            <th className='dark:text-white/70!'>{t('english_name')}</th>
            <th className='dark:text-white/70!'>{t('rate')}</th>
            <th className='dark:text-white/70!'>{t('location')}</th>
            <th className='dark:text-white/70!'>{t('cuisine')}</th>
            <th className='dark:text-white/70!'>{t('features')}</th>
            <th className='dark:text-white/70!'>{t('property_type')}</th>
            <th className='dark:text-white/70!'>{t('images')}</th>
            <th className='dark:text-white/70!'>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map(restaurant => (
            <tr key={restaurant.id}>
              <td className='dark:text-white/80!'>{restaurant.id}</td>
              <td className='dark:text-white/80!'>{restaurant.name}</td>
              {/* <td>{restaurant.name_en}</td> */}
              {/* <td>{restaurant.description_ar}</td> */}
              {/* <td>{restaurant.description}</td> */}
              <td className='dark:text-white/80!'>{restaurant.rate}</td>
              <td className='dark:text-white/80!'>{restaurant.location}</td>
              <td className='dark:text-white/80!'>{restaurant.cuisine}</td>
              <td className='dark:text-white/80!'>{restaurant.features}</td>
              <td className='dark:text-white/80!'>{restaurant.property_type}</td>
              <td>
                <div className='grid grid-cols-2 gap-2'>
                  {restaurant.images?.map((img, i) => (
                    <img
                      key={i}
                      src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                      alt={`Restaurant image ${i + 1}`}
                      style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  ))}
                </div>
              </td>
              <td className='flex flex-row py-5'>
                <button className={`${styles.actionButton} mr-2 bg-blue-700!`} onClick={() => onEdit(restaurant)}>
                  {t('edit')}
                </button>
                <button className={`${styles.actionButton} bg-red-700!`} onClick={() => onDelete(restaurant.id)}>
                  {t('delete')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantTable;
