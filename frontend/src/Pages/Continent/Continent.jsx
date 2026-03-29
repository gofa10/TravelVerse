import React from "react";
import { useParams } from "react-router-dom";
import HeroContinent from "../../Component/Continent/HeroContinent";
import { continentData } from "./continentData";
import { useTranslation } from "react-i18next";

const Continent = () => {
  const { continent } = useParams();
  const { t } = useTranslation();
  const currentContinent = continentData(t)[continent];

  return (
    <div className="continent-wrapper">
      <HeroContinent {...currentContinent} cities={currentContinent?.cities} />
    </div>
  );
};

export default Continent;
