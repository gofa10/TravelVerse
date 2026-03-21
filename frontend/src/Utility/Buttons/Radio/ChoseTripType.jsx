import { Check, MapPinned, Tickets, UserLock, X } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const tripOptions = [
  {
    value: 'basic',
    title: 'tripTypeSelf',
    icons: [<MapPinned key="1" color="#524c4c" />],
    features: [true, false, false, false],
    color: 'rgba(255,0,0,0.7)',
  },
  {
    value: 'standard',
    title: 'tripTypeArranged',
    icons: [<MapPinned key="1" color="#524c4c" />, <Tickets key="2" color="#524c4c" />],
    features: [true, true, true, false],
    color: 'rgba(255,165,0,0.7)',
  },
  {
    value: 'premium',
    title: 'tripTypePrivateGuide',
    icons: [<MapPinned key="1" color="#524c4c" />, <Tickets key="2" color="#524c4c" />, <UserLock key="3" color="#524c4c" />],
    features: [true, true, true, true],
    color: 'rgba(0,128,0,0.7)',
  },
];

const ChoseTripType = ({ value, onChange }) => {
    const { t } = useTranslation();
  return (
    <StyledWrapper>
      <div className="wrapper flex justify-content-center ">
        {tripOptions.map((option) => (
          <div className="card w-70 bg-transparent h-full shadow-lg hover:shadow-xl transition-shadow duration-300 dark:border-gray-800!" key={option.value}>
            <input
              className="input "
              type="radio"
              name="card"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="check " />
            <label className="label">
              <div className="icon d-flex justify-content-center gap-2">
                {option.icons.map((icon, index) => (
                  <div key={index} className="icons">{icon}</div>
                ))}
              </div>
              <div className="title dark:text-white">{t(option.title)}</div>
              <div className="price">
                <p className='flex gap-3 dark:text-white/60'>{option.features[0] ? <Check color="#04ff00" /> : <X color="#ff0000" />} {t("tripPersonalized")}</p>
                <p className='flex gap-3 dark:text-white/60'>{option.features[1] ? <Check color="#04ff00" /> : <X color="#ff0000" />} {t("tripBookings")}</p>
                <p className='flex gap-3 dark:text-white/60'>{option.features[2] ? <Check color="#04ff00" /> : <X color="#ff0000" />} {t("tripSupport")}</p>
                <p className='flex gap-3 dark:text-white/60'>{option.features[3] ? <Check color="#04ff00" /> : <X color="#ff0000" />} {t("tripGuide")}</p>
              </div>
            </label>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .wrapper {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: fit-content;
    margin: auto;
    flex-wrap: wrap;
  }

  .card {
    position: relative;
    width: 280px;
    height: 370px;
    border-radius: 10px;
    transition: all 0.3s;
  }

  .card:hover {
    transform: scale(1.05);
  }

  .input {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    appearance: none;
    // border: 1px solid #e5e5e5;
    border-radius: 10px;
    z-index: 10;
  }

  .input + .check::before {
    content: "";
    position: absolute;
    top: 15px;
    right: 15px;
    width: 16px;
    height: 16px;
    border: 2px solid #d0d0d0;
    border-radius: 50%;
    background-color: #E8E8E8;
  }

  .input:checked + .check::after {
    content: '';
    position: absolute;
    top: 17px;
    right: 17px;
    width: 12px;
    height: 12px;
    background-color: blue;
    border-radius: 50%;
  }

  .label {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .label .title {
    margin: 15px 0 0 15px;
    font-weight: 900;
    font-size: 15px;
    letter-spacing: 1.5px;
  }

  .label .price {
    margin: 20px 0 0 15px;
    font-size: 14px;
    font-weight: 500;
  }

  .label .icons {
    margin-top: 20px;
    margin-right: 8px;
    text-align: center;
    background-color: #cdcccc;
    border-radius: 50%;
    padding: 10px;
  }
`;

export default ChoseTripType;
