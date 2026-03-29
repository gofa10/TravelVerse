import React from 'react';
import ModernCategoryBar from '../../Utility/ModernCategoryBar/ModernCategoryBar';
import style from '../../Style/City/CityContent.module.css';

export default function App({ countryName }) {
  return (
    <div className={style.cityContentDock}>
      <ModernCategoryBar countryName={countryName} />
    </div>
  );
}
