import React, { useState, useEffect } from 'react';
import styles from '../UserMang/UserManagement.module.css';

function RestaurantModal({ isOpen, onClose, onSubmit, initialData }) {
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
        <h2>{initialData ? 'Edit Restaurant' : 'Add Restaurant'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Arabic Name</label>
          <input name="name_ar" value={form.name_ar} onChange={handleChange} required />

          <label>English Name</label>
          <input name="name_en" value={form.name_en} onChange={handleChange} required />

          <label>Arabic Description</label>
          <textarea name="description_ar" value={form.description_ar} onChange={handleChange} />

          <label>English Description</label>
          <textarea name="description_en" value={form.description_en} onChange={handleChange} />

          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} required />

          <label>Rate</label>
          <input type="number" step="0.1" min="0" max="5" name="rate" value={form.rate} onChange={handleChange} />

          <label>Booking Link</label>
          <input type="url" name="booking_link" value={form.booking_link} onChange={handleChange} />

          <label>Property Type</label>
          <input name="property_type" value={form.property_type} onChange={handleChange} />

          <label>Cuisine</label>
          <input name="cuisine" value={form.cuisine} onChange={handleChange} />

          <label>Features (comma separated)</label>
          <input name="featuresInput" value={form.featuresInput} onChange={handleFeaturesChange} />

          <label>Price</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} />

          <label>Upload Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImagesChange} />

          <label>Or Image URLs (one per line)</label>
          <textarea value={imageUrls} onChange={handleUrlsChange} rows={3} placeholder="https://..." />

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            {previewImages.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} style={{ width: '100px', height: '80px', objectFit: 'cover' }} />
            ))}
          </div>

          <button type="submit" className={styles.modalButton}>Save</button>
        </form>
      </div>
    </div>
  );
}

export default RestaurantModal;
