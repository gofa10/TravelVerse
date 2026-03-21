import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import style from '../../Style/Hotel/Hotel.module.css';
import DateInput from '../../Utility/Buttons/DateInput/DateInput';

const DateFilter = ({ countryName }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  return (
    <Container>
      <h1>{countryName} Hotels and Places to Stay</h1>
      <Row className={style.info}>
        <Col>
          <DateInput label="Check In" value={checkIn} onChange={setCheckIn} />
        </Col>
        <Col>
          <DateInput label="Check Out" value={checkOut} onChange={setCheckOut} />
        </Col>
      </Row>
    </Container>
  );
};

export default DateFilter;
