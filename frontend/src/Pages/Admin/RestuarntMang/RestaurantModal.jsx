import React, { useState, useEffect } from 'react';
import styles from '../UserMang/UserManagement.module.css';
import { useTranslation } from 'react-i18next';

function RestaurantModal({ isOpen, onClose, onSubmit, initialData }) {
  const { t } = useTranslation();
  const [previewImages, setPreviewImages] = useState([]);
  const [imageUrls, setImageUrls] = useState('');

  const [form, setForm] = useState({
    name_ar: '',
    name_en: '',
    description_ar: '',
    description_en: '',
    location: '',
    rate: '',
    booking_link: '',
    property_type: '',
    cuisine: '',
    features: [],
    featuresInput: '',
    price: '',
    images: []
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        featuresInput: (initialData.features || []).join(', '),
        images: []
      });
      const previews = [];
      if (initialData.images && Array.isArray(initialData.images)) {
        initialData.images.forEach(img => {
          if (typeof img === 'string') previews.push(img);
        });
        setImageUrls(initialData.images.filter(i => typeof i === 'string').join('\n'));
      }
      setPreviewImages(previews);
    } else {
      setForm({
        name_ar: '',
        name_en: '',
        description_ar: '',
        description_en: '',
        location: '',
        rate: '',
        booking_link: '',
        property_type: '',
        cuisine: '',
        features: [],
        featuresInput: '',
        price: '',
        images: []
      });
      setImageUrls('');
      setPreviewImages([]);
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFeaturesChange = (e) => {
    const value = e.target.value;
    setForm(prev => ({
      ...prev,
      featuresInput: value,
      features: value.split(',').map(f => f.trim()).filter(Boolean)
    }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setForm(prev => ({ ...prev, images: files }));
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...previews]);
  };

  const handleUrlsChange = (e) => {
    const urls = e.target.value.split('\n').map(url => url.trim()).filter(url => url);
    setImageUrls(e.target.value);
    setPreviewImages(prev => [...prev, ...urls]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const urlList = imageUrls.split('\n').map(url => url.trim()).filter(url => url);
    // const finalImages = [...form.images, ...urlList];
    const urlList = imageUrls
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url);

    const { featuresInput, ...restForm } = form;

    onSubmit({
      id: initialData?.id || null,
      ...restForm,
      images: form.images,
      image_urls: urlList
    });

  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>×</span>
        <h2>{initialData ? t('edit_restaurant') : t('add_restaurant')}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="res-name-ar" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('arabic_name')}
            </label>
            <input
              id="res-name-ar"
              name="name_ar"
              value={form.name_ar}
              onChange={handleChange}
              required
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="res-name-en" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('english_name')}
            </label>
            <input
              id="res-name-en"
              name="name_en"
              value={form.name_en}
              onChange={handleChange}
              required
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="res-desc-ar" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('arabic_description')}
            </label>
            <textarea
              id="res-desc-ar"
              name="description_ar"
              value={form.description_ar}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="res-desc-en" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('english_description')}
            </label>
            <textarea
              id="res-desc-en"
              name="description_en"
              value={form.description_en}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="res-location" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('location')}
            </label>
            <input
              id="res-location"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="res-rate" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('rate')}
            </label>
            <input
              id="res-rate"
              type="number"
              step="0.1"
              min="0"
              max="5"
              name="rate"
              value={form.rate}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="res-booking-link" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('booking_link')}
            </label>
            <input
              id="res-booking-link"
              type="url"
              name="booking_link"
              value={form.booking_link}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="res-property-type" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('property_type')}
            </label>
            <input
              id="res-property-type"
              name="property_type"
              value={form.property_type}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="res-cuisine" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('cuisine')}
            </label>
            <input
              id="res-cuisine"
              name="cuisine"
              value={form.cuisine}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="res-features" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('features_comma')}
            </label>
            <input
              id="res-features"
              name="featuresInput"
              value={form.featuresInput}
              onChange={handleFeaturesChange}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="res-price" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('price')}
            </label>
            <input
              id="res-price"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="res-images" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('upload_images')}
            </label>
            <input
              id="res-images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="res-image-urls" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('image_urls_per_line')}
            </label>
            <textarea
              id="res-image-urls"
              value={imageUrls}
              onChange={handleUrlsChange}
              rows={3}
              placeholder="https://..."
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[60px]"
            />
          </div>

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

export default RestaurantModal;
