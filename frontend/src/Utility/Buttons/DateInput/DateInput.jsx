import React from 'react';
import styled from 'styled-components';

const DateInput = ({ label, value, onChange }) => {
  return (
    <StyledWrapper>
      <label htmlFor="date-input">{label}</label>
      <br />
      <input
        className="input"
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input {
    border: 2px solid transparent;
    width: 15em;
    height: 2.5em;
    padding-left: 0.8em;
    outline: none;
    overflow: hidden;
    background-color: #f3f3f3;
    border-radius: 10px;
    transition: all 0.5s;
  }

  .input:hover,
  .input:focus {
    border: 2px solid #4a9dec;
    box-shadow: 0px 0px 0px 7px rgb(74, 157, 236, 20%);
    background-color: white;
  }
`;

export default DateInput;
