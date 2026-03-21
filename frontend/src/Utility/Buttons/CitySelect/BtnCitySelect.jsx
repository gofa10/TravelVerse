import React from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function App({ cities }) {
     const { t } = useTranslation();
  return (
    <MDBDropdown>
    <MDBDropdownToggle
      tag="a"
      className="btn btn-primary"
      style={{ width: "420px", height: "50px", fontSize: "20px", fontWeight: "bold" ,textAlign: "center" }}
    >
      {t("selectCity")}
    </MDBDropdownToggle>
    <MDBDropdownMenu>
      <Row>
        {cities.map((city, index) => (
          <Link
            to={`/city/${city}`}
            key={index}
            style={{
              textDecoration: 'none',
              color: 'black',
              fontSize: '16px',
              // textAlign: 'center'
              marginLeft:'15px'
            }}
          >
            <MDBDropdownItem>{city}</MDBDropdownItem>
          </Link>
        ))}
      </Row>
    </MDBDropdownMenu>
  </MDBDropdown>
  );
}
