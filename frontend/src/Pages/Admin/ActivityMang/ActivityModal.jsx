import React, { useState, useEffect } from 'react';
import styles from '../UserMang/UserManagement.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../Radux/axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function ActivityModal({ isOpen, onClose, initialData }) {
  const { t } = useTranslation();
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [rate, setRate] = useState('');
  const [location, setLocation] = useState('');
  const [bookingLink, setBookingLink] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [type, setType] = useState('');
  const [startTime, setStartTime] = useState([]);
  const [startInput, setStartInput] = useState('');
  const [liveGuide, setLiveGuide] = useState(false);
  const [guideLanguages, setGuideLanguages] = useState([]);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState(['']);
  const [previewImages, setPreviewImages] = useState([]);

  const languageOptions = ['Arabic', 'English', 'French', 'German', 'Spanish'];
  const queryClient = useQueryClient();

  useEffect(() => {
    if (initialData) {
      setNameEn(initialData.name_en || '');
      setNameAr(initialData.name_ar || '');
      setDescriptionEn(initialData.description_en || '');
      setDescriptionAr(initialData.description_ar || '');
      setRate(initialData.rate || '');
      setLocation(initialData.location || '');
      setBookingLink(initialData.booking_link || '');
      setPrice(initialData.price || '');
      setDuration(initialData.duration || '');
      setType(initialData.type || '');
      setStartTime(Array.isArray(initialData.start_time) ? initialData.start_time : []);
      setLiveGuide(!!initialData.live_guide);
      setGuideLanguages(Array.isArray(initialData.guide_languages) ? initialData.guide_languages : []);
      const urls = Array.isArray(initialData.images) ? initialData.images : [];
      setImageUrls(urls);
      setPreviewImages(urls);
      setImages([]);
    } else {
      setNameEn('');
      setNameAr('');
      setDescriptionEn('');
      setDescriptionAr('');
      setRate('');
      setLocation('');
      setBookingLink('');
      setPrice('');
      setDuration('');
      setType('');
      setStartTime([]);
      setLiveGuide(false);
      setGuideLanguages([]);
      setImages([]);
      setImageUrls(['']);
      setPreviewImages([]);
    }
  }, [initialData, isOpen]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages([...imageUrls, ...files.map(file => URL.createObjectURL(file))]);
  };

  const handleUrlsChange = (index, value) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
    setPreviewImages([...updated, ...images.map(file => URL.createObjectURL(file))]);
  };

  const addStartTime = () => {
    if (startInput.trim()) {
      setStartTime([...startTime, startInput]);
      setStartInput('');
    }
  };

  const removeStartTime = (time) => {
    setStartTime(startTime.filter(t => t !== time));
  };

  const mutation = useMutation({
    mutationFn: async ({ formData, id }) => {
      const url = id
        ? `/activities/${id}?_method=PUT`
        : '/activities';
      return api.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['activities']);
      onClose();
      toast.success(t('activity_saved_success'));
    },
    onError: (error) => {
      console.error("❌ Error:", error.response?.data);
      toast.error(t('activity_save_failed'));
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (initialData?.id) formData.append('id', initialData.id);
    formData.append('name_en', nameEn);
    formData.append('name_ar', nameAr);
    formData.append('description_en', descriptionEn);
    formData.append('description_ar', descriptionAr);
    formData.append('rate', rate);
    formData.append('location', location);
    formData.append('booking_link', bookingLink);
    formData.append('price', price);
    formData.append('duration', duration);
    formData.append('type', type);
    formData.append('live_guide', liveGuide ? '1' : '0');

    startTime.forEach(t => formData.append('start_time[]', t));
    guideLanguages.forEach(l => formData.append('guide_languages[]', l));
    images.forEach(img => formData.append('images[]', img));
    imageUrls.forEach((url) => {
      if (url) formData.append('image_urls[]', url);
    });

    mutation.mutate({ formData, id: initialData?.id });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>×</span>
        <h2>{initialData ? t('update_activity') : t('add_activity_modal')}</h2>
        <form onSubmit={handleSubmit}>
          <label>{t('english_name')}</label>
          <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} required />

          <label>{t('arabic_name')}</label>
          <input value={nameAr} onChange={(e) => setNameAr(e.target.value)} required />

          <label>{t('description_english')}</label>
          <textarea value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} />

          <label>{t('description_arabic')}</label>
          <textarea value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} />

          <label>{t('rate')}</label>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />

          <label>{t('location')}</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} required />

          <label>{t('booking_link')}</label>
          <input value={bookingLink} onChange={(e) => setBookingLink(e.target.value)} />

          <label>{t('price')}</label>
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />

          <label>{t('duration')}</label>
          <input value={duration} onChange={(e) => setDuration(e.target.value)} />

          <label>{t('type')}</label>
          <input value={type} onChange={(e) => setType(e.target.value)} />

          <label>{t('start_times')}</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input value={startInput} onChange={(e) => setStartInput(e.target.value)} />
            <button type="button" onClick={addStartTime}>{t('add')}</button>
          </div>
          <ul>
            {startTime.map((t, i) => (
              <li key={i}>{t} <button type="button" onClick={() => removeStartTime(t)}>×</button></li>
            ))}
          </ul>

          <label>{t('live_guide')}</label>
          <input type="checkbox" checked={liveGuide} onChange={(e) => setLiveGuide(e.target.checked)} />

          {liveGuide && (
            <>
              <label>{t('guide_languages')}</label>
              <select multiple value={guideLanguages} onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions).map(o => o.value);
                setGuideLanguages(selected);
              }}>
                {languageOptions.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </>
          )}

          <label>{t('upload_images')}</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />

          <label>{t('image_urls')}</label>
          {imageUrls.map((url, i) => (
            <input key={i} value={url} onChange={(e) => handleUrlsChange(i, e.target.value)} />
          ))}
          <button type="button" onClick={() => setImageUrls([...imageUrls, ''])}>{t('add_image_url')}</button>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            {previewImages.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} style={{ width: '100px', height: '80px', objectFit: 'cover' }} />
            ))}
          </div>

          <button type="submit" className={styles.modalButton} disabled={mutation.isLoading}>
            {mutation.isLoading ? t('loading') : t('save')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ActivityModal;
