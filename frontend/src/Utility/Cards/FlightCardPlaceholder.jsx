// FlightCardPlaceholder.jsx
import React from "react";
import { MDBCard, MDBCardBody, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Placeholder } from "react-bootstrap";

const FlightCardPlaceholder = () => {
  return (
    <MDBRow className="justify-content-center mb-3">
      <MDBCol md="12" xl="10">
        <MDBCard className="shadow-0 border rounded-3">
          <MDBCardBody style={{ padding: "0" }}>
            <MDBRow>
              {/* الجانب الأول - Checkbox وهمي */}
              <MDBCol
                md="12"
                lg="5"
                className="mb-4 mb-lg-0 d-flex align-items-center justify-content-center"
              >
                <div>
                  <Placeholder as="p" animation="wave">
                    <Placeholder xs={8} />
                  </Placeholder>
                  <Placeholder as="p" animation="wave">
                    <Placeholder xs={6} />
                  </Placeholder>
                </div>
              </MDBCol>

              {/* الوسط - تفاصيل وهمية */}
              <MDBCol md="4">
                <Placeholder as="h5" animation="wave">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as="p" animation="wave">
                  <Placeholder xs={4} />
                </Placeholder>
              </MDBCol>

              {/* السعر وأزرار */}
              <MDBCol md="6" lg="3" className="border-sm-start-none border-start">
                <Placeholder as="div" animation="wave">
                  <Placeholder xs={4} className="me-2" />
                  <Placeholder xs={3} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} className="mt-3" />
                <Placeholder.Button variant="outline-primary" xs={8} className="mt-2" />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default FlightCardPlaceholder;
