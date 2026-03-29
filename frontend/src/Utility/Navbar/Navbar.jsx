import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Radux/authSlice";
import { setCurrency } from "../../Radux/Slices/currencySlice";
import { hasValidToken } from "../authToken";
import { Map } from "lucide-react";
import DarkModeToggle from "../Buttons/DarkBtn/DarkBtn";
import logo from "../../Assets/images/Black-unscreen.gif";
import WatchlistDropdown from "../../Component/Navbar/WatchlistDropdown";
import { fetchPlans, selectAllPlans } from "../../store/tripBuilderSlice";
import { continents } from "./continentsData";
import ServiceDropdown from "./ServiceDropdown";
import DestinationSearch from "../../Component/Shared/DestinationSearch";

// ─── Data ────────────────────────────────────────────────────────────────────
const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
];
const currencies = ["USD", "EGP", "RUB"];

// ─── Tiny hook for click-outside ─────────────────────────────────────────────
function useClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (e) => {
            if (!ref.current || ref.current.contains(e.target)) return;
            handler();
        };
        document.addEventListener("mousedown", listener);
        return () => document.removeEventListener("mousedown", listener);
    }, [ref, handler]);
}

// ─── Dropdown wrapper ────────────────────────────────────────────────────────
function NavDropdown({ open, children, align = "left" }) {
    return (
        <div
            className={`
                absolute z-50 top-full pt-2 min-w-[240px]
                transition-all duration-300 ease-out origin-top
                ${open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
                ${align === "right" ? "right-0" : "left-0"}
            `}
        >
            {/* Tooltip Arrow */}
            <div className={`
                absolute top-0.5 w-4 h-4 rotate-45
                z-0
                ${align === "right" ? "right-5" : "left-8"}
            `}
                style={{
                    background: "var(--navbar-dropdown-bg)",
                    borderTop: "1px solid var(--navbar-border)",
                    borderLeft: "1px solid var(--navbar-border)",
                }}
            />

            {/* Dropdown Content */}
            <div
                className="relative z-10 shadow-2xl rounded-xl py-2 overflow-hidden"
                style={{
                    background: "var(--navbar-dropdown-bg)",
                    border: "1px solid var(--navbar-border)",
                }}
            >
                {children}
            </div>
        </div>
    );
}

const HotelIcon = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14" />
        <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
    </svg>
);

const FlightIcon = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 19 20-7L2 5v6l12 1-12 1z" />
    </svg>
);

const CarIcon = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 16H9m10 0h2m-6 0h2M3 16h2m0 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0m6 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0M5 16V9a1 1 0 0 1 1-1h10l3 4v4M5 12h14" />
    </svg>
);

