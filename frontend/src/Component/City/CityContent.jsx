import React from 'react';
import ModernCategoryBar from '../../Utility/ModernCategoryBar/ModernCategoryBar';

export default function App({ countryName }) {
  return (
    <div style={{ position: 'sticky', top: '70px', zIndex: 1000 }}>
      <ModernCategoryBar countryName={countryName} />
    </div>
  );
}
