import React, { memo, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import cloud from "../../../Assets/videos/cloud_scene_4k.mp4";
import cloudPoster from "../../../Assets/images/watercolor-sky-with-clouds-wind-flow-background.jpg";
import style from "../../../Style/HomeStyle/HeroPlane.module.css";
import plane from "../../../Assets/images/pexels-pascalr-113017-removebg-preview.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UnifiedSearchBar from "../../Search/UnifiedSearchBar";

/* ── Main HeroPlane component ───────────────────────────────── */
const HeroPlane = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchValues, setSearchValues] = useState({
        q: '',
        category: '',
        location: '',
        min_price: '',
        max_price: '',
    });

    const handleFieldChange = (key, value) => {
        setSearchValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearch = (params) => {
        navigate(`/search${params.toString() ? `?${params.toString()}` : ''}`);
    };

    return (
        <div className={`${style.video_container}`}>
            {/* Background video — wrapped in its own clip layer */}
            <div className={style.vid_clip}>
                <video
                    className={style.vid}
                    autoPlay
                    muted
                    loop
                    playsInline
                    width="1920"
                    height="400"
                    preload="auto"
                    poster={cloudPoster}
                    aria-label="خلفية فيديو تعرض مشهد السحاب"
                    style={{ objectFit: "cover" }}
                >
                    <source src={cloud} type="video/mp4" />
                </video>
            </div>

            <div className={style.info}>
                <div className={style.container}>
                    <Row className={style.row_plane}>
                        {/* Left — hero text */}
                        <Col
                            xs={10}
                            lg="4"
                            className="content-center text-center flex flex-col justify-center"
                            style={{ gap: 'var(--space-3, 12px)' }}
                        >
                            <h4
                                style={{
                                    color: 'var(--text-inverse)',
                                    fontSize: 'var(--font-size-lg, 1.125rem)',
                                    letterSpacing: '0.03em',
                                    marginBottom: 0,
                                }}
                            >
                                {t("hero_title")}
                            </h4>
                            <h2
                                style={{
                                    color: 'var(--text-inverse)',
                                    fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                                    fontWeight: 800,
                                    letterSpacing: '-0.015em',
                                    textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                                    marginBottom: 0,
                                }}
                            >
                                {t("hero_experience")}
                            </h2>
                            <p
                                style={{
                                    color: 'color-mix(in srgb, var(--text-inverse) 88%, transparent)',
                                    fontSize: 'var(--font-size-base, 1rem)',
                                    lineHeight: 1.7,
                                    marginBottom: 0,
                                }}
                            >
                                {t("hero_discover")}
                            </p>
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
                        </Col>
                    </Row>

                    <div className={style.hero_search}>
                        <UnifiedSearchBar
                            className="mt-0"
                            values={searchValues}
                            onFieldChange={handleFieldChange}
                            onSearch={handleSearch}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(HeroPlane);
