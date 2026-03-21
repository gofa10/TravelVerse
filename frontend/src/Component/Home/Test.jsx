import React, { useState, useEffect } from 'react';
// import image from '../../Assets/images/test/male001.png'
const RotatingComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
  const images = Array.from({ length: 300 }, (_, i) => require(`../../Assets/images/test/male0${i + 1}.png`));


  // التبديل التلقائي
  useEffect(() => {
    if (isDragging) return; // توقف التبديل التلقائي أثناء السحب
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 100);
    return () => clearInterval(interval);
  }, [images.length, isDragging]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        userSelect: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      
    >
      <img
        src={images[currentIndex]}
        alt="Rotating object"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      
    </div>
  );
};

export default RotatingComponent;
