import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import cloud from "../../../Assets/videos/cloud_scene_4k.mp4";
import cloudPoster from "../../../Assets/images/watercolor-sky-with-clouds-wind-flow-background.jpg";
import style from "../../../Style/HomeStyle/HeroPlane.module.css";
import plane from "../../../Assets/images/pexels-pascalr-113017-removebg-preview.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Search, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from '../../../Radux/axios';

/* ── type config ────────────────────────────────────────────── */
const TYPE_CFG = {
    trip: { color: "bg-blue-100 text-blue-700", icon: "🗺️" },
    hotel: { color: "bg-purple-100 text-purple-700", icon: "🏨" },
    restaurant: { color: "bg-orange-100 text-orange-700", icon: "🍽️" },
    activity: { color: "bg-green-100 text-green-700", icon: "🎯" },
    flight: { color: "bg-sky-100 text-sky-700", icon: "✈️" },
};

/* ── skeleton row ───────────────────────────────────────────── */
const SkeletonRow = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px" }}>
        <div className="skeleton-shimmer" style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
            <div className="skeleton-shimmer" style={{ height: 13, borderRadius: 6, marginBottom: 8, width: "60%" }} />
            <div className="skeleton-shimmer" style={{ height: 10, borderRadius: 6, width: "38%" }} />
        </div>
        <div className="skeleton-shimmer" style={{ width: 58, height: 20, borderRadius: 999 }} />
    </div>
);

