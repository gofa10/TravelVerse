import { useSelector } from "react-redux";
import { useMemo } from "react";

const rates = {
  USD: { symbol: "$", rate: 1 },
  Dollar: { symbol: "$", rate: 1 },

  RUB: { symbol: "₽", rate: 74.57 },

  EGP: { symbol: "E£", rate: 48 },
  Pound: { symbol: "E£", rate: 48 },
};

const useTransCurrency = (price = 0) => {
  const currency = useSelector((state) => state.currency.currency);

  return useMemo(() => {
    if (!rates[currency]) return price;

    const { symbol, rate } = rates[currency];
    return `${symbol} ${(price * rate).toFixed(2)}`;
  }, [currency, price]);
};

export default useTransCurrency;
