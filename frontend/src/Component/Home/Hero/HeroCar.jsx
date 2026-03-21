import React from 'react';
import style from '../../../Style/HomeStyle/HeroPlane.module.css';
import { useTranslation } from 'react-i18next';

const HeroCar = ({image}) => {
  const { t } = useTranslation();

  return (
    <div className={style.video_container}>
      <img
        src={image}
        alt="خلفية تعرض مشهد السحاب"
        className={style.vid}
      />
    </div>
  );
};  

export default HeroCar;
