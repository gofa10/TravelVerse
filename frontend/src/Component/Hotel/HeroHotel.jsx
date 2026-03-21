import React from 'react'
import style from '../../Style/City/City.module.css';
import video from '../../Assets/videos/hotel_scene.mp4';
const HeroHotel = () => {
  return (
    <div>
      <div className={style.hero}>
        <video className={style.video} src={video} autoPlay loop muted></video>
      </div>
    </div>
  )
}

export default HeroHotel
