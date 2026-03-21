import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

function valuetext(value) {
  return `${value}$`;
}

export default function RangeSlider({ min = 0, max = 1000, initialValue = [200, 700], onChange }) {
  const [value, setValue] = React.useState(initialValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onChange) onChange(newValue); // ✅ إرسال القيم الجديدة للأب
  };

  return (
    <Box sx={{ width: 300, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Price Range: {value[0]}$ - {value[1]}$
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        getAriaLabel={() => 'Price range'}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        sx={{
          color: 'primary.main',
          '& .MuiSlider-thumb': {
            backgroundColor: '#1976d2',
          },
          '& .MuiSlider-track': {
            backgroundColor: '#1976d2',
          },
          '& .MuiSlider-rail': {
            opacity: 0.3,
          },
        }}
      />
    </Box>
  );
};

