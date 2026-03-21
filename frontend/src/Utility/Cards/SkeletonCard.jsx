import React from 'react';
import { Skeleton } from '@mui/material';
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const SkeletonCard = () => (
  <MDBRow className="justify-content-center mb-3">
    <MDBCol md="12" xl="10">
      <MDBCard className="shadow-0 border rounded-3">
        <MDBCardBody style={{ padding: '0' }}>
          <MDBRow>
            <MDBCol md="12" lg="5">
              <Skeleton variant="rectangular" height={200} />
            </MDBCol>
            <MDBCol md="4">
              <Skeleton variant="text" height={30} width="60%" />
              <Skeleton variant="text" height={20} width="80%" />
              <Skeleton variant="text" height={20} width="90%" />
            </MDBCol>
            <MDBCol md="6" lg="3">
              <Skeleton variant="text" height={30} width="40%" />
              <Skeleton variant="rectangular" height={40} width="80%" />
              <Skeleton variant="rectangular" height={40} width="80%" style={{ marginTop: '10px' }} />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
);

export default SkeletonCard;