/* ── HeroSearch embedded component ─────────────────────────── */
const HeroSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [dropPos, setDropPos] = useState(null);

    const wrapperRef = useRef(null);
    const navigate = useNavigate();

    /* recalculate portal position whenever open state or results change */
    useEffect(() => {
        if (open && wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            setDropPos({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    }, [open, results]);

    /* click outside wrapper → close dropdown */
    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
                setResults([]);
                setQuery("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    /* Escape key */
    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    /* debounced search */
    useEffect(() => {
        if (query.trim().length < 1) {
            setResults([]);
            setSearched(false);
            setOpen(false);
            return;
        }
        const t = setTimeout(async () => {
            setLoading(true);
            setOpen(true);
            try {
                const { data } = await api.get(`/search?q=${encodeURIComponent(query.trim())}`);
                setResults(data);
                setSearched(true);
            } catch {
                setResults([]);
                setSearched(true);
            } finally {
                setLoading(false);
            }
        }, 300);
        return () => clearTimeout(t);
    }, [query]);

    const handleSelect = useCallback((item) => {
        navigate(`/itemdetail/${item.id}?type=${item.type}`);
        setOpen(false);
        setQuery("");
    }, [navigate]);

    const handleSearch = () => {
        if (query.trim()) {
            setResults([]);   // close dropdown
            setOpen(false);
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div
            ref={wrapperRef}
            style={{ width: "100%", maxWidth: 650, margin: "0 auto", marginTop: "2rem", position: "relative", zIndex: 50 }}
        >
            {/* ── Input pill ─────────────────────────────────────── */}
            <div style={{
                position: "relative",
                width: "100%",
                filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.18))",
            }}>
                {/* Left icon */}
                <Search
                    size={22}
                    color="#2563eb"
                    style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 1 }}
                />

                {/* Text input */}
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onFocus={() => { setFocused(true); if (results.length > 0) setOpen(true); }}
                    onBlur={() => setFocused(false)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Where do you want to go?"
                    style={{
                        width: "100%",
                        height: 60,
                        borderRadius: 9999,
                        background: "white",
                        border: "none",
                        outline: "none",
                        paddingLeft: 56,
                        paddingRight: 140,
                        fontSize: 16,
                        color: "#1a1a1a",
                        boxShadow: focused
                            ? "0 8px 40px rgba(37, 99, 235, 0.25)"
                            : "0 8px 32px rgba(0,0,0,0.18)",
                        transition: "box-shadow 0.2s ease",
                        fontFamily: "var(--font-family)",
                    }}
                />

                {/* Right search button */}
                <button
                    onClick={handleSearch}
                    style={{
                        position: "absolute",
                        right: 6,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: 9999,
                        height: 48,
                        padding: "0 24px",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        cursor: "pointer",
                        transition: "background 0.18s ease",
                        fontFamily: "var(--font-family)",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
                    onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                >
                    Search
                </button>
            </div>

            {/* ── Results dropdown (Portal) ──────────────────────── */}
            {open && dropPos && createPortal(
                <div
                    style={{
                        position: "absolute",
                        top: dropPos.top,
                        left: dropPos.left,
                        width: dropPos.width,
                        zIndex: 999999,
                        backgroundColor: "white",
                        borderRadius: 16,
                        boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
                        maxHeight: 420,
                        overflowY: "auto",
                        overscrollBehavior: "contain",
                        animation: "searchDropIn 180ms ease-out forwards",
                        border: "1px solid rgba(0,0,0,0.06)",
                    }}
                >
                    {/* Skeletons */}
                    {loading && (
                        <div style={{ padding: "6px 0" }}>
                            <SkeletonRow />
                            <SkeletonRow />
                            <SkeletonRow />
                        </div>
                    )}

                    {/* Results */}
                    {!loading && results.length > 0 && (
                        <>
                            <div style={{ padding: "10px 16px 4px", fontSize: "0.72rem", color: "#9ca3af", fontWeight: 500 }}>
                                Results for <strong style={{ color: "#374151" }}>"{query}"</strong>
                            </div>
                            <ul style={{ listStyle: "none", margin: 0, padding: "4px 0 0" }}>
                                {results.map((item, idx) => {
                                    const cfg = TYPE_CFG[item.type] || { color: "bg-gray-100 text-gray-600", icon: "📌" };
                                    return (
                                        <li
                                            key={`${item.type}-${item.id}`}
                                            onClick={() => handleSelect(item)}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                                padding: "12px 16px",
                                                cursor: "pointer",
                                                transition: "background 0.15s",
                                                borderBottom: idx < results.length - 1 ? "1px solid #f9fafb" : "none",
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                        >
                                            {/* Thumbnail */}
                                            <div style={{
                                                width: 44, height: 44, borderRadius: 12, overflow: "hidden",
                                                flexShrink: 0, background: "#f3f4f6",
                                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem",
                                            }}>
                                                {item.image
                                                    ? <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                    : cfg.icon}
                                            </div>

                                            {/* Text */}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {item.title}
                                                </div>
                                                {item.location && (
                                                    <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                                                        <MapPin size={11} color="#9ca3af" />
                                                        <span style={{ fontSize: "0.73rem", color: "#9ca3af", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                            {item.location}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Badge */}
                                            <span
                                                className={cfg.color}
                                                style={{ padding: "2px 10px", borderRadius: 999, fontSize: "0.69rem", fontWeight: 700, textTransform: "capitalize", whiteSpace: "nowrap", flexShrink: 0 }}
                                            >
                                                {item.type}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>

                            {/* Footer */}
                            <button
                                onClick={() => { navigate(`/search?q=${encodeURIComponent(query)}`); setOpen(false); }}
                                style={{
                                    width: "100%", padding: "11px 16px", borderTop: "1px solid #f3f4f6",
                                    background: "#fafafa", border: "none", cursor: "pointer",
                                    fontSize: "0.78rem", color: "#6366f1", fontWeight: 600, textAlign: "center",
                                    transition: "background 0.15s", display: "block", borderRadius: "0 0 16px 16px",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = "#f5f3ff"}
                                onMouseLeave={e => e.currentTarget.style.background = "#fafafa"}
                            >
                                See all results for "{query}" →
                            </button>
                        </>
                    )}

                    {/* Empty state */}
                    {!loading && searched && query.trim().length > 0 && results.length === 0 && (
                        <div style={{ padding: "32px 16px", textAlign: "center" }}>
                            <div style={{ fontSize: "2rem", marginBottom: 8 }}>🔍</div>
                            <div style={{ fontWeight: 700, color: "#374151", fontSize: "0.9rem", marginBottom: 4 }}>
                                No results for "{query}"
                            </div>
                            <div style={{ fontSize: "0.78rem", color: "#9ca3af" }}>
                                Try searching for trips, hotels, or restaurants
                            </div>
                        </div>
                    )}
                </div>,
                document.body
            )}
        </div>
    );
};

/* ── Main HeroPlane component ───────────────────────────────── */
const HeroPlane = () => {
    const { t } = useTranslation();

    return (
        <div className={`${style.video_container}`}>
            {/* Background video — wrapped in its own clip layer */}
            <div className={style.vid_clip}>
                <video
                    className={style.vid}
                    autoPlay
                    muted
                    loop
                    width="1920"
                    height="400"
                    preload="none"
                    poster={cloudPoster}
                    aria-label="خلفية فيديو تعرض مشهد السحاب"
                >
                    <source src={cloud} type="video/mp4" />
                </video>
            </div>

            <div className={style.info}>
                <div className={style.container}>
                    <Row className={style.row_plane}>
                        {/* Left — hero text */}
                        <Col xs={10} lg="4" className="text-black content-center text-center flex flex-col gap-2 justify-center">
                            <h4>{t("hero_title")}</h4>
                            <h2>{t("hero_experience")}</h2>
                            <p>{t("hero_discover")}</p>

                            {/* ── Hero Search Bar ── */}
                            <HeroSearch />
                        </Col>

                        {/* Right — plane image + info cards */}
                        <Col xs={12} lg="6">
                            <Row>
                                <LazyLoadImage
                                    src={plane}
                                    alt="صورة الطائرة"
                                    effect="blur"
                                    width="600"
                                    height="300"
                                    className={`${style.image} hidden md:block`}
                                />
                            </Row>
                            <Row className={`${style.container_text}`}>
                                <div className={`bg-white text-black dark:bg-gray-900! dark:text-white! ${style.small_text}`}>
                                    {t("feature_knowledge")}
                                </div>
                                <div className={`bg-white text-black dark:bg-gray-900! dark:text-white! ${style.big_text}`}>
                                    <h5>{t("book_now")}</h5>
                                    <p>{t("plan_trip_description")}</p>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default memo(HeroPlane);
