import React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PoolIcon from '@mui/icons-material/Pool';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { useTranslation } from 'react-i18next';

export const CheckboxFilter = ({ title, option, onChange, selected = [] }) => {
  const { t } = useTranslation();

  const titleMap = {
    propertyTypes: 'property_types',
    amenities: 'amenities',
    hotelClass: 'hotel_class',
    style: 'hotel_style',
    Cuisine: 'cuisine',
    Features: 'features',
    Rating: 'rating',
    CarSpecifications: 'car_specifications',
    Supplier: 'supplier',
    Category_types: 'category_types',
    Product_Categories: 'product_categories',
    Traveler_rating: 'traveler_rating',
    Duration: 'duration'
  };

  const translationNamespace = titleMap[title] || title;
  const titleLabelKey = `${translationNamespace}_label`;

  const normalizeKey = (value) =>
    String(value || '')
      .trim()
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[\\/]/g, ' ')
      .replace(/[()]/g, ' ')
      .replace(/[^a-z0-9.]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .replace(/_+/g, '_');

  const formatHumanLabel = (value) => {
    const raw = String(value ?? '').trim();
    if (!raw) return '';
    if (/[^\u0000-\u007f]/.test(raw)) return raw;
    return raw
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\s+/g, ' ')
      .replace(/\b\w/g, (ch) => ch.toUpperCase());
  };

  const translateWithFallback = (keys, fallback) => {
    for (const key of keys) {
      const translated = t(key);
      if (translated && translated !== key) return translated;
    }
    return formatHumanLabel(fallback);
  };

  const handleChange = (event) => {
    onChange(title, event.target.name);
  };

  const getAmenityIcon = (item) => {
    const normalized = item.toLowerCase().replace(/\s+/g, '_');
    const iconStyle = { fontSize: 16, color: 'inherit' };

    if (normalized === 'free_parking') return <LocalParkingIcon sx={iconStyle} />;
    if (normalized === 'pool') return <PoolIcon sx={iconStyle} />;
    if (normalized === 'free_breakfast' || normalized === 'breakfast_included') return <FreeBreakfastIcon sx={iconStyle} />;
    if (normalized === 'beach') return <BeachAccessIcon sx={iconStyle} />;
    return null;
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <FormControl sx={{ m: 0, mb: 1.5, width: '100%' }} component="fieldset" variant="standard">
        <FormLabel
          component="legend"
          sx={{
            color: 'var(--color-primary-600)',
            fontSize: '1.15rem',
            fontWeight: 700,
            mb: 0.8,
          }}
        >
          {translateWithFallback([titleLabelKey], title)}
        </FormLabel>

        <FormGroup sx={{ gap: 0.25 }}>
          {option.map((item) => {
            const isChecked = selected.includes(item);
            const normalizedItem = normalizeKey(item);
            const numericKey = normalizedItem.replace(/\./g, '_');
            const itemLabel = translateWithFallback(
              [
                `${translationNamespace}.${normalizedItem}`,
                `${translationNamespace}.${numericKey}`,
                `${translationNamespace}.${numericKey}_star`,
                normalizedItem,
                numericKey,
              ],
              item
            );
            const amenityIcon = translationNamespace === 'amenities' ? getAmenityIcon(item) : null;

            return (
              <FormControlLabel
                key={item}
                sx={{
                  margin: 0,
                  borderRadius: '10px',
                  px: 0.5,
                  py: 0.15,
                  minHeight: 34,
                  alignItems: 'center',
                  '&:hover': {
                    backgroundColor: 'color-mix(in srgb, var(--bg-secondary) 85%, transparent)',
                  },
                  '& .MuiFormControlLabel-label': {
                    fontSize: '1.02rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.25,
                  },
                }}
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={handleChange}
                    name={item}
                    size="small"
                    sx={{
                      color: 'var(--text-secondary)',
                      '&.Mui-checked': { color: 'var(--accent-primary)' },
                    }}
                  />
                }
                label={
                  amenityIcon ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      {amenityIcon}
                      <span>{itemLabel}</span>
                    </span>
                  ) : itemLabel
                }
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </Box>
  );
};
