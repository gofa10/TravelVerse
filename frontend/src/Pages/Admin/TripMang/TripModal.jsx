import React, { useState, useEffect } from 'react';
import styles from '../UserMang/UserManagement.module.css';
import api from '../../../Radux/axios';
import { useTranslation } from 'react-i18next';

function TripModal({ isOpen, onClose, onSubmit, initialData }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name_ar: '',
    name_en: '',
    description_ar: '',
    description_en: '',
    rate: '',
    price: '',
    start_date: '',
    end_date: '',
    duration: '',
    location: '',
    continent: '',
    difficulty: '',
    images: [],
    has_guide: false,
    guide_id: '',
    booking_link: ''
  });
  const [imageUrls, setImageUrls] = useState(['']);
  const [previewImages, setPreviewImages] = useState([]);
  const [guides, setGuides] = useState([]);

  // Fetch tour guides whenever modal opens.
  // AbortController prevents React Strict Mode's double-invoke from
  // leaving both requests alive and producing duplicates.
  useEffect(() => {
    if (!isOpen) return;
    const controller = new AbortController();
    api.get('/users/guides', { signal: controller.signal })
      .then(res => {
        // Deduplicate by id as a safety net
        const seen = new Set();
        const unique = res.data.filter(g => {
          if (seen.has(g.id)) return false;
          seen.add(g.id);
          return true;
        });
        setGuides(unique);
      })
      .catch(err => {
        if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
          setGuides([]);
        }
      });
    return () => controller.abort();
  }, [isOpen]);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        guide_id: initialData.guide_id || '',
        has_guide: !!initialData.guide_id
      });
      if (initialData.images) {
        setPreviewImages(
          initialData.images.map(img =>
            typeof img === 'string' ? img : URL.createObjectURL(img)
          )
        );
      }
    } else {
      setForm({
        name_ar: '',
        name_en: '',
        description_ar: '',
        description_en: '',
        rate: '',
        price: '',
        start_date: '',
        end_date: '',
        duration: '',
        location: '',
        continent: '',
        difficulty: '',
        images: [],
        has_guide: false,
        guide_id: '',
        booking_link: ''
      });
      setPreviewImages([]);
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm(prev => ({
        ...prev,
        [name]: checked,
        // Clear guide_id when unchecking the guide checkbox
        ...(name === 'has_guide' && !checked ? { guide_id: '' } : {})
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setForm(prev => ({ ...prev, images: files }));
    setPreviewImages(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allowedDifficulties = ['easy', 'medium', 'hard'];
    if (!allowedDifficulties.includes(form.difficulty)) {
      alert(t('error_select_difficulty'));
      return;
    }

    onSubmit({ id: initialData?.id || null, ...form, image_urls: imageUrls.filter(url => url) });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>×</span>
        <h2>{initialData ? t('edit_trip') : t('add_trip')}</h2>
        <form onSubmit={handleSubmit}>
          <label>{t('arabic_name')}</label>
          <input name="name_ar" value={form.name_ar} onChange={handleChange} required />

          <label>{t('english_name')}</label>
          <input name="name_en" value={form.name_en} onChange={handleChange} required />

          <label>{t('arabic_description')}</label>
          <textarea name="description_ar" value={form.description_ar} onChange={handleChange} required />

          <label>{t('english_description')}</label>
          <textarea name="description_en" value={form.description_en} onChange={handleChange} required />

          <label>{t('rate')}</label>
          <input type="number" step="0.1" name="rate" value={form.rate} onChange={handleChange} required />

          <label>{t('price')}</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required />

          <label>{t('start_date')}</label>
          <input type="date" name="start_date" value={form.start_date} onChange={handleChange} required />

          <label>{t('end_date')}</label>
          <input type="date" name="end_date" value={form.end_date} onChange={handleChange} required />

          <label>{t('duration')}</label>
          <input name="duration" value={form.duration} onChange={handleChange} required />

          <label>{t('location')}</label>
          <input name="location" value={form.location} onChange={handleChange} required />

          <label>{t('continent')}</label>
          <input name="continent" value={form.continent} onChange={handleChange} />

          <label>{t('difficulty')}</label>
          <select name="difficulty" value={form.difficulty} onChange={handleChange} required>
            <option value="">{t('select')}</option>
            <option value="easy">{t('easy')}</option>
            <option value="medium">{t('medium')}</option>
            <option value="hard">{t('hard')}</option>
          </select>

          <label>{t('tour_guide_included')}</label>
          <input type="checkbox" name="has_guide" checked={form.has_guide} onChange={handleChange} />

          {form.has_guide && (
            <>
              <label>{t('guide')}</label>
              <select name="guide_id" value={form.guide_id} onChange={handleChange} required>
                <option value="">{t('select_guide')}</option>
                {guides.map(guide => (
                  <option key={guide.id} value={guide.id}>
                    {guide.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <label>{t('booking_link')}</label>
          <input name="booking_link" value={form.booking_link} onChange={handleChange} required />

          <label>{t('images')}</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            {previewImages.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} style={{ width: '100px', height: '80px', objectFit: 'cover' }} />
            ))}
          </div>
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

          <button type="submit" className={styles.modalButton}>{t('save')}</button>
        </form>
      </div>
    </div>
  );
}

export default TripModal;
