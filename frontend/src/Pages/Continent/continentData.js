import backgroundSouthAmerica from "../../Assets/images/pexels-jibarofoto-1559699.jpg";
import backgroundafrica from "../../Assets/images/group-elephants-big-green-tree-wilderness.jpg";
import backgroundasia from "../../Assets/images/pexels-francesco-ungaro-96932.jpg";
import backgroundnorthAmerica from "../../Assets/images/pexels-kaip-597909.jpg";
import backgroundeurope from "../../Assets/images/pexels-chaitaastic-1796715.jpg";
import backgroundmiddleEast from "../../Assets/images/pexels-yasirgurbuz-11659955.jpg";
import backgroundcarbine from "../../Assets/images/pexels-pixabay-237272.jpg";

// South America
import southamerica1 from "../../Assets/images/pexels-akcreativespace-90597.png";
import southamerica2 from "../../Assets/images/pexels-danstreetmx-1727799.png";
import southamerica3 from "../../Assets/images/pexels-rpnickson-2631613.png";
import southamerica4 from "../../Assets/images/pexels-bhargava-marripati-674798-3591074.png";
import southamerica5 from "../../Assets/images/pexels-monica-1118877.png";
import southamerica6 from "../../Assets/images/pexels-victorino-2771080.png";

// Africa
import africa1 from "../../Assets/images/medium-shot-african-man-outdoors.png";
import africa2 from "../../Assets/images/group-zebras-grazing-tsavo-east-national-park-kenya-africa.png";
import africa3 from "../../Assets/images/landscape-with-tree-africa.png";
import africa4 from "../../Assets/images/male-female-lions-laying-sand-resting.png";
import africa5 from "../../Assets/images/african-hut-rural-scene-surrounded-by-sand-generated-by-ai.png";
import africa6 from "../../Assets/images/giraffes-african-landscape.png";

// Asia
import asia1 from "../../Assets/images/pexels-jeswinthomas-1007431.png";
import asia2 from "../../Assets/images/pexels-tirachard-kumtanom-112571-584302.png";
import asia3 from "../../Assets/images/pexels-manjose-19872.png";
import asia4 from "../../Assets/images/pexels-tirachard-kumtanom-112571-347145.png";
import asia5 from "../../Assets/images/bottom-view-oriental-statue.png";
import asia6 from "../../Assets/images/chinese-park.png";

// North America
import northamerica1 from "../../Assets/images/pexels-dylanspangler-11950175.png";
import northamerica2 from "../../Assets/images/pexels-nout-gons-80280-378570.png";
import northamerica3 from "../../Assets/images/pexels-pixabay-86703.png";
import northamerica4 from "../../Assets/images/pexels-pixabay-208745.png";
import northamerica5 from "../../Assets/images/pexels-alishalubben-2017747.png";
import northamerica6 from "../../Assets/images/pexels-pixabay-290386.png";

// Europe
import europe1 from "../../Assets/images/pexels-jarod-17164125.png";
import europe2 from "../../Assets/images/pexels-chaitaastic-1796736.png";
import europe3 from "../../Assets/images/pexels-sevenstormphotography-575362.png";
import europe4 from "../../Assets/images/pexels-cansu-ogurlu-1839167557-28479033.png";
import europe5 from "../../Assets/images/pexels-hebaysal-773471.png";
import europe6 from "../../Assets/images/pexels-dominikagregus-672532.png";

// Middle East
import middleEast1 from "../../Assets/images/pexels-christian-konopatzki-1923628-10943495.png";
import middleEast2 from "../../Assets/images/pexels-konevi-2159549.png";
import middleEast3 from "../../Assets/images/pexels-vince-21856148.png";
import middleEast4 from "../../Assets/images/pexels-distoreal-3689863.png";
import middleEast5 from "../../Assets/images/pexels-damanory-12631013.png";
import middleEast6 from "../../Assets/images/pexels-sultan-175963006-18274181.png";

// Carbine
import carbine1 from "../../Assets/images/pexels-darren-lawrence-848896-3822155.png";
import carbine2 from "../../Assets/images/pexels-leorossatti-2598721.png";
import carbine3 from "../../Assets/images/pexels-maribernotti-2570524.png";
import carbine4 from "../../Assets/images/pexels-asadphoto-1450372.png";
import carbine5 from "../../Assets/images/pexels-leorossatti-2598635.png";
import carbine6 from "../../Assets/images/pexels-leorossatti-2598683.png";
import { t } from 'i18next';

