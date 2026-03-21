import React from 'react';
import { ImageList, ImageListItem } from '@mui/material'; // تأكد من تثبيت @mui/material
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

const BASE_URL = import.meta.env.VITE_API_BASE_URL.replace('/api', '') + '';
const ImageGallery = ({ images = [] }) => {
  if (images.length === 0) return null;

  return (
    <MDBCarousel showControls fade>
      {images.map((img, idx) => {
        // Support both string URLs and image objects with url property
        const imageUrl = typeof img === 'string' ? img : img?.url;
        if (!imageUrl) return null;

        return (
          <MDBCarouselItem itemId={idx + 1} key={idx}>
            <img
              src={imageUrl.startsWith('http') ? imageUrl : `${BASE_URL}${imageUrl}`}
              className="d-block w-100"
              alt={`slide-${idx}`}
              style={{ objectFit: 'cover' }}
            />
          </MDBCarouselItem>
        );
      })}
    </MDBCarousel>
  );
};


export default ImageGallery;
