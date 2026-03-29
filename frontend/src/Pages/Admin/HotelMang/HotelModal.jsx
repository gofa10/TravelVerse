import React, { useState, useEffect } from 'react';
import styles from '../UserMang/UserManagement.module.css';
import { useTranslation } from 'react-i18next';

function HotelModal({ isOpen, onClose, onSubmit, initialData }) {
  const { t } = useTranslation();
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [rate, setRate] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [hotelClass, setHotelClass] = useState('');
  const [styleField, setStyleField] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [location, setLocation] = useState('');
  const [bookingLink, setBookingLink] = useState('');
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState(['']);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (initialData) {
      setNameAr(initialData.name_ar || '');
      setNameEn(initialData.name_en || '');
      setDescriptionAr(initialData.description_ar || '');
      setDescriptionEn(initialData.description_en || '');
      setRate(initialData.rate || '');
      setPrice(initialData.price || '');
      setOldPrice(initialData.old_price || '');
      setHotelClass(initialData.class || '');
      setStyleField(initialData.style || '');
      setAmenities(initialData.amenities || []);
      setLocation(initialData.location || '');
      setBookingLink(initialData.booking_link || '');
      setImages([]);
      setImageUrls(initialData.images || []);

      const previews = [];

      // ملفات مرفوعة من الجهاز
      if (initialData.images) {
        initialData.images.forEach(img => {
          if (typeof img !== 'string') {
            previews.push(URL.createObjectURL(img));
          }
        });
      }

      setPreviewImages([...imageUrls, ...previews]);
    } else {
      setNameAr('');
      setNameEn('');
      setDescriptionAr('');
      setDescriptionEn('');
      setRate('');
      setPrice('');
      setOldPrice('');
      setHotelClass('');
      setStyleField('');
      setAmenities([]);
      setLocation('');
      setBookingLink('');
      setImages([]);
      setImageUrls(['']);
      setPreviewImages([]);
    }
  }, [initialData, isOpen]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages([
      ...imageUrls,
      ...files.map(file => URL.createObjectURL(file))
    ]);
  };

  const handleAmenitiesChange = (e) => {
    setAmenities(e.target.value.split(',').map(a => a.trim()));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (initialData?.id) formData.append('id', initialData.id);

    formData.append('name_ar', nameAr);
    formData.append('name_en', nameEn);
    formData.append('description_ar', descriptionAr);
    formData.append('description_en', descriptionEn);
    formData.append('rate', rate);
    formData.append('price', price);
    formData.append('old_price', oldPrice);
    formData.append('class', hotelClass);
    formData.append('style', styleField);
    formData.append('location', location);
    formData.append('booking_link', bookingLink);

    amenities.forEach((a, i) => {
      formData.append(`amenities[${i}]`, a);
    });

    images.forEach((img) => {
      if (img instanceof File) formData.append('images[]', img);
    });

    imageUrls.forEach((url, i) => {
      if (url) formData.append(`image_urls[${i}]`, url);
    });

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>×</span>
        <h2>{initialData ? t('update_hotel') : t('add_hotel')}</h2>
        <form onSubmit={handleSubmit}>
          <label>{t('arabic_name')}</label>
          <input type="text" value={nameAr} onChange={(e) => setNameAr(e.target.value)} required />

          <label>{t('english_name')}</label>
          <input type="text" value={nameEn} onChange={(e) => setNameEn(e.target.value)} required />

          <label>{t('arabic_description')}</label>
          <textarea value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} />

          <label>{t('english_description')}</label>
          <textarea value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} />

          <label>{t('rate')}</label>
          <input type="number" step="0.1" min="0" max="5" value={rate} onChange={(e) => setRate(e.target.value)} />

          <label>{t('price')}</label>
          <input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />

          <label>{t('old_price')}</label>
          <input type="number" min="0" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />

          <label>{t('class')}</label>
          <input type="text" value={hotelClass} onChange={(e) => setHotelClass(e.target.value)} />

          <label>{t('style')}</label>
          <input type="text" value={styleField} onChange={(e) => setStyleField(e.target.value)} />

          <label>{t('amenities_comma')}</label>
          <input type="text" value={amenities.join(', ')} onChange={handleAmenitiesChange} />

          <label>{t('location')}</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />

          <label>{t('booking_link')}</label>
          <input type="url" value={bookingLink} onChange={(e) => setBookingLink(e.target.value)} />

          <label>{t('hotel_images')}</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />

          <label>{t('image_urls_optional')}</label>
          {imageUrls.map((url, i) => (
            <input
              key={i}
              type="text"
              value={url}
              onChange={(e) => {
                const updated = [...imageUrls];
                updated[i] = e.target.value;
                setImageUrls(updated);
              }}
              placeholder="https://example.com/image.jpg"
            />
          ))}
          <button type="button" onClick={() => setImageUrls([...imageUrls, ''])}>
            {t('add_another_url')}
          </button>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            {previewImages.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} style={{ width: '100px', height: '80px', objectFit: 'cover' }} />
            ))}
          </div>

          <button type="submit" className={styles.modalButton}>{t('save')}</button>
        </form>
      </div>
    </div>
  );
}

export default HotelModal;
