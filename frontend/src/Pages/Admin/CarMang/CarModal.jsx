import React, { useState, useEffect } from 'react';
import styles from '../UserMang/UserManagement.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../Radux/axios';
import toast from 'react-hot-toast';

function CarModal({ isOpen, onClose, initialData }) {
  const [form, setForm] = useState({
    brand: '',
    model: '',
    type: '',
    year: '',
    rate: '',
    price: '',
    location: '',
    description_ar: '',
    description_en: '',
    booking_link: '',
    seats: '',
    large_bag: '',
    small_bag: '',
    car_specification: '',
    supplier: '',
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [newImageURL, setNewImageURL] = useState('');

  const queryClient = useQueryClient();

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        images: [],
      });

      if (Array.isArray(initialData.images)) {
        setOldImages(initialData.images);
        setPreviewImages(initialData.images.map(img => `${import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8000'}${img.image_path}`));
      } else {
        setOldImages([]);
        setPreviewImages([]);
      }
    } else {
      setForm({
        brand: '',
        model: '',
        type: '',
        year: '',
        rate: '',
        price: '',
        location: '',
        description_ar: '',
        description_en: '',
        booking_link: '',
        seats: '',
        large_bag: '',
        small_bag: '',
        car_specification: '',
        supplier: '',
        images: [],
      });
      setOldImages([]);
      setPreviewImages([]);
      setImageURLs([]);
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

  const handleAddImageURL = () => {
    if (newImageURL.trim()) {
      setImageURLs(prev => [...prev, newImageURL.trim()]);
      setPreviewImages(prev => [...prev, newImageURL.trim()]);
      setNewImageURL('');
    }
  };

  const removeOldImage = (id) => {
    setOldImages(prev => prev.filter(img => img.id !== id));
  };

  const removeNewImage = (index) => {
    setForm(prev => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });

    setPreviewImages(prev => {
      const newPreviews = [...prev];
      newPreviews.splice(oldImages.length + index, 1);
      return newPreviews;
    });
  };

  const addCar = useMutation({
    mutationFn: async (formData) => {
      return await api.post('/cars', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cars']);
      toast.success('Car added successfully');
      onClose();
    },
    onError: () => toast.error('Failed to add car'),
  });

  const updateCar = useMutation({
    mutationFn: async ({ id, formData }) => {
      return await api.post(`/cars/${id}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cars']);
      toast.success('Car updated successfully');
      onClose();
    },
    onError: () => toast.error('Failed to update car'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== 'images') {
        formData.append(key, value);
      }
    });

    form.images.forEach(image => formData.append('images[]', image));
    imageURLs.forEach(url => formData.append('image_urls[]', url));
    oldImages.forEach(img => formData.append('old_images[]', img.id));

    if (initialData?.id) {
      updateCar.mutate({ id: initialData.id, formData });
    } else {
      addCar.mutate(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>×</span>
        <h2>{initialData ? 'Edit Car' : 'Add Car'}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {[
            ['Brand', 'brand'],
            ['Model', 'model'],
            ['Type', 'type'],
            ['Year', 'year', 'number'],
            ['Rate', 'rate', 'number'],
            ['Price', 'price', 'number'],
            ['Location', 'location'],
            ['Seats', 'seats', 'number'],
            ['Large Bag', 'large_bag', 'number'],
            ['Small Bag', 'small_bag', 'number'],
            ['Car Specification', 'car_specification'],
            ['Supplier', 'supplier'],
            ['Booking Link', 'booking_link'],
          ].map(([label, name, type = 'text']) => (
            <React.Fragment key={name}>
              <label>{label}</label>
              <input type={type} name={name} value={form[name]} onChange={handleChange} required />
            </React.Fragment>
          ))}

          <label>Description (Arabic)</label>
          <textarea name="description_ar" value={form.description_ar} onChange={handleChange} required />

          <label>Description (English)</label>
          <textarea name="description_en" value={form.description_en} onChange={handleChange} required />

          <label>Upload Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />

          <label>Add Image URL</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="url"
              value={newImageURL}
              onChange={(e) => setNewImageURL(e.target.value)}
              placeholder="https://example.com/image.jpg"
              style={{ flex: 1 }}
            />
            <button type="button" onClick={handleAddImageURL}>Add</button>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            {/* الصور القديمة */}
            {oldImages.map((img, i) => (
              <div key={`old-${i}`} style={{ position: 'relative' }}>
                <img src={`${import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8000'}${img.image_path}`} alt="old" style={{ width: '100px', height: '80px' }} />
                <span onClick={() => removeOldImage(img.id)} style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: '#fff', cursor: 'pointer' }}>×</span>
              </div>
            ))}
            {/* الصور من الجهاز */}
            {form.images.map((_, i) => (
              <div key={`new-${i}`} style={{ position: 'relative' }}>
                <img src={previewImages[oldImages.length + i]} alt="new" style={{ width: '100px', height: '80px' }} />
                <span onClick={() => removeNewImage(i)} style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: '#fff', cursor: 'pointer' }}>×</span>
              </div>
            ))}
            {/* الصور من الروابط */}
            {imageURLs.map((url, i) => (
              <div key={`url-${i}`} style={{ position: 'relative' }}>
                <img src={url} alt="url" style={{ width: '100px', height: '80px' }} />
                <span onClick={() => setImageURLs(prev => prev.filter((_, index) => index !== i))} style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: '#fff', cursor: 'pointer' }}>×</span>
              </div>
            ))}
          </div>

          <button type="submit" className={styles.modalButton} disabled={addCar.isLoading || updateCar.isLoading}>
            {(addCar.isLoading || updateCar.isLoading) ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CarModal;
