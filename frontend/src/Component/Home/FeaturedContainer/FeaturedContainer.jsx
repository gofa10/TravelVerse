import React from 'react';
import { useTranslation } from 'react-i18next';
import style from '../../../Style/HomeStyle/FeaturedContainer.module.css';

const FeaturedContainer = () => {
  const { t } = useTranslation();

  return (
    <div className={style.stats_wrapper}>
      <div className={style.stats_bar}>
        <div className={style.stat_item}>
          <span className={style.stat_num}>149+</span>
          <span className={style.stat_label}>{t("feature_guides_short")}</span>
        </div>
        <div className={style.stat_divider} />
        <div className={style.stat_item}>
          <span className={style.stat_num}>4M+</span>
          <span className={style.stat_label}>{t("feature_travelers_short")}</span>
        </div>
        <div className={style.stat_divider} />
        <div className={style.stat_item}>
          <span className={style.stat_num}>98%</span>
          <span className={style.stat_label}>{t("feature_satisfaction_short")}</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContainer;
