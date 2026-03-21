import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const FeaturedCard = ({ title, Icon }) => {
  const { t } = useTranslation();

  return (
    <StyledWrapper>
      <div className="e-card playing">
        <div className="image" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="infotop">
          {Icon && <Icon className="big-icon" />}
          <br />
          {t(title)}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .big-icon {
    font-size: 60px;
    color: #fff;
    margin-bottom: 10px;
  }
  .e-card {
    margin: 10px 0;
    background: transparent;
    box-shadow: 0px 8px 28px -9px rgba(0, 0, 0, 0.45);
    position: relative;
    width: 400px;
    height: 200px;
    border-radius: 16px;
    overflow: hidden;
  }
  .e-card:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }

  .wave {
    position: absolute;
    width: 540px;
    height: 700px;
    opacity: 0.6;
    left: 0;
    top: 0;
    margin-left: -50%;
    margin-top: -70%;
    background: linear-gradient(744deg, #b0b4bf, #065ad7 60%, #000000);
  }

  .infotop {
    text-align: center;
    font-size: 20px;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    font-weight: 600;
  }

  .name {
    font-size: 14px;
    font-weight: 100;
    margin-top: 10px;
    text-transform: lowercase;
  }

  .wave:nth-child(2),
  .wave:nth-child(3) {
    top: 210px;
  }

  .playing .wave {
    border-radius: 40%;
    animation: wave 3000ms infinite linear;
  }

  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default FeaturedCard;
