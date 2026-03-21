import React, { useState, useEffect, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stepper, { Step } from "../../Utility/Stepper/Stepper";
import { Col, Container, Row } from "react-bootstrap";
import { FirstStep } from "../../Component/BookTrip/FirstStep";
import ChoseTripType from "../../Utility/Buttons/Radio/ChoseTripType";
import CountrySelect from "../../Utility/Buttons/CitySelect/CountrySelect";
import ChosePartener from "../../Utility/Buttons/Radio/ChosePartener";
import RatingRange from "../../Utility/RatingRange/RatingRange";
import TripResults from "../../Component/BookTrip/TripResults"; // المكون اللي هيعرض الرحلات

import image1 from "../../Assets/images/tony-lee-i_XLLP08BOc-unsplash.jpg";
import image2 from "../../Assets/images/pexels-jibarofoto-1559699.jpg";
import image3 from "../../Assets/images/pexels-stywo-1128334.jpg";
import image4 from "../../Assets/images/tecnomar-for-lamborghini-63-superyacht-motor-yacht-luxury-5026x3348-6233.jpg";
import { useTranslation } from "react-i18next";

export const BookTrip = () => {
    const [partner, setPartner] = useState("Solo");
    const [filters, setFilters] = useState({
        type: null,
        country: null,
        partner: null,
        rating: null,
    });
    // default

    const theme = createTheme({
      palette: {
        mode: "light",
      },
    });

    const handleSet = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };
    const { t } = useTranslation();
    return (
        <Stepper
            initialStep={1}
            onStepChange={(step) => console.log(step)}
            onFinalStepCompleted={() => console.log("All steps completed!")}
            backButtonText="Previous"
            nextButtonText="Next"
            finalButtonText="Finish"
            className="overflow-hidden! "
        >
            <Step>
                <Container fluid className="p-4">
                    <Row className="align-items-center g-4">
                        <Col md={6}>
                            <FirstStep image={image1} />
                        </Col>
                        <Col md={6}>
                            <h3 className="mb-5">{t("tripInterestTitle")}</h3>
                            <ChoseTripType
                                value={filters.type}
                                onChange={(val) => handleSet("type", val)}
                            />
                        </Col>
                    </Row>
                </Container>
            </Step>

            <Step>
                <Container fluid className="p-4">
                    <Row className="align-items-center g-4">
                        <Col md={6}>
                            <FirstStep image={image2} />
                        </Col>
                        <Col md={6}>
                            <h3 className="mb-5">{t("whereToGo")}</h3>
                            <ThemeProvider theme={theme}>
                            <CountrySelect
                                value={filters.country}
                                onChange={(val) => handleSet("country", val)}
                            />
                            </ThemeProvider>
                        </Col>
                    </Row>
                </Container>
            </Step>

            <Step>
                <Container fluid className="p-4">
                    <Row className="align-items-center g-4">
                        <Col md={6}>
                            <FirstStep image={image3} />
                        </Col>
                        <Col md={6}>
                            <h3 className="mb-5">{t("travelWith")}</h3>
                            <ChosePartener
                                value={filters.partner}
                                onChange={(val) => handleSet("partner", val)}
                            />
                            <p
                                style={{
                                    textAlign: "center",
                                    marginTop: "1rem",
                                }}
                            >
                                {t("selected")} <strong>{t(filters.partner)}</strong>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Step>

            <Step>
                <Container fluid className="p-4">
                    <Row className="align-items-center g-4">
                        <Col md={6}>
                            <FirstStep image={image4} />
                        </Col>
                        <Col md={6}>
                            <h3 className="mb-5">
                                {t("plannedBudget")}
                            </h3>
                            <RatingRange
                                value={filters.rating}
                                onChange={(val) => handleSet("rating", val)}
                            />
                        </Col>
                    </Row>
                </Container>
            </Step>

            <Step>
                <TripResults filters={filters} />
            </Step>
        </Stepper>
    );
};
