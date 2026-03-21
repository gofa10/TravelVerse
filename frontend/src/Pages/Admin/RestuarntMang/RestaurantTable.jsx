import React from 'react';
import styles from '../UserMang/UserManagement.module.css';

function RestaurantTable({ restaurants, onEdit, onDelete }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className='dark:text-white/70!'>ID</th>
            {/* <th>Arabic Name</th> */}
            <th className='dark:text-white/70!'>English Name</th>
            {/* <th>Description (AR)</th> */}
            {/* <th>Description (EN)</th> */}
            <th className='dark:text-white/70!'>Rate</th>
            <th className='dark:text-white/70!'>Location</th>
            <th className='dark:text-white/70!'>cuisine</th>
            <th className='dark:text-white/70!'>features</th>
            <th className='dark:text-white/70!'>property_type</th>
            <th className='dark:text-white/70!'>Images</th>
            <th className='dark:text-white/70!'>Actions</th>
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
                      alt={`restaurant-${i}`}
                      style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                    />
                  ))}
                </div>
              </td>
              <td className='flex flex-row py-5'>
                <button className={`${styles.actionButton} mr-2 bg-blue-700!`} onClick={() => onEdit(restaurant)}>
                  Edit
                </button>
                <button className={`${styles.actionButton} bg-red-700!`} onClick={() => onDelete(restaurant.id)}>
                  Delete
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
