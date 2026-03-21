import React from "react";
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRipple,
} from "mdb-react-ui-kit";
import { Rating } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import api from "../../Radux/axios";
import { toast } from "react-hot-toast";
import FavoriteButton from "../Buttons/FavoriteButton";
import ActionButtons from "../Buttons/ActionButtons";
import useTransCurrency from "../../Hooks/useTransCurrency";
import WatchlistButton from "../Buttons/WatchlistButton";
import TypeBadge from "./TypeBadge";

const detectTypeFromPath = (pathname) => {
    if (pathname.includes("/hotels")) return "hotel";
    if (pathname.includes("/trips")) return "trip";
    if (pathname.includes("/cars")) return "car";
    if (pathname.includes("/activities")) return "activity";
    if (pathname.includes("/restaurants")) return "restaurant";
    if (pathname.includes("/cruise")) return "cruise";
    return "unknown";
};

const HotelCard = ({ data, type }) => {
    const location = useLocation();
    const convertedPrice = useTransCurrency(data?.price || 0);
    const convertedOldPrice = useTransCurrency(data?.oldPrice || 0);

    if (!data) return null;

    const detectedType = type || detectTypeFromPath(location.pathname);


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

    return (
        <MDBRow className="justify-content-center mb-3">
            <MDBCol md="12" xl="10">
                <MDBCard className="shadow-0 rounded-xl! bg-transparent h-full shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <MDBCardBody style={{ padding: "0" }}>
                        <MDBRow>
                            <MDBCol md="12" lg="5" className="mb-4 mb-lg-0" style={{ position: 'relative' }}>
                                <MDBRipple
                                    rippleColor="light"
                                    rippleTag="div"
                                    className="bg-image rounded hover-zoom hover-overlay"
                                >
                                    <MDBCardImage
                                        src={getFullImageUrl(data.images)}
                                        fluid
                                        className="w-100 rounded-xl!"
                                    />
                                </MDBRipple>
                                <TypeBadge type={detectedType} />
                                <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}>
                                    <WatchlistButton type={detectedType} id={data.id} title={data.title || data.name} />
                                </div>
                            </MDBCol>

                            <MDBCol md="4" className="p-3">
                                <h5 className="dark:text-white!">
                                    {data.title || data.name}
                                </h5>
                                <div className="d-flex align-items-center mb-2">
                                    <Rating
                                        name={`rating-${data.id}`}
                                        defaultValue={data.rating ?? data.rate ?? 0}
                                        precision={0.5}
                                        readOnly
                                    />
                                    <span className="ms-2 dark:text-white/50!">
                                        {data.reviews_count || 0} reviews
                                    </span>
                                </div>
                                <p className="dark:text-white/50!">
                                    {data.description?.slice(0, 100)}...
                                </p>
                            </MDBCol>

                            <MDBCol
                                md="6"
                                lg="3"
                                className="border-sm-start-none border-start d-flex flex-column justify-content-center"
                            >
                                <div className="d-flex align-items-center mb-1">
                                    <h4 className="mb-1 me-1 dark:text-white/80!">
                                        {convertedPrice}
                                    </h4>
                                    {data.oldPrice && (
                                        <span className="text-danger">
                                            <s>{convertedOldPrice}</s>
                                        </span>
                                    )}
                                </div>
                                <div className="d-flex flex-column mt-4">
                                    <ActionButtons
                                        data={data}
                                        type={detectedType}
                                    />
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    );
};

export default HotelCard;
