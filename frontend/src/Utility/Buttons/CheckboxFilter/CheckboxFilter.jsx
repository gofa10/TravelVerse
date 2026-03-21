import React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';

export const CheckboxFilter = ({ title, option, onChange, selected = [] }) => {
  const { t } = useTranslation();

  const titleMap = {
    propertyTypes: 'property_types',
    amenities: 'amenities',
    hotelClass: 'hotel_class',
    style: 'hotel_style'
  };

  const translationNamespace = titleMap[title] || title;
  const titleLabelKey = `${translationNamespace}_label`;

  const handleChange = (event) => {
    onChange(title, event.target.name);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
        <FormLabel component="legend" style={{ color: '#007bff' }}>
          {t(titleLabelKey)}
        </FormLabel>

        <FormGroup>
          {option.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={selected.includes(item)}
                  onChange={handleChange}
                  name={item}
                />
              }
              label={t(`${translationNamespace}.${item}`)}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};
