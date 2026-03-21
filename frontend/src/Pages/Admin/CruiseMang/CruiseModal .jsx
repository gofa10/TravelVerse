import React, { useState, useEffect } from 'react';
import styles from '../UserMang/UserManagement.module.css';
import api from '../../../Radux/axios';

function CruiseModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    name_ar: '',
    name_en: '',
    description_ar: '',
    description_en: '',
    rate: '',
    location: '',
    booking_link: '',
    price: '',
    images: [],
    image_urls: [''], // روابط الصور
  });

  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        images: [],
        image_urls: [''], // نفرغ ونبدأ بحقل واحد
      });

      const previews = Array.isArray(initialData.images)
        ? initialData.images.map(img =>
            typeof img === 'string' ? img : `${import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8000'}${img.image_path}`
          )
        : [];

      setPreviewImages(previews);
    } else {
      setForm({
        name_ar: '',
        name_en: '',
        description_ar: '',
        description_en: '',
        rate: '',
        location: '',
        booking_link: '',
        price: '',
        images: [],
        image_urls: [''],
      });
      setPreviewImages([]);
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setForm(prev => ({ ...prev, images: files }));
    setPreviewImages(prev => [
      ...prev,
      ...files.map(file => URL.createObjectURL(file)),
    ]);
  };

  const handleImageUrlChange = (index, value) => {
    const updated = [...form.image_urls];
    updated[index] = value;
    setForm(prev => ({ ...prev, image_urls: updated }));
  };

  const addImageUrlField = () => {
    setForm(prev => ({ ...prev, image_urls: [...prev.image_urls, ''] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name_ar', form.name_ar);
    formData.append('name_en', form.name_en);
    formData.append('description_ar', form.description_ar);
    formData.append('description_en', form.description_en);
    formData.append('rate', form.rate);
    formData.append('location', form.location);
    formData.append('booking_link', form.booking_link);
    formData.append('price', form.price);

    // الصور من الجهاز
    form.images.forEach(image => {
      formData.append('images[]', image);
    });

    // روابط الصور
    form.image_urls.forEach(url => {
      if (url.trim() !== '') {
        formData.append('image_urls[]', url);
      }
    });

    try {
      const url = initialData?.id
        ? `/cruises/${initialData.id}?_method=PUT`
        : '/cruises';

      const response = await api.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      onSubmit(response.data);
      onClose();
    } catch (err) {
      console.error('Error submitting form:', err);
      console.error('Validation errors:', err.response?.data?.errors);
alert('فشل الحفظ:\n' + JSON.stringify(err.response?.data?.errors, null, 2));

    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>×</span>
        <h2>{initialData ? 'Edit Cruise' : 'Add Cruise'}</h2>
        <form onSubmit={handleSubmit}>
          {/* الحقول النصية */}
          <label>Arabic Name</label>
          <input name="name_ar" value={form.name_ar} onChange={handleChange} required />

          <label>English Name</label>
          <input name="name_en" value={form.name_en} onChange={handleChange} required />

          <label>Arabic Description</label>
          <textarea name="description_ar" value={form.description_ar} onChange={handleChange} required />

          <label>English Description</label>
          <textarea name="description_en" value={form.description_en} onChange={handleChange} required />

          <label>Rate</label>
          <input type="number" step="0.1" name="rate" value={form.rate} onChange={handleChange} required />

          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} required />

          <label>Booking Link</label>
          <input name="booking_link" value={form.booking_link} onChange={handleChange} />

          <label>Price</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required />

          {/* رفع الصور من الجهاز */}
          <label>Upload Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />

          {/* إدخال روابط الصور */}
          <label>Image URLs</label>
          {form.image_urls.map((url, index) => (
            <input
              key={index}
              type="text"
              value={url}
              placeholder="https://example.com/image.jpg"
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
            />
          ))}
          <button type="button" className={styles.modalButton} onClick={addImageUrlField}>
            + Add Another URL
          </button>

          {/* عرض الصور للمعاينة */}
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

export default CruiseModal;
