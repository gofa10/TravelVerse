import React from 'react';
import styles from '../UserMang/UserManagement.module.css';
import { useTranslation } from 'react-i18next';

function CruiseTable({ cruises, onEdit, onDelete }) {
  const { t } = useTranslation();
  if (!cruises || cruises.length === 0) {
    return <p style={{ padding: '1rem' }}>{t('no_results_found')}</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>{t('id')}</th>
          {/* <th>Name (AR)</th> */}
          <th>{t('name')}</th>
          {/* <th>Description (AR)</th> */}
          <th>{t('description')}</th>
          <th>{t('rate')}</th>
          <th>{t('location')}</th>
          <th>{t('booking')}</th>
          <th>{t('price')}</th>
          <th>{t('images')}</th>
          <th>{t('actions')}</th>
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
                  {t('view')}
                </a>
              ) : (
                t('na')
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
                      alt={`Cruise image ${i + 1}`}
                      style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: 4 }}
                      loading="lazy"
                    />
                  ))
                ) : (
                  <span>{t('no_images')}</span>
                )}
              </div>
            </td>
            <td>
              <button className={styles.actionButton} onClick={() => onEdit(cruise)}>
                {t('edit')}
              </button>
              <button className={styles.actionButton} onClick={() => onDelete(cruise.id)}>
                {t('delete')}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CruiseTable;
