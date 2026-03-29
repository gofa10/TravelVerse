import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import LuggageIcon from '@mui/icons-material/Luggage';
import WorkIcon from '@mui/icons-material/Work';
import DoorFrontIcon from '@mui/icons-material/DoorFront';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SettingsIcon from '@mui/icons-material/Settings';
import ActionButtons from "../Buttons/ActionButtons";
import TypeBadge from "./TypeBadge";
import WatchlistButton from "../Buttons/WatchlistButton";
import useImageFallback from "../../Components/Common/useImageFallback";
import { getStorageBaseUrl } from "../envUtils";

// ✅ دالة getFullImageUrl مدموجة هنا مباشرة
const getFullImageUrl = (img) => {
  if (!img) return "";
  if (Array.isArray(img)) img = img[0];
  if (typeof img === "object" && img.url) img = img.url;
  if (typeof img !== "string") return "";
  if (img.startsWith("http") || img.startsWith("data:")) return img;
  const baseUrl = getStorageBaseUrl();
  return `${baseUrl}${img.startsWith("/") ? "" : "/"}${img}`;
};

const formatCarPrice = (value) => {
  const amount = Number.parseFloat(value);
  if (!Number.isFinite(amount) || amount <= 0) {
    return 'Price on request';
  }
  return `$${Math.round(amount)}/day`;
};

export const CarCardRow = ({ product, onCardClick }) => {
  const specs = typeof product.car_specification === 'string'
    ? product.car_specification.toLowerCase()
    : '';
  const { src: safeImageSrc, onError: handleImageError } = useImageFallback(
    getFullImageUrl(product.images?.[0])
  );

  return (
    <MDBRow className="justify-content-center mb-3">
      <MDBCol md="12" xl="12">
        <div
          onClick={() => onCardClick(product.id)}
          style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
        >
          <MDBCard className="shadow-0 border rounded-3 overflow-hidden">
            <MDBCardBody style={{ padding: '0' }}>
              <MDBRow>
                <MDBCol md="12" lg="5" className="mb-4 mb-lg-0 relative">
                  <MDBRipple rippleTag="div" className="bg-image rounded hover-zoom hover-overlay">
                    <MDBCardImage
                      src={safeImageSrc}
                      alt={`${product.brand ?? ''} ${product.model ?? ''} car`.trim()}
                      fluid
                      className="w-100"
                      onError={handleImageError}
                      loading="lazy"
                    />
                  </MDBRipple>
                  <TypeBadge type="car" />
                  <div
                    style={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <WatchlistButton type="car" id={product.id} title={`${product.brand} ${product.model}`} />
                  </div>
                </MDBCol>

                <MDBCol md="4" className="py-3">
                  <h5>{product.brand} {product.model}</h5>
                  <div><AccessibilityIcon /> {product.seats || 4} Seats</div>
                  <div><LuggageIcon /> {product.large_bag || 1} Large bag</div>
                  <div><WorkIcon /> {product.small_bag || 1} Small bag</div>
                  <div><DoorFrontIcon /> 4 Doors</div>
                  <div><AcUnitIcon /> {specs.includes("air") ? "Yes" : "No"}</div>
                  <div><SettingsIcon /> {specs.includes("automatic") ? "Automatic" : "Manual"}</div>
                </MDBCol>

                <MDBCol md="6" lg="3" className="border-sm-start-none border-start py-3">
                  <div className="d-flex flex-row align-items-center mb-1">
                    <h4 className="mb-1 me-1">{formatCarPrice(product.price)}</h4>
                  </div>
                  <div
                    className="d-flex flex-column mt-4"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <ActionButtons data={product} type="car" />
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

const CarsCard = ({ products = [], loading }) => {
  const navigate = useNavigate();

  const handleCardClick = (productId) => {
    navigate(`/itemdetail/${productId}?type=car`);
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
      {products.map((product) => (
        <CarCardRow key={product.id} product={product} onCardClick={handleCardClick} />
      ))}
    </MDBContainer>
  );
};

export default React.memo(CarsCard);
