import React from 'react';
import styled from 'styled-components';
import { FaUser, FaUsers, FaCar } from 'react-icons/fa'; // يمكنك تغييرها حسب ما تريد
import { useTranslation } from 'react-i18next';

const StyledWrapper = styled.div`
  .radio-tile-group {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .input-container {
    position: relative;
  }

  .radio-button {
    display: none;
  }

  .radio-tile {
    padding: 1.2rem 1.5rem;
    border: 2px solid #ccc;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 120px;
    background-color: white;
  }

  .radio-button:checked + .radio-tile {
    border-color: #007bff;
    background-color: #e6f0ff;
  }

  .icon {
    font-size: 24px;
    margin-bottom: 0.5rem;
  }

  .radio-tile-label {
    display: block;
    font-weight: bold;
    font-size: 1rem;
  }
`;

const options = [
  { id: 'walk', label: 'companionSolo', icon: <FaUser /> },
  { id: 'bike', label: 'companionCouple', icon: <FaUsers /> },
  { id: 'drive', label: 'companionFamily', icon: <FaCar /> }
];

const ChosePartener = ({ value, onChange }) => {
    const { t } = useTranslation();
  return (
    <StyledWrapper>
      <div className="radio-tile-group">
        {options.map((opt) => (
          <label key={opt.id} className="input-container">
            <input
              id={opt.id}
              className="radio-button"
              type="radio"
              name="partner"
              checked={value === opt.label}
              onChange={() => onChange(opt.label)}
            />
            <div className="radio-tile flex flex-col items-center">
              <div className="icon ">{opt.icon}</div>
              <div className="radio-tile-label">{t(opt.label)}</div>
            </div>
          </label>
        ))}
      </div>
    </StyledWrapper>
  );
};

export default ChosePartener;
