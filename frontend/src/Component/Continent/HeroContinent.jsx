import React from "react";
import styles from "../../Style/Continent/HeroContinent.module.css";
import ModernSearchBar from "./ModernSearchBar";

const HeroContinent = ({ backgroundImage, countryName, description, images, cities }) => {
  // console.log(backgroundImage)
  return (
    <div
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* تأثير جانبي */}
      <div className={styles.slash}></div>

      {/* العنوان الرئيسي */}
      <header>
        {/* <h2>Amazing</h2> */}
        <h1>
          <span>{countryName}</span>
        </h1>
        <p>{description}</p>
        <div className="hero-search-wrapper" style={{ marginTop: '20px' }}>
          <ModernSearchBar countries={cities} />
        </div>
      </header>

      {/* الصور الجانبية */}
      <div className={styles.image_container}>
        {images?.map((image, index) => (
          <div
            key={index}
            className={`${styles[image.className]}`}
            style={{ backgroundImage: image.src ? `url(${image.src})` : "none" }}
          >
            {image.text && <p style={{ whiteSpace: "pre-wrap" }}>{image.text}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroContinent;
