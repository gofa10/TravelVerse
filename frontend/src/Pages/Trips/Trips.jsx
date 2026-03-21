import React, { useMemo, useState, useEffect, useRef } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import api from '../../Radux/axios';
import HeroTrip from "../../Component/Trips/HeroTrip";
import SidebarFilter from "../../Component/Trips/SidebarFilter";
import TripCard from "../../Utility/Cards/TripCard";
import Head from "../../Component/Trips/Head";
import style from "../../Style/Trips/Trips.module.css";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

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
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        styles: [],
        budget: [0, 5000],
        duration: [1, 30],
        continents: [],
    });
    const [sortOption, setSortOption] = useState("");
    // Tracks whether we've already set the initial min/max bounds
    const hasInitialized = useRef(false);

    const { t } = useTranslation();

    const { data, isLoading } = useQuery({
        queryKey: ["trips"],
        queryFn: fetchTrips,
        keepPreviousData: true,
    });

    const trips = data?.data || [];
    const totalPages = data?.meta?.last_page || 1;

    // حساب خيارات الفلترة تلقائيًا من البيانات
    const filterOptions = useMemo(() => {
        const styles = [...new Set(trips.map((t) => t.type))];
        const continents = [...new Set(trips.map((t) => t.continent))];

        let minBudget = 0, maxBudget = 5000;
        let minDuration = 1, maxDuration = 30;

        if (trips.length > 0) {
            const prices = trips.map(t => parseFloat(t.price) || 0);
            const durations = trips.map(t => parseInt(t.duration) || 0);

            maxBudget = Math.ceil(Math.max(...prices) / 500) * 500 || 5000;
            maxDuration = Math.ceil(Math.max(...durations)) || 30;
        }

        return { styles, continents, minBudget, maxBudget, minDuration, maxDuration };
    }, [trips]);

    // Set filter bounds ONCE after the first data load — never resets user changes
    useEffect(() => {
        if (trips.length > 0 && !hasInitialized.current) {
            hasInitialized.current = true;
            setFilters(prev => ({
                ...prev,
                budget: [filterOptions.minBudget, filterOptions.maxBudget],
                duration: [filterOptions.minDuration, filterOptions.maxDuration]
            }));
        }
    }, [trips.length]); // eslint-disable-line react-hooks/exhaustive-deps

    // فلترة و فرز الرحلات على الواجهة
    const filteredTrips = useMemo(() => {
        let result = trips.filter(trip => {
            // Budget filter
            const price = parseFloat(trip.price) || 0;
            const budgetMatch = price >= filters.budget[0] && price <= filters.budget[1];

            // Duration filter
            const days = parseInt(trip.duration) || 0;
            const durationMatch = days >= filters.duration[0] && days <= filters.duration[1];

            // Continent filter — empty array means "show all"
            const continentMatch =
                filters.continents.length === 0 || filters.continents.includes(trip.continent);

            // Travel Style filter — empty array means "show all"
            const styleMatch =
                filters.styles.length === 0 || filters.styles.includes(trip.type);

            return budgetMatch && durationMatch && continentMatch && styleMatch;
        });

        if (sortOption) {
            result.sort((a, b) => {
                if (sortOption === "Budget low to high" || sortOption === t("sortBudgetLowHigh"))
                    return parseFloat(a.price) - parseFloat(b.price);
                if (sortOption === "Budget high to low" || sortOption === t("sortBudgetHighLow"))
                    return parseFloat(b.price) - parseFloat(a.price);
                if (sortOption === "Duration low to high" || sortOption === t("sortDurationLowHigh"))
                    return parseInt(a.duration) - parseInt(b.duration);
                if (sortOption === "Duration high to low" || sortOption === t("sortDurationHighLow"))
                    return parseInt(b.duration) - parseInt(a.duration);
                if (sortOption === "Recently Added")
                    return new Date(b.created_at) - new Date(a.created_at);
                return 0;
            });
        }

        return result;
    }, [trips, filters, sortOption, t]);

    return (
        <div>
            <HeroTrip />
            <h1 style={{ textAlign: "center", marginTop: "15px" }}>
                {t("travelIdeasTitle")}
            </h1>
            <h5 style={{ textAlign: "center", marginTop: "5px" }}>
                {t("travelIdeasSubtitle")}
            </h5>

            <Container className="mt-5">
                <Row>
                    {/* Sidebar Filter */}
                    <Col lg={3} md={4} className="mb-4">
                        <SidebarFilter
                            filters={filters}
                            filterOptions={filterOptions}
                            onBudgetChange={(range) =>
                                setFilters(prev => ({ ...prev, budget: range }))}
                            onDurationChange={(range) =>
                                setFilters(prev => ({ ...prev, duration: range }))}
                            onContinentsChange={(list) =>
                                setFilters(prev => ({ ...prev, continents: list }))}
                            onStylesChange={(list) =>
                                setFilters(prev => ({ ...prev, styles: list }))}
                            onClearAll={() => setFilters({
                                styles: [],
                                continents: [],
                                budget: [filterOptions.minBudget, filterOptions.maxBudget],
                                duration: [filterOptions.minDuration, filterOptions.maxDuration]
                            })}
                        />
                    </Col>

                    {/* Main Content */}
                    <Col lg={9} md={8}>
                        {/* Header bar with Count and Sort */}
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

                        {/* Cards Grid */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="row g-4 mb-4"
                        >
                            {isLoading ? (
                                Array.from({ length: 8 }).map((_, i) => (
                                    <Col lg={4} md={6} sm={12} key={i}>
                                        <TripCard loading={true} />
                                    </Col>
                                ))
                            ) : filteredTrips.length > 0 ? (
                                filteredTrips.map((trip) => (
                                    <motion.div variants={itemVariants} className="col-lg-4 col-md-6 col-sm-12" key={trip.id}>
                                        <div style={{ height: "100%" }}>
                                            <TripCard
                                                id={trip.id}
                                                image={trip.images}
                                                title={trip.name}
                                                duration={trip.duration}
                                                price={trip.price}
                                                description={trip.description}
                                                rate={trip.rate}
                                            />
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <Col xs={12}>
                                    <div
                                        style={{
                                            textAlign: "center",
                                            margin: "40px 0",
                                        }}
                                    >
                                        <h5>No trips found matching your filters.</h5>
                                    </div>
                                </Col>
                            )}
                        </motion.div>

                        {!isLoading && totalPages > 1 && (
                            <div
                                className="d-flex justify-content-center align-items-center mt-5 mb-4 gap-3"
                                style={{
                                    padding: 'var(--space-4, 16px)',
                                }}
                            >
                                <Button
                                    variant="outline-primary"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((p) => p - 1)}
                                    style={{
                                        borderRadius: 'var(--radius-md, 8px)',
                                        padding: '8px 20px',
                                        fontWeight: 500,
                                    }}
                                >
                                    {t("previous")}
                                </Button>
                                <span
                                    className="align-self-center"
                                    style={{
                                        fontSize: 'var(--font-size-sm, 0.875rem)',
                                        color: 'var(--text-secondary)',
                                        fontWeight: 500,
                                    }}
                                >
                                    {t("page")} {currentPage} {t("of")} {totalPages}
                                </span>
                                <Button
                                    variant="outline-primary"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    style={{
                                        borderRadius: 'var(--radius-md, 8px)',
                                        padding: '8px 20px',
                                        fontWeight: 500,
                                    }}
                                >
                                    {t("next")}
                                </Button>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Trips;
