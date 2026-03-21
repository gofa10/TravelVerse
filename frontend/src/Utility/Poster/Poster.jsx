import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component'; // استيراد LazyLoadImage
import 'react-lazy-load-image-component/src/effects/blur.css'; // استيراد التأثيرات

import image from '../../Assets/images/tc_cards_2024_c04.png';
import image1 from '../../Assets/images/Home-plane-1.png';

import styles from './Poster.module.css';
import { useTranslation } from 'react-i18next';

const Poster = () => {
    const { t } = useTranslation();

  return (
    <div className={`${styles.bg} p-10 `}>
      <Row className="align-items-center">
        <Col xs={12} md={6}>
          <h1 className={styles.posterTitle}> {t("plan_trip_title")}</h1>
          <p className={styles.posterDescription}>
            {t("plan_trip_description")}
          </p>
        </Col>
        <Col xs={12} md={6}>
          <LazyLoadImage
            src={image}
            alt="Poster"
            className={styles.posterImage}
            effect="blur"
            height="100%"
            width="100%"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Poster;
