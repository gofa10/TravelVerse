import React, { useState } from 'react'
import { Typography, MenuItem, Tooltip, Box, IconButton, Menu } from '@mui/material';
import { Menu as MenuIcon, Translate as TranslateIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const languages = [
    { code: 'en', title: 'English' },
    { code: 'ar', title: 'العربية' },
    { code: 'ru', title: 'Русский' },
  ];
const LanguageMenu = () => {
      const [langMenuAnchor, setLangMenuAnchor] = useState(null);
         const { i18n } = useTranslation();

          const changeLanguage = (lang) => {
            i18n.changeLanguage(lang);
            setLangMenuAnchor(null);
          };
          const openMenu = (setter) => (event) => setter(event.currentTarget);
          const closeMenu = (setter) => () => setter(null);
  return (
    <div>
      <Box sx={{ flexGrow: 0, mr: 1 }}>
            <Tooltip title="Choose Language">
              <IconButton color="inherit" onClick={openMenu(setLangMenuAnchor)}>
                <TranslateIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={langMenuAnchor}
              open={Boolean(langMenuAnchor)}
              onClose={closeMenu(setLangMenuAnchor)}
            >
              {languages.map(({ code, title }) => (
                <MenuItem key={code} onClick={() => changeLanguage(code)}>
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
    </div>
  )
}

export default LanguageMenu
