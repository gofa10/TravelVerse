import React from "react";
import Marquee from "react-fast-marquee";
import styles from "./Ad.module.css";
import image1 from '../../Assets/images/8K-HD-Background-Wallpaper-7680x4320-126-scaled-removebg-preview.png'
// import image2 from '../../asset'
// import image3 from '../../assets/electric-bus-3840x2160-london-first-electric-double-decker-bus-9771.jpg'
const Ad = () => {
  return (
    <div className={styles.posterContainer}>
      <Marquee 
        speed={100} 
        gradientColor={[255, 255, 255]} 
        gradientWidth={300} 
        className={styles.poster}
      >
        <h2>مرحبًا بكم في متجرنا </h2>
        <h3>أفضل العروض هنا!</h3>
        <h2>اشترِ الآن</h2>
        <img src={image1} alt="" style={{width:150}}/>

        <h3>توصيل مجاني</h3>
        <h2>مرحبًا بكم في متجرنا</h2>
        <img src={image1} alt="" style={{width:150}} />

        <h3>أفضل العروض هنا!</h3>
        <h2>اشترِ الآن</h2>
        <h3>توصيل مجاني</h3>
        <img src={image1} alt="" style={{width:150}}/>
      </Marquee>
    </div>
  );
};

export default Ad;
