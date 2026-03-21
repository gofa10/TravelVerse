import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    MenuItem,
    Avatar,
    Container,
    Box,
    IconButton,
    Menu,
} from "@mui/material";
import { Menu as MenuIcon, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "../../Assets/images/Black-unscreen.gif";
import DarkModeToggle from "../Buttons/DarkBtn/DarkBtn";
import LanguageMenu from "../../Component/Navbar/LanguageMenu";
import CurrencyMenu from "../../Component/Navbar/CurrencyMenu";
import UserAvatar from "../../Component/Navbar/UserAvatar";
import WatchlistDropdown from '../../Component/Navbar/WatchlistDropdown';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import { hasValidToken } from '../authToken';

// Navigation pages
const pages = [
    { name: "trips", link: "/trips" },
];

// Destination continents
const continents = [
    { name: "africa", link: "/destination/africa" },
    { name: "asia", link: "/destination/asia" },
    { name: "europe", link: "/destination/europe" },
    { name: "north_america", link: "/destination/north-america" },
    { name: "south_america", link: "/destination/south-america" },
    { name: "middle_east", link: "/destination/middleEast" },
    { name: "america_caribbean", link: "/destination/carbine" },
];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElDestination, setAnchorElDestination] = useState(null);
    const [anchorElWatchlist, setAnchorElWatchlist] = useState(null);
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.auth);
    const isGuest = !user && !hasValidToken();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenDestinationMenu = (event) => {
        setAnchorElDestination(event.currentTarget);
    };

    const handleCloseDestinationMenu = () => {
        setAnchorElDestination(null);
    };

    const handleOpenWatchlist = (e) => setAnchorElWatchlist(e.currentTarget);
    const handleCloseWatchlist = () => setAnchorElWatchlist(null);

    return (
        <nav
            className="fixed top-0 z-50 w-full text-white"
            style={{
                background: 'var(--navbar-bg)',
                backdropFilter: 'blur(12px)',
                boxShadow: 'var(--shadow-md)',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ minHeight: '64px' }}>
                    {/* Logo - Desktop */}
                    <Avatar
                        src={logo}
                        sx={{
                            display: { xs: "none", md: "flex" },
                            width: "80px",
                            height: "auto",
                            mr: 1,
                        }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 3,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "var(--font-family)",
                            fontWeight: 700,
                            fontSize: "1.25rem",
                            letterSpacing: ".1rem",
                            color: "inherit",
                            textDecoration: "none",
                            transition: "opacity 0.2s",
                            "&:hover": { opacity: 0.9 },
                        }}
                    >
                        TRAVELVERSE
                    </Typography>

                    {/* Mobile Menu */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="open navigation menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                                "& .MuiPaper-root": {
                                    borderRadius: "var(--radius-lg)",
                                    boxShadow: "var(--shadow-lg)",
                                    mt: 1,
                                }
                            }}
                        >
                            <MenuItem onClick={handleOpenDestinationMenu}>
                                <Typography textAlign="center">
                                    {t("destination")}
                                </Typography>
                            </MenuItem>
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        <Link
                                            to={page.link}
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                        >
                                            {t(`${page.name}`)}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Desktop Navigation */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            gap: 1,
                        }}
                    >
                        <Button
                            onClick={handleOpenDestinationMenu}
                            sx={{
                                my: 2,
                                color: "white",
                                display: "block",
                                fontWeight: 500,
                                fontSize: "0.9rem",
                                textTransform: "none",
                                px: 2,
                                borderRadius: "var(--radius-md)",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                }
                            }}
                        >
                            {t("destination")}
                        </Button>
                        <Menu
                            id="menu-destination"
                            anchorEl={anchorElDestination}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElDestination)}
                            onClose={handleCloseDestinationMenu}
                            sx={{
                                "& .MuiPaper-root": {
                                    borderRadius: "var(--radius-lg)",
                                    boxShadow: "var(--shadow-lg)",
                                    mt: 1,
                                    minWidth: "180px",
                                }
                            }}
                        >
                            {continents.map((continent) => (
                                <MenuItem
                                    key={continent.name}
                                    onClick={handleCloseDestinationMenu}
                                    component={Link}
                                    to={continent.link}
                                    sx={{
                                        py: 1.5,
                                        px: 2.5,
                                        "&:hover": {
                                            backgroundColor: "var(--color-primary-50)",
                                        }
                                    }}
                                >
                                    {t(`${continent.name}`)}
                                </MenuItem>
                            ))}
                        </Menu>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: "white",
                                    display: "block",
                                    fontWeight: 500,
                                    fontSize: "0.9rem",
                                    textTransform: "none",
                                    px: 2,
                                    borderRadius: "var(--radius-md)",
                                    "&:hover": {
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    }
                                }}
                                component={Link}
                                to={page.link}
                            >
                                {t(`${page.name}`)}
                            </Button>
                        ))}
                    </Box>

                    {/* Right Actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <DarkModeToggle />
                        <LanguageMenu />
                        {isGuest && (
                            <Button
                                component={Link}
                                to="/login"
                                sx={{
                                    my: 2,
                                    color: "white",
                                    display: "block",
                                    fontWeight: 600,
                                    fontSize: "0.9rem",
                                    textTransform: "none",
                                    px: 2,
                                    borderRadius: "var(--radius-md)",
                                    border: '1px solid rgba(255,255,255,0.35)',
                                    "&:hover": {
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                        )}
                        <IconButton
                            color="inherit"
                            onClick={handleOpenWatchlist}
                            sx={{
                                transition: "transform 0.2s",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                }
                            }}
                        >
                            <FavoriteBorder />
                        </IconButton>
                        <WatchlistDropdown anchorEl={anchorElWatchlist} open={Boolean(anchorElWatchlist)} onClose={handleCloseWatchlist} />
                        <CurrencyMenu />
                        <UserAvatar />
                    </Box>
                </Toolbar>
            </Container>
        </nav>
    );
};

export default Header;

