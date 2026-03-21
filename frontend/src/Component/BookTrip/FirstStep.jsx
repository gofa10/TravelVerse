import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ChoseTripType from '../../Utility/Buttons/Radio/ChoseTripType';
// import image from '../../Assets/images/tony-lee-i_XLLP08BOc-unsplash.jpg';
import { ClockFading, MapPlus, MountainSnow, ShieldPlus } from 'lucide-react';
import { useTranslation } from "react-i18next";

export const FirstStep = ({image}) => {
const { t } = useTranslation();
  return (
   <>
          <img
            src={image}
            alt="Travel"
            style={{ width: '100%', height: 'auto', borderRadius: '25px' }}
          />

          <h2 className="mt-3">{t("whyTravelWithUs")}</h2>
          <Row className="mt-1 g-3">
            <Col xs={12} md={6}>
              <div className="d-flex align-items-start gap-2">
                <MapPlus color="#524c4c" />
                <p className="mb-0">{t("whyAuthentic")}</p>
              </div>
              <div className="d-flex align-items-start gap-2 mt-2">
                <ClockFading color="#524c4c" />
                <p className="mb-0">{t("whyEasy")}</p>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="d-flex align-items-start gap-2">
                <ShieldPlus color="#524c4c" />
                <p className="mb-0">{t("whyHassleFree")}</p>
              </div>
              <div className="d-flex align-items-start gap-2 mt-2">
                <MountainSnow color="#524c4c" />
                <p className="mb-0">{t("whyLocal")}</p>
              </div>
            </Col>
          </Row>



    </>
  );
};
