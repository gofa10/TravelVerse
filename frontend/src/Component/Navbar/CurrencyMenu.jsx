import React, { useState } from 'react';
import { Typography, MenuItem, Tooltip, Box, IconButton, Menu } from '@mui/material';
import { AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setCurrency } from '../../Radux/Slices/currencySlice';

const currencies = ['USD', 'EGP', 'RUB'];

const CurrencyMenu = () => {
  const [currencyMenuAnchor, setCurrencyMenuAnchor] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const dispatch = useDispatch()
  const changeCurrency = (currency) => {
  dispatch(setCurrency(currency));
  localStorage.setItem("currency", currency);
  setCurrencyMenuAnchor(null);
};


  const openMenu = (setter) => (event) => setter(event.currentTarget);
  const closeMenu = (setter) => () => setter(null);

  return (
    <div>
      <Box sx={{ flexGrow: 0, mr: 1 }}>
        <Tooltip title={`Current Currency: ${selectedCurrency}`}>
          <IconButton
            color="inherit"
            onClick={openMenu(setCurrencyMenuAnchor)}
            aria-label="choose currency"
            aria-controls="currency-menu"
            aria-haspopup="true"
          >
            <AttachMoneyIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="currency-menu"
          anchorEl={currencyMenuAnchor}
          open={Boolean(currencyMenuAnchor)}
          onClose={closeMenu(setCurrencyMenuAnchor)}
        >
          {currencies.map((currency) => (
            <MenuItem
              key={currency}
              onClick={() => changeCurrency(currency)}
              selected={currency === selectedCurrency}
              aria-selected={currency === selectedCurrency}
            >
              <Typography textAlign="center">{currency}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </div>
  );
};

export default CurrencyMenu;
