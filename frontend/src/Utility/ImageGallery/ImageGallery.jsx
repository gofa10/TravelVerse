import React, { useState, useEffect } from 'react';
import './ImageGallery.css';
import { normalizeStorageAssetUrl, getStorageUrl, isCorsBlockedImageHost } from '../../Utility/envUtils.js';

const ImageGallery = ({ images = [] }) => {
  const [activeImage, setActiveImage] = useState('');

  const getFullImageUrl = (img) => {
    let url = typeof img === 'string' ? img : img?.url;
    if (!url) return '/fallback.jpg';
    if (!url.startsWith('http') && !url.startsWith('data:')) {
      url = getStorageUrl(url);
    }
    url = normalizeStorageAssetUrl(url);
    return isCorsBlockedImageHost(url) ? '/fallback.jpg' : url;
  };

  useEffect(() => {
    if (images && images.length > 0) {
      setActiveImage(getFullImageUrl(images[0]));
    } else {
      setActiveImage('/fallback.jpg');
    }
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="image-gallery">
        <div className="gallery-main text-center bg-light rounded-lg d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
          <div>
            <i className="fas fa-image fa-3x text-muted mb-3"></i>
            <p className="text-muted">No images available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="image-gallery">
      <div className="gallery-main">
        <img 
          src={activeImage} 
          alt="main-gallery" 
          className="gallery-main-img" 
          loading="lazy" 
          onError={(e) => { e.target.src = '/fallback.jpg'; }}
        />
      </div>
      <div className="gallery-thumbs">
        {images.map((img, i) => {
          const url = getFullImageUrl(img);
          return (
            <img
              key={i}
              src={url}
              alt={`thumb-${i}`}
              className={`gallery-thumb ${activeImage === url ? 'active' : ''}`}
              onClick={() => setActiveImage(url)}
              loading="lazy"
              onError={(e) => { e.target.src = '/fallback.jpg'; }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
