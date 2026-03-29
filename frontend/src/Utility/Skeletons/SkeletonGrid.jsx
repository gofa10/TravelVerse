import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CardSkeleton from './CardSkeleton';

const SkeletonGrid = ({ count = 4, lg = 3 }) => {
  return (
    <Row>
      {Array.from({ length: count }).map((_, i) => (
        <Col key={i} xs={12} sm={6} md={4} lg={lg} className="mb-4">
          <CardSkeleton />
        </Col>
      ))}
    </Row>
  );
};

export default SkeletonGrid;