// Shared image
import sideImage6 from "../../Assets/images/Star 4.png";
import { useTranslation } from "react-i18next";

export const continentData =(t)=> ({
  "south-america": {
    backgroundImage: backgroundSouthAmerica,
    countryName: t("continentSouthAmerica"),
    description: t("continentSouthAmericaDesc"),
    images: [
      { src: southamerica1, className: "img1" },
      { src: southamerica2, className: "img2" },
      { src: southamerica3, className: "img3" },
      { src: southamerica4, className: "img4" },
      { src: southamerica5, className: "img5" },
      { src: sideImage6, className: "img6", text: t("bookATour") },
      { src: southamerica6, className: "img7" },
    ],
    cities: ['Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Peru'],
  },
  africa: {
    backgroundImage: backgroundafrica,
    countryName: t("continentAfrica"),
    description: t("continentAfricaDesc"),
    images: [
      { src: africa1, className: "img1" },
      { src: africa2, className: "img2" },
      { src: africa3, className: "img3" },
      { src: africa4, className: "img4" },
      { src: africa5, className: "img5" },
      { src: sideImage6, className: "img6", text: t("bookATour") },
      { src: africa6, className: "img7" },
    ],
    cities: ['Egypt', 'Tunisia', 'Ghana', 'Kenya', 'Morocco', 'Namibia', 'SouthAfrica'],
  },
  asia: {
    backgroundImage: backgroundasia,
    countryName: t("continentAsia"),
    description: t("continentAsiaDesc"),
    images: [
      { src: asia1, className: "img1" },
      { src: asia2, className: "img2" },
      { src: asia3, className: "img3" },
      { src: asia4, className: "img4" },
      { src: asia5, className: "img5" },
      { src: sideImage6, className: "img6", text: t("bookATour") },
      { src: asia6, className: "img7" },
    ],
    cities: ['China', 'India', 'Japan', 'Russia', 'Thailand', 'SouthKorea', 'Malaysia'],
  },
  "north-america": {
    backgroundImage: backgroundnorthAmerica,
    countryName: t("continentNorthAmerica"),
    description: t("continentNorthAmericaDesc"),
    images: [
      { src: northamerica1, className: "img1" },
      { src: northamerica2, className: "img2" },
      { src: northamerica3, className: "img3" },
      { src: northamerica4, className: "img4" },
      { src: northamerica5, className: "img5" },
      { src: sideImage6, className: "img6", text: t("bookATour") },
      { src: northamerica6, className: "img7" },
    ],
    cities: ['Canada', 'Mexico', 'USA'],
  },
  europe: {
    backgroundImage: backgroundeurope,
    countryName: t("continentEurope"),
    description: t("continentEuropeDesc"),
    images: [
      { src: europe1, className: "img1" },
      { src: europe2, className: "img2" },
      { src: europe3, className: "img3" },
      { src: europe4, className: "img4" },
      { src: europe5, className: "img5" },
      { src: sideImage6, className: "img6", text: t("bookATour") },
      { src: europe6, className: "img7" },
    ],
    cities: ['France', 'Germany', 'Italy', 'Spain', 'Switzerland', 'Turkey'],
  },
  middleEast: {
    backgroundImage: backgroundmiddleEast,
    countryName: t("continentMiddleEast"),
    description: t("continentMiddleEastDesc"),
    images: [
      { src: middleEast1, className: "img1" },
      { src: middleEast2, className: "img2" },
      { src: middleEast3, className: "img3" },
      { src: middleEast4, className: "img4" },
      { src: middleEast5, className: "img5" },
      { src: sideImage6, className: "img6", text: t("bookATour") },
      { src: middleEast6, className: "img7" },
    ],
    cities: ['Palestine', 'Saudi Arabia', 'UAE'],
  },
  carbine: {
    backgroundImage: backgroundcarbine,
    countryName: t("continentCaribbean"),
    description: t("continentCaribbeanDesc"),
    images: [
      { src: carbine1, className: "img1" },
      { src: carbine2, className: "img2" },
      { src: carbine3, className: "img3" },
      { src: carbine4, className: "img4" },
      { src: carbine5, className: "img5" },
      { src: sideImage6, className: "img6", text: t("bookATour") },
      { src: carbine6, className: "img7" },
    ],
    cities: ['Costa Rica', 'Cuba', 'Panama'],
  },
});


