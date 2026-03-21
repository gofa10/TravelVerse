import React, { useState } from 'react'
import video from '../../Assets/videos/travel_trip.mp4'
import { useTranslation } from 'react-i18next';
const LandingPage = ({ onVideoEnd }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const handleVideoLoaded = () => {
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {loading && (
        <div style={{ marginBottom: '20px' }}>
          <p>{t('loading')}</p>
          <div className="loader" style={loaderStyle}></div>
        </div>
      )}
      <video
        src={video}
        autoPlay
        muted
        onEnded={onVideoEnd}
        onLoadedData={handleVideoLoaded}
        style={{ width: '100%', height: 'auto' }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const loaderStyle = {
  border: '8px solid #f3f3f3',
  borderRadius: '50%',
  borderTop: '8px solid #3498db',
  width: '50px',
  height: '50px',
  animation: 'spin 2s linear infinite',
};
export default LandingPage
