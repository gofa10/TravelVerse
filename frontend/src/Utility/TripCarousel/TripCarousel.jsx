// TripCarousel.jsx
import React, { memo, useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useQuery } from "@tanstack/react-query";
import api from '../../Radux/axios';
import { useNavigate } from "react-router-dom"; // ✅ إضافة useNavigate
import { useTranslation } from "react-i18next";
import useTransCurrency from "../../Hooks/useTransCurrency";

const fetchHotels = async () => {
    const res = await api.get("/hotels");
    return res.data;
};

const TripCarousel = () => {
    const { t } = useTranslation();

    const { data: hotelsData, isLoading } = useQuery({
        queryKey: ["hotels"],
        queryFn: fetchHotels,
        staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });

    const hotelList = hotelsData?.data || [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate(); // ✅

    const getFullImageUrl = (img) => {
        if (!img) return "/fallback.svg";

        if (Array.isArray(img)) {
            if (img.length === 0) return "/fallback.svg";
            img = img[0];
        }

        if (typeof img === "object" && img.url) {
            img = img.url;
        }

        if (typeof img !== "string") return "/fallback.svg";

        if (img.startsWith("http") || img.startsWith("data:")) return img;

        return `${import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8000'}${img.startsWith("/") ? "" : "/"}${img}`;
    };

    const currentImage = getFullImageUrl(hotelList[currentIndex]?.images);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % hotelList.length);
    };

    const handlePrevious = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + hotelList.length) % hotelList.length,
        );
    };

    const springProps = useSpring({
        opacity: 1,
        transform: "scale(1)",
        from: { opacity: 0, transform: "scale(0.8)" },
        config: { tension: 200, friction: 20 },
    });

    const displayedHotels =
        hotelList.length > 0
            ? hotelList.slice(currentIndex, currentIndex + 4).length < 4
                ? [
                      ...hotelList.slice(currentIndex),
                      ...hotelList.slice(
                          0,
                          4 - (hotelList.length - currentIndex),
                      ),
                  ]
                : hotelList.slice(currentIndex, currentIndex + 8)
            : [];

    return (
        <CarouselWrapper>
            <Background $backgroundImage={currentImage}>
                <Details className="text-left bg-black/40 p-4 rounded-lg max-w-md">
                    <h3>{hotelList[currentIndex]?.location || "..."}</h3>
                    <h1>{hotelList[currentIndex]?.title || hotelList[currentIndex]?.name || "..."}</h1>
                    <p>
                        {hotelList[currentIndex]?.rating || "5 Stars"} ·
                        Luxury Hotel
                    </p>
                    <Price>
                        From{" "}
                        <span className="old-price">
                            {useTransCurrency(3299)}
                        </span>{" "}
                        <span className="new-price text-yellow-300! font-bold">
                            {useTransCurrency(
                                hotelList[currentIndex]?.price ?? 2591,
                            )}
                        </span>
                    </Price>
                </Details>
            </Background>

            <ButtonWrapper>
                <button onClick={handlePrevious} className="prev">
                    <ArrowBackIcon />
                </button>
                <button onClick={handleNext} className="next">
                    <ArrowForwardIcon />
                </button>
            </ButtonWrapper>

            <Carousel>
                {(isLoading || hotelList.length === 0
                    ? Array.from({ length: 4 })
                    : displayedHotels
                ).map((hotel, index) => (
                    <animated.div style={springProps} key={index}>
                        <Card>
                            {isLoading || !hotel ? (
                                <Placeholder />
                            ) : (
                                <>
                                    <div className="relative group  h-37.5">
                                        <img
                                            src={getFullImageUrl(hotel.images)}
                                            alt={hotel.title || hotel.name}
                                            style={{
                                                width: "100px",
                                                height: "150px",
                                                borderRadius: "10px",
                                                objectFit: "cover",
                                            }}
                                        />

                                        <button
                                            className="
                                                    absolute inset-0
                                                    hidden group-hover:flex
                                                    items-center justify-center
                                                    bg-black/50
                                                    text-white
                                                    rounded-[10px]
                                                    transition
                                                    "
                                            onClick={() =>
                                                navigate(
                                                    `/itemdetail/${hotel.id}?type=hotel`,
                                                )
                                            }
                                        >
                                            {t("view_details")}
                                        </button>
                                    </div>
                                </>
                            )}
                        </Card>
                    </animated.div>
                ))}
            </Carousel>
        </CarouselWrapper>
    );
};

export default memo(TripCarousel);

// -------- Styled Components --------

const CarouselWrapper = styled.div`
    position: relative;
`;

const Background = styled.div`
    background: url(${(props) => props.$backgroundImage}) no-repeat center
        center/cover;
    height: 100vh;
    position: relative;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
    border-radius: 15px;
`;

const Details = styled.div`
    position: absolute;
    bottom: 30%;
    left: 5%;
    max-width: 500px;

    h3 {
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 10px;
    }

    h1 {
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    p {
        font-size: 16px;
        margin-bottom: 20px;
    }
`;

const Price = styled.div`
    font-size: 18px;

    .old-price {
        text-decoration: line-through;
        margin-right: 10px;
        color: #ddd;
    }

    .new-price {
        color: #f00;
        font-weight: bold;
    }
`;

const Carousel = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 20px;
    overflow-x: hidden;
    padding: 10px;
    width: fit-content;
    position: absolute;
    right: 0;
    bottom: 0;
`;

const Card = styled.div`
    min-width: 100px;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
    cursor: pointer;
    transition: transform 0.2s;
    text-align: center;

    &:hover {
        transform: scale(1.05);
    }

    .view-btn {
        margin-top: 8px;
        padding: 6px 12px;
        background-color: #007bff;
        border: none;
        color: white;
        font-size: 12px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .view-btn:hover {
        background-color: #0056b3;
    }
`;

const Placeholder = styled.div`
    width: 100px;
    height: 150px;
    border-radius: 10px;
    background: linear-gradient(90deg, #ccc, #eee, #ccc);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;

    @keyframes shimmer {
        0% {
            background-position: -200% 0;
        }
        100% {
            background-position: 200% 0;
        }
    }
`;

const ButtonWrapper = styled.div`
    position: absolute;
    top: 75%;
    left: 10px;
    right: 10px;
    display: flex;
    justify-content: start;
    width: 99%;
    transform: translateY(-50%);

    .prev,
    .next {
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        border: none;
        padding: 10px;
        cursor: pointer;
        font-size: 18px;
        border-radius: 5px;
    }

    .prev {
        margin-left: 20px;
    }

    .next {
        margin-right: 20px;
    }
`;
