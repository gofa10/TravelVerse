import React, { useState, useEffect } from 'react';
import styles from '../UserMang/UserManagement.module.css';
import api from '../../../Radux/axios';

function TripModal({ isOpen, onClose, onSubmit, initialData }) {
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
      alert('Please select a valid difficulty');
      return;
    }

    onSubmit({ id: initialData?.id || null, ...form, image_urls: imageUrls.filter(url => url) });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>×</span>
        <h2>{initialData ? 'Edit Trip' : 'Add Trip'}</h2>
        <form onSubmit={handleSubmit}>
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

          <label>Price</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required />

          <label>Start Date</label>
          <input type="date" name="start_date" value={form.start_date} onChange={handleChange} required />

          <label>End Date</label>
          <input type="date" name="end_date" value={form.end_date} onChange={handleChange} required />

          <label>Duration</label>
          <input name="duration" value={form.duration} onChange={handleChange} required />

          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} required />

          <label>Continent</label>
          <input name="continent" value={form.continent} onChange={handleChange} />

          <label>Difficulty</label>
          <select name="difficulty" value={form.difficulty} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <label>Tour Guide Included?</label>
          <input type="checkbox" name="has_guide" checked={form.has_guide} onChange={handleChange} />

          {form.has_guide && (
            <>
              <label>Tour Guide</label>
              <select name="guide_id" value={form.guide_id} onChange={handleChange} required>
                <option value="">-- Select a Guide --</option>
                {guides.map(guide => (
                  <option key={guide.id} value={guide.id}>
                    {guide.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <label>Booking Link</label>
          <input name="booking_link" value={form.booking_link} onChange={handleChange} required />

          <label>Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            {previewImages.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} style={{ width: '100px', height: '80px', objectFit: 'cover' }} />
            ))}
          </div>
          <label>Image URLs (optional)</label>
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
            + Add another URL
          </button>

          <button type="submit" className={styles.modalButton}>Save</button>
        </form>
      </div>
    </div>
  );
}

export default TripModal;
