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
    font-size: var(--font-size-5xl);
    color: var(--color-accent-gold) !important;
    margin-bottom: var(--space-2);
  }

  .e-card,
  .e-card.playing {
    margin: var(--space-2) 0;
    background: var(--color-surface-light) !important;
    box-shadow: var(--shadow-card-floating);
    position: relative;
    width: 400px;
    height: 200px;
    border-radius: var(--radius-card);
    overflow: hidden;
    border: var(--border-card-floating);
  }

  .e-card:hover {
    transform: scale(1.05);
    transition: transform var(--transition-base);
  }

  .wave {
    display: none;
  }

  .infotop {
    text-align: center;
    font-size: var(--font-size-xl);
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-primary) !important;
    font-weight: 700;
  }

  .name {
    font-size: var(--font-size-sm);
    font-weight: 500;
    margin-top: var(--space-2);
    color: var(--color-text-secondary);
    text-transform: lowercase;
  }

  .wave:nth-child(2),
  .wave:nth-child(3) {
    top: 0;
  }

  .playing .wave {
    animation: none;
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
