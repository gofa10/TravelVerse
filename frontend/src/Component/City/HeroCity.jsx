import React from 'react';
import style from '../../Style/City/City.module.css';

const HeroCity = ({ countryName, videoSrc }) => {
  return (
    <div>
      <div className={style.hero}>
        {/* <video className={style.video} src={require(`../../Assets/videos/${videoSrc}`)} autoPlay loop muted></video> */}
      </div>
    </div>
  );
};

export default HeroCity;
