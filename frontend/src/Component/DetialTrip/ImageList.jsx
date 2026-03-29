import React from 'react';
import { ImageList, ImageListItem } from '@mui/material'; // تأكد من تثبيت @mui/material
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import { getStorageUrl, isCorsBlockedImageHost, normalizeStorageAssetUrl } from '../../Utility/envUtils.js';

const ImageGallery = ({ images = [] }) => {
  if (images.length === 0) {
    return (
      <div className="d-block w-100 bg-light d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
        <div className="text-center">
          <i className="fas fa-image fa-3x text-muted mb-3"></i>
          <p className="text-muted">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <MDBCarousel showControls fade>
      {images.map((img, idx) => {
        // Support both string URLs and image objects with url property
        let imageUrl = typeof img === 'string' ? img : img?.url;
        if (!imageUrl) return null;

        // If it's a relative path, convert to full storage URL
        if (!imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
          imageUrl = getStorageUrl(imageUrl);
        }

        imageUrl = normalizeStorageAssetUrl(imageUrl);
        if (isCorsBlockedImageHost(imageUrl)) {
          imageUrl = '/fallback.jpg';
        }

        return (
          <MDBCarouselItem itemId={idx + 1} key={idx}>
            <img
              src={imageUrl}
              className="d-block w-100"
              alt={`slide-${idx}`}
              style={{ objectFit: 'cover', height: '400px' }}
              onError={(e) => {
                e.target.src = "/fallback.jpg";
              }}
            />
          </MDBCarouselItem>
        );
      })}
    </MDBCarousel>
  );
};


export default ImageGallery;
