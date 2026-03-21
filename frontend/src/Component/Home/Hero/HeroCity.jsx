import React from 'react';
import cloud from '../../../Assets/images/backiee-91181.jpg';
import style from '../../../Style/HomeStyle/HeroPlane.module.css';
import plane from '../../../Assets/images/lotus-eletre-electric-suv-concept-cars-2022-5k-8k-7952x5304-7756-removebg-preview.png';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HeroCity = () => {
  const { t } = useTranslation();

  return (
    <div className={style.video_container}>
      <img
        src={cloud}
        alt="خلفية تعرض مشهد السحاب"
        className={style.vid}
      />
      <div className={style.info}>
        <div className={style.container}>
          <Row className={style.row_car}>
            <Col xs={4} lg="2" className={style.col}>
              <div className={style.num}>
                <Link to="/">1</Link>
              </div>
              <div className={style.num}>
                <Link to="/herocar">2</Link>
              </div>
              <div className={style.num}><Link to="/herocity">3</Link></div>
            </Col>
            <Col xs={8} lg="4" className={style.text} style={{color:"white"}}>
              <h4>{t('elevate')}</h4>
              <h2>{t('experience')}</h2>
              <p>{t('discover')}</p>
            </Col>
            <Col lg="6">
              <Row>
                {/* <img
                  src={plane}
                  alt="صورة طائرة"
                  className={style.plane_image}
                /> */}
              </Row>
              {/* <Row className={style.car}>
                <div className={style.small_text}>{t('knowledge')} === </div>
                <div className={style.big_text}>
                  <h5>{t('awesom')}</h5>
                  <p>{t('Lorem')}</p>
                </div>
              </Row> */}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default HeroCity;
