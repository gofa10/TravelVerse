import React from 'react';
import { Container } from 'react-bootstrap';
import style from '../../Style/City/City.module.css';
import { useTranslation } from 'react-i18next';

const CityPoster = ({ image, text, cityName }) => {
    const { t } = useTranslation();
  return (
    <Container>
      <h3 className={style.text}>{t("relatedStories")}</h3>
      <div className={style.poster}>
        {/* <p>{text}</p> */}
        {/* <img src={require(`../../Assets/images/${image}`)} alt={cityName} /> */}
      </div>
    </Container>
  );
};

export default CityPoster;
