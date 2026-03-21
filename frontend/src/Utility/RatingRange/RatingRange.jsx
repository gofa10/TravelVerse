import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { useTranslation } from 'react-i18next';

// تنسيق القيمة: 1000 => $1K, 1000000 => $1M
function formatMoney(value) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value}`;
}

export default function RatingRange({ value, onChange }) {
  const handleChange = (event, newValue) => {
    if (onChange) onChange(newValue);
  };

  const { t } = useTranslation();

  return (
    <Box sx={{ width: '100%' }}>
      <Typography id="non-linear-slider-money" gutterBottom>
        {t('budgetLabel')} {formatMoney(value)}
      </Typography>
      <Slider
        value={value}
        min={0}
        step={100}
        max={10000}
        getAriaValueText={formatMoney}
        valueLabelFormat={formatMoney}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider-money"
      />
    </Box>
  );
}