const CruiseIcon = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v8m0 0 3-3m-3 3-3-3M4 15h16l-1.5 3h-13zM7 18a2 2 0 1 0 4 0m6 0a2 2 0 1 0 4 0" />
    </svg>
);

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const Header = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const plans = useSelector(selectAllPlans);
    const isGuest = !user && !hasValidToken();
    const tripPlanCount = plans.reduce(
        (sum, plan) => sum + (typeof plan.items_count === "number" ? plan.items_count : plan.items?.length || 0),
        0
    );

    // Dropdown states
    const [destOpen, setDestOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [currOpen, setCurrOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const [watchOpen, setWatchOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [destSearchOpen, setDestSearchOpen] = useState(false);
    const [isMobileViewport, setIsMobileViewport] = useState(
        typeof window !== "undefined" ? window.innerWidth <= 768 : false
    );
    const [selectedCurrency, setSelectedCurrency] = useState(
        localStorage.getItem("currency") || "USD"
    );

    // Refs for click-outside
    const destRef = useRef(null);
    const langRef = useRef(null);
    const currRef = useRef(null);
    const userRef = useRef(null);
    const watchRef = useRef(null);

    useClickOutside(destRef, () => setDestOpen(false));
    useClickOutside(langRef, () => setLangOpen(false));
    useClickOutside(currRef, () => setCurrOpen(false));
    useClickOutside(userRef, () => setUserOpen(false));
    useClickOutside(watchRef, () => setWatchOpen(false));

    useEffect(() => {
        const handleResize = () => setIsMobileViewport(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (destOpen) {
            setDestSearchOpen(false);
        }
    }, [destOpen]);

    useEffect(() => {
        if (!isGuest && user?.user_type === 'user' && !plans.length) {
            dispatch(fetchPlans());
        }
    }, [dispatch, isGuest, user?.user_type, plans.length]);

    const handleLogout = () => {
        dispatch(logout());
        setUserOpen(false);
        navigate("/");
    };

    const handleCurrency = (c) => {
        dispatch(setCurrency(c));
        localStorage.setItem("currency", c);
        setSelectedCurrency(c);
        setCurrOpen(false);
    };

    // Active check: "destination" is active on /destination/* routes
    const destActive = location.pathname.startsWith("/destination") || location.pathname.startsWith("/city/");
    const tripsActive = location.pathname.startsWith("/trips");

    const handleDestinationSelect = (destination) => {
        if (!destination?.route) return;
        navigate(destination.route);
        setDestSearchOpen(false);
        setDestOpen(false);
    };

    return (
        <nav
            className="travelverse-navbar fixed top-0 left-0 right-0 z-[9999] h-16"
            style={{
                background: "var(--navbar-bg)",
                borderBottom: "1px solid var(--navbar-border)",
                backdropFilter: "blur(8px)",
            }}
        >
            <div className="flex items-center justify-between h-full px-6 max-w-screen-2xl mx-auto">

                {/* ── LEFT: Logo + Brand + Nav Links ───────────────────── */}
                <div className="flex items-center gap-1">

                    {/* Logo & Brand Name */}
                    <a href="/" className="flex items-center gap-2 mr-4 no-underline">
                        <img
                            src={logo}
                            alt="TravelVerse Logo"
                            className="w-9 h-9 rounded-full object-cover"
                        />
                        <span
                            style={{
                                fontFamily: "var(--font-family)",
                                fontWeight: 700,
                                fontSize: "1.1rem",
                                letterSpacing: "0.08rem",
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            TRAVELVERSE
                        </span>
                    </a>

                    {/* Destination */}
                    <div ref={destRef} className="relative">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (isMobileViewport) {
                                    setDestOpen(v => !v);
                                    return;
                                }
                                setDestOpen(false);
                                setDestSearchOpen(v => !v);
                            }}
                            className={`
                                relative flex items-center gap-1.5 px-4 h-16 text-sm font-semibold
                                transition-colors duration-150 select-none cursor-pointer
                                ${destActive ? "text-white" : "text-white opacity-90 hover:opacity-100"}
                            `}
                        >
                            {/* location pin icon */}
                            <svg className="w-4 h-4 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            {t("destination")}
                            <svg className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${(destOpen || destSearchOpen) ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                            {/* active underline */}
                            {destActive && (
                                <span className="travelverse-navbar-accent absolute bottom-0 left-4 right-4 h-0.5 rounded-full" />
                            )}
                        </button>

                        {!isMobileViewport && destSearchOpen ? (
                            <div onClick={(e) => e.stopPropagation()}>
                                <DestinationSearch
                                    onSelect={handleDestinationSelect}
                                    onClose={() => setDestSearchOpen(false)}
                                    onBrowseRegion={() => {
                                        setDestSearchOpen(false);
                                        setDestOpen(true);
                                    }}
                                />
                            </div>
                        ) : null}

                        <NavDropdown open={destOpen}>
                            <div className="flex flex-col">
                                {continents.map((c) => (
                                    <Link
                                        key={c.name}
                                        to={c.link}
                                        onClick={() => setDestOpen(false)}
                                        className="travelverse-navbar-menu relative flex items-center px-6 py-3 font-medium text-[15px] transition-all duration-200 group"
                                    >
                                        <span className="travelverse-navbar-accent absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 rounded-r-full transition-all duration-200 group-hover:h-3/4"></span>
                                        {t(c.name)}
                                    </Link>
                                ))}
                            </div>
                        </NavDropdown>
                    </div>

                    {/* Trips */}
                    <Link
                        to="/trips"
                        className={`
                            relative flex items-center gap-1.5 px-4 h-16 text-sm font-semibold
                            transition-colors duration-150 select-none
                            ${tripsActive ? "text-white" : "text-white opacity-90 hover:opacity-100"}
                        `}
                    >
                        {/* suitcase icon */}
                        <svg className="w-4 h-4 shrink-0 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                            <line x1="12" y1="12" x2="12" y2="16" />
                            <line x1="10" y1="14" x2="14" y2="14" />
                        </svg>
                        {t("trips")}
                        {tripsActive && (
                            <span className="travelverse-navbar-accent absolute bottom-0 left-4 right-4 h-0.5 rounded-full" />
                        )}
                    </Link>

                    <ServiceDropdown service="hotels" label="hotels" icon={HotelIcon} />
                    <ServiceDropdown service="flights" label="flights" icon={FlightIcon} />
                    <ServiceDropdown service="cars" label="cars" icon={CarIcon} />
                    <ServiceDropdown service="cruises" label="cruises" icon={CruiseIcon} />
                </div>

                {/* ── RIGHT: Action icons ──────────────────────────────── */}
                <div className="flex items-center gap-1">

                    {/* Dark Mode Toggle */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white/90">
                        <DarkModeToggle />
                    </div>

                    {/* Language */}
                    <div ref={langRef} className="relative">
                        <button
                            onClick={() => setLangOpen(v => !v)}
                            title="Language"
                            aria-label="Switch language"
                            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors text-white opacity-90 hover:opacity-100"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </button>
                        <NavDropdown open={langOpen} align="right">
                            <div className="flex flex-col">
                                {languages.map(({ code, label, flag }) => {
                                    const active = i18n.language === code;
                                    return (
                                        <button
                                            key={code}
                                            onClick={() => { i18n.changeLanguage(code); setLangOpen(false); }}
                                            className={`travelverse-navbar-menu relative flex items-center w-full gap-3 px-6 py-3 font-medium text-[15px] transition-all duration-200 group ${active ? "travelverse-navbar-menu-active" : ""}`}
                                        >
                                            <span className={`travelverse-navbar-accent absolute left-0 top-1/2 -translate-y-1/2 w-1 transition-all duration-200 rounded-r-full ${active ? "h-3/4" : "h-0 group-hover:h-3/4"}`}></span>
                                            <span className="text-lg">{flag}</span>
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </NavDropdown>
                    </div>

                    {/* Favorites / Watchlist */}
                    <div ref={watchRef} className="relative">
                        <button
                            onClick={() => setWatchOpen(v => !v)}
                            title="Favorites"
                            aria-label="Open favorites"
                            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors text-white opacity-90 hover:opacity-100"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>
                        {/* Re-use existing WatchlistDropdown logic */}
                        <div
                            className={`
                                absolute right-0 z-50 mt-2
                                transition-all duration-200
                                ${watchOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
                            `}
                            style={{ top: "calc(100% + 8px)" }}
                        >
                            <WatchlistDropdown
                                anchorEl={watchOpen ? watchRef.current : null}
                                open={watchOpen}
                                onClose={() => setWatchOpen(false)}
                            />
                        </div>
                    </div>

                    {!isGuest && user?.user_type === 'user' && (
                        <Link
                            to="/user/trip-builder"
                            title="My Trip Plans"
                            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors text-white opacity-90 hover:opacity-100"
                        >
                            <Map className="w-5 h-5" />
                            {tripPlanCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center leading-none shadow-lg">
                                    {tripPlanCount}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Currency */}
                    <div ref={currRef} className="relative">
                        <button
                            onClick={() => setCurrOpen(v => !v)}
                            title={`Currency: ${selectedCurrency}`}
                            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors text-white opacity-90 hover:opacity-100"
                        >
                            <span className="text-sm font-bold bg-white/15 rounded-full w-7 h-7 flex items-center justify-center leading-none">
                                {selectedCurrency === "USD" ? "$" : selectedCurrency === "EGP" ? "E" : "₽"}
                            </span>
                        </button>
                        <NavDropdown open={currOpen} align="right">
                            <div className="flex flex-col">
                                {currencies.map((c) => {
                                    const active = selectedCurrency === c;
                                    return (
                                        <button
                                            key={c}
                                            onClick={() => handleCurrency(c)}
                                            className={`travelverse-navbar-menu relative flex items-center w-full gap-3 px-6 py-3 font-medium text-[15px] transition-all duration-200 group ${active ? "travelverse-navbar-menu-active" : ""}`}
                                        >
                                            <span className={`travelverse-navbar-accent absolute left-0 top-1/2 -translate-y-1/2 w-1 transition-all duration-200 rounded-r-full ${active ? "h-3/4" : "h-0 group-hover:h-3/4"}`}></span>
                                            {c}
                                        </button>
                                    );
                                })}
                            </div>
                        </NavDropdown>
                    </div>

                    {/* User Avatar + dropdown */}
                    <div ref={userRef} className="relative ml-1">
                        <button
                            onClick={() => setUserOpen(v => !v)}
                            className="flex items-center gap-1.5 pl-1 pr-2 h-10 rounded-full hover:bg-white/10 transition-colors text-white opacity-90 hover:opacity-100"
                        >
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white/20"
                                style={{ background: "var(--accent-primary)" }}
                            >
                                {user?.name?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                            <svg className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${userOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>

                        <NavDropdown open={userOpen} align="right">
                            <div className="flex flex-col min-w-[200px]">
                                {user && (
                                    <Link
                                        to={user.user_type === "admin" ? "/admin" : user.user_type === "tour_guide" ? "/guide" : "/user"}
                                        onClick={() => setUserOpen(false)}
                                        className="travelverse-navbar-menu relative flex items-center w-full px-6 py-3 font-medium text-[15px] transition-all duration-200 group"
                                    >
                                        <span className="travelverse-navbar-accent absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 rounded-r-full transition-all duration-200 group-hover:h-3/4"></span>
                                        {t('dashboard')}
                                    </Link>
                                )}
                                {user && user.user_type === "user" && (
                                    <Link
                                        to="/user/reservations"
                                        onClick={() => setUserOpen(false)}
                                        className="travelverse-navbar-menu relative flex items-center w-full px-6 py-3 font-medium text-[15px] transition-all duration-200 group"
                                    >
                                        <span className="travelverse-navbar-accent absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 rounded-r-full transition-all duration-200 group-hover:h-3/4"></span>
                                        {t('my_reservations')}
                                    </Link>
                                )}
                                {user && <div className="my-2 border-t border-white/10" />}
                                {isGuest ? (
                                    <Link
                                        to="/login"
                                        onClick={() => setUserOpen(false)}
                                        className="travelverse-navbar-menu relative flex items-center w-full px-6 py-3 font-medium text-[15px] transition-all duration-200 group"
                                    >
                                        <span className="travelverse-navbar-accent absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 rounded-r-full transition-all duration-200 group-hover:h-3/4"></span>
                                        {t('sign_in')}
                                    </Link>
                                ) : (
                                    <button
                                        onClick={handleLogout}
                                        className="relative flex items-center w-full text-left px-6 py-3 font-medium text-[15px] text-red-400 transition-all duration-200 hover:text-red-300 hover:bg-red-500/10 group"
                                    >
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-red-400 rounded-r-full transition-all duration-200 group-hover:h-3/4"></span>
                                        {t('logout_label')}
                                    </button>
                                )}
                            </div>
                        </NavDropdown>
                    </div>
                </div>

                {/* ── Mobile hamburger (sm only) ───────────────────────── */}
                <button
                    className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 text-white/90"
                    onClick={() => setMobileOpen(v => !v)}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {mobileOpen
                            ? <path d="M18 6L6 18M6 6l12 12" />
                            : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
                        }
                    </svg>
                </button>
            </div>

            {/* ── Mobile menu panel ───────────────────────────────────── */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-96" : "max-h-0"}`}
                style={{ background: "var(--navbar-dropdown-bg)", borderTop: "1px solid var(--navbar-border)" }}
            >
                <div className="px-4 py-3 flex flex-col gap-1">
                    <button
                        onClick={() => { setDestOpen(v => !v); }}
                        className="travelverse-navbar-mobile-link flex items-center justify-between w-full px-3 py-2.5 text-sm opacity-90 hover:opacity-100 rounded-lg"
                    >
                        {t("destination")}
                        <svg className={`w-4 h-4 transition-transform ${destOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>

                    {destOpen && (
                        <div className="ml-4 flex flex-col gap-1 border-l border-white/10 pl-3">
                            {continents.map(c => (
                                <Link
                                    key={c.name}
                                    to={c.link}
                                    onClick={() => { setMobileOpen(false); setDestOpen(false); }}
                                    className="travelverse-navbar-mobile-link block py-2 text-sm transition-colors"
                                >
                                    {t(c.name)}
                                </Link>
                            ))}
                        </div>
                    )}

                    <Link
                        to="/trips"
                        onClick={() => setMobileOpen(false)}
                        className="travelverse-navbar-mobile-link flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg"
                    >
                        {t("trips")}
                    </Link>

                    <ServiceDropdown
                        service="hotels"
                        label="hotels"
                        icon={HotelIcon}
                        mobile
                        onNavigate={() => setMobileOpen(false)}
                    />
                    <ServiceDropdown
                        service="flights"
                        label="flights"
                        icon={FlightIcon}
                        mobile
                        onNavigate={() => setMobileOpen(false)}
                    />
                    <ServiceDropdown
                        service="cars"
                        label="cars"
                        icon={CarIcon}
                        mobile
                        onNavigate={() => setMobileOpen(false)}
                    />
                    <ServiceDropdown
                        service="cruises"
                        label="cruises"
                        icon={CruiseIcon}
                        mobile
                        onNavigate={() => setMobileOpen(false)}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Header;
