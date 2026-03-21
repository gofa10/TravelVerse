import React from 'react';
import FeaturedCard from '../../../Utility/Cards/FeaturedCard';
import { Col, Container, Row } from 'react-bootstrap';
import style from '../../../Style/HomeStyle/FeaturedContainer.module.css';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';

const FeaturedCards = [
  { title: 'stats_titles', Icon: TravelExploreIcon },
  { title: 'stats_supporting', Icon: ConnectingAirportsIcon },
  { title: 'stats_outstanding', Icon: DownhillSkiingIcon },
];

const FeaturedContainer = () => {
  return (
    <Container className={style.container}>
      <Row>
        {FeaturedCards.map((card, index) => (
          <Col xs={6} md={6} lg={4} xl={4} key={index} className={style.col}>
            <FeaturedCard title={card.title} Icon={card.Icon} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedContainer;
