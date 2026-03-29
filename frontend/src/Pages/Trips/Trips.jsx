import React, { useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import api from '../../Radux/axios';
import HeroTrip from "../../Component/Trips/HeroTrip";
import TripCard from "../../Utility/Cards/TripCard";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import ErrorMessage from '../../Component/Shared/ErrorMessage';
import EmptyState from '../../Component/Shared/EmptyState';

// Fetch ALL trips in one go for accurate client-side filtering
const fetchTrips = async () => {
    const response = await api.get("/trips", {
        params: { per_page: 1000 },
    });
    return response.data;
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

const Trips = () => {
    // Hero search state
    const [heroSearch, setHeroSearch] = useState({
        location: '',
        minPrice: '',
        maxPrice: '',
    });

    React.useEffect(() => {
        document.title = "Trips | TravelVerse";
    }, []);

    const { t } = useTranslation();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["trips"],
        queryFn: fetchTrips,
        keepPreviousData: true,
    });

    const trips = data?.data;
    const safeTrips = Array.isArray(trips)
        ? trips
        : Array.isArray(trips?.items)
            ? trips.items
            : [];

    // Keep Hero Search logic intact (location + min/max price).
    const filteredTrips = useMemo(() => {
        return safeTrips.filter(trip => {
            // Hero Search - Location filter (case-insensitive partial match)
            const locationMatch = !heroSearch.location ||
                (trip.location && trip.location.toLowerCase().includes(heroSearch.location.toLowerCase()));

            // Hero Search - Price filters
            const tripPrice = parseFloat(trip.price) || 0;
            const minPriceMatch = !heroSearch.minPrice || tripPrice >= parseFloat(heroSearch.minPrice);
            const maxPriceMatch = !heroSearch.maxPrice || tripPrice <= parseFloat(heroSearch.maxPrice);

            return locationMatch && minPriceMatch && maxPriceMatch;
        });
    }, [safeTrips, heroSearch]);

    const recommendedTrips = useMemo(() => {
        return [...filteredTrips]
            .sort((a, b) => (parseFloat(b.rate) || 0) - (parseFloat(a.rate) || 0))
            .slice(0, 8);
    }, [filteredTrips]);

    const mostChosenTrips = useMemo(() => {
        const recommendedIds = new Set(recommendedTrips.map((trip) => trip.id));
        return filteredTrips
            .filter((trip) => !recommendedIds.has(trip.id))
            .slice(0, 12);
    }, [filteredTrips, recommendedTrips]);

    // Handle hero search from HeroTrip component
    const handleHeroSearch = (searchParams) => {
        setHeroSearch(searchParams);
    };

    if (isLoading) return <LoadingSpinner size="lg" fullPage />;
    if (error) return <ErrorMessage message={error?.message ?? error.toString()} onRetry={refetch} />;

    return (
        <div>
            <HeroTrip onSearch={handleHeroSearch} />
            <h1 style={{ textAlign: "center", marginTop: "15px" }}>
                {t("travelIdeasTitle")}
            </h1>
            <h5 style={{ textAlign: "center", marginTop: "5px" }}>
                {t("travelIdeasSubtitle")}
            </h5>

            <Container className="mt-5">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4 pb-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <h5 className="mb-0 d-flex align-items-center gap-2" style={{ fontWeight: 600, color: '#333' }}>
                        <motion.span
                            key={filteredTrips.length}
                            initial={{ scale: 1.5, opacity: 0, color: "#00b4d8" }}
                            animate={{ scale: 1, opacity: 1, color: "#333" }}
                            transition={{ duration: 0.4 }}
                        >
                            {filteredTrips.length}
                        </motion.span>
                        {t("curatedTrips")}
                    </h5>
                </div>

                {filteredTrips.length > 0 ? (
                    <>
                        {/* Section 1: Recommended */}
                        <div className="mb-5">
                            <h4 className="mb-3" style={{ fontWeight: 700 }}>
                                {t('recommendedTrips')}
                            </h4>
                            <motion.div variants={containerVariants} initial="hidden" animate="visible">
                                <Row className="g-4">
                                    {recommendedTrips.map((trip) => (
                                        <Col xl={3} lg={4} md={6} xs={12} key={trip.id}>
                                            <motion.div variants={itemVariants} style={{ height: "100%" }}>
                                                <TripCard
                                                    id={trip.id}
                                                    image={trip.images}
                                                    title={trip.name}
                                                    duration={trip.duration}
                                                    price={trip.price}
                                                    description={trip.description}
                                                    rate={trip.rate}
                                                />
                                            </motion.div>
                                        </Col>
                                    ))}
                                </Row>
                            </motion.div>
                        </div>

                        {/* Section 2: Most Chosen */}
                        {mostChosenTrips.length > 0 && (
                            <div className="mb-4">
                                <h4 className="mb-3" style={{ fontWeight: 700 }}>
                                    {t('mostChosenTrips')}
                                </h4>
                                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                                    <Row className="g-4">
                                        {mostChosenTrips.map((trip) => (
                                            <Col xl={3} lg={4} md={6} xs={12} key={trip.id}>
                                                <motion.div variants={itemVariants} style={{ height: "100%" }}>
                                                    <TripCard
                                                        id={trip.id}
                                                        image={trip.images}
                                                        title={trip.name}
                                                        duration={trip.duration}
                                                        price={trip.price}
                                                        description={trip.description}
                                                        rate={trip.rate}
                                                    />
                                                </motion.div>
                                            </Col>
                                        ))}
                                    </Row>
                                </motion.div>
                            </div>
                        )}
                    </>
                ) : (
                    <Row>
                        <Col xs={12}>
                            <EmptyState title="No trips available" subtitle="Check back soon" icon="🗺️" />
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default Trips;
