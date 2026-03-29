import React from "react";
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import StarIcon from '@mui/icons-material/Star';
import ActionButtons from "../Buttons/ActionButtons";
import TypeBadge from "./TypeBadge";
import WatchlistButton from "../Buttons/WatchlistButton";
import { getStorageUrl } from '../envUtils.js';
import useImageFallback from "../../Components/Common/useImageFallback";

const getFullImageUrl = (img) => {
  if (!img) return "";
  if (Array.isArray(img)) img = img[0];
  if (typeof img === "object" && img.url) img = img.url;
  if (typeof img !== "string") return "";
  if (img.startsWith("http") || img.startsWith("data:")) return img;
  const path = img.startsWith("/") ? img : `/${img}`;
  return getStorageUrl(path);
};

const CruiseCardRow = ({ cruise, onCardClick }) => {
  const { src: safeImageSrc, onError: handleImageError } = useImageFallback(
    getFullImageUrl(cruise.images?.[0])
  );

  return (
    <MDBRow className="justify-content-center mb-3">
      <MDBCol md="12" xl="12">
        <div
          onClick={() => onCardClick(cruise.id)}
          style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
        >
          <MDBCard className="shadow-0 border rounded-3 overflow-hidden">
            <MDBCardBody
              style={{
                padding: '0',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <MDBRow>
                <MDBCol md="12" lg="5" className="mb-4 mb-lg-0 relative">
                  <MDBRipple rippleTag="div" className="bg-image rounded hover-zoom hover-overlay">
                    <MDBCardImage
                      src={safeImageSrc}
                      alt={cruise.name || cruise.name_en || 'Cruise image'}
                      fluid
                      className="w-100"
                      style={{ height: '250px', objectFit: 'cover', filter: 'saturate(0.9) contrast(0.96)' }}
                      onError={handleImageError}
                      loading="lazy"
                    />
                  </MDBRipple>
                  <TypeBadge type="cruise" />
                  <div
                    style={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <WatchlistButton type="cruise" id={cruise.id} title={cruise.name || cruise.name_en} />
                  </div>
                </MDBCol>

                <MDBCol md="4" className="py-3">
                  <h5 className="mb-3" style={{ color: 'var(--text-primary)', fontWeight: 700, letterSpacing: '-0.01em' }}>
                    {cruise.name || cruise.name_en}
                  </h5>
                  <div className="d-flex align-items-center mb-2">
                    <StarIcon style={{ color: 'var(--color-warning)', fontSize: '18px', marginRight: '4px' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{cruise.rate || 0} Rating</span>
                  </div>
                  <div className="mb-2">
                    <AccessTimeIcon style={{ fontSize: '18px', marginRight: '8px', color: 'var(--text-muted)' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{cruise.duration || 'N/A'}</span>
                  </div>
                  <div className="mb-2">
                    <DirectionsBoatIcon style={{ fontSize: '18px', marginRight: '8px', color: 'var(--text-muted)' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{cruise.property_type || 'Standard Cruise'}</span>
                  </div>
                  <div className="mb-2">
                    <LocationOnIcon style={{ fontSize: '18px', marginRight: '8px', color: 'var(--text-muted)' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{cruise.location || 'N/A'}</span>
                  </div>
                  {cruise.from && cruise.to && (
                    <div className="mb-2">
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        {cruise.from} → {cruise.to}
                      </span>
                    </div>
                  )}
                </MDBCol>

                <MDBCol md="6" lg="3" className="border-sm-start-none border-start d-flex flex-column justify-content-center py-3">
                  <div className="d-flex flex-row align-items-center mb-3">
                    <h4 className="mb-0 me-2" style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>${cruise.price}</h4>
                  </div>
                  <div
                    className="d-flex flex-column"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <ActionButtons data={cruise} type="cruise" />
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </div>
      </MDBCol>
    </MDBRow>
  );
};

const CruiseCard = ({ cruises = [], loading }) => {
  const navigate = useNavigate();

  const handleCardClick = (cruiseId) => {
    navigate(`/itemdetail/${cruiseId}?type=cruise`);
  };
  if (loading) {
    return (
      <MDBContainer fluid>
        {[...Array(3)].map((_, index) => (
          <MDBRow key={index} className="justify-content-center mb-3">
            <MDBCol md="12" xl="12">
              <MDBCard className="shadow-0 border rounded-3">
                <MDBCardBody>
                  <div style={{ height: '200px', background: '#eee', borderRadius: '10px' }} />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        ))}
      </MDBContainer>
    );
  }

  return (
    <MDBContainer fluid>
      {cruises.map((cruise) => (
        <CruiseCardRow key={cruise.id} cruise={cruise} onCardClick={handleCardClick} />
      ))}
    </MDBContainer>
  );
};

export default React.memo(CruiseCard);
