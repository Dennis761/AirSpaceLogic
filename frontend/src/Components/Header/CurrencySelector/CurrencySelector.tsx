import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../Redux/store.ts";
import { setActiveCurrencyAndRate } from "../../../Redux/Actions/currencyActions.ts";
import "./CurrencySelector.css";

const CurrencySelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const activeCurrency = useSelector((state: RootState) => state.currency.activeCurrency);

  useEffect(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency") || "UAH";
    dispatch(setActiveCurrencyAndRate(savedCurrency)); 
  }, [dispatch]);

  const handleCurrencyClick = (currency: string) => {
    localStorage.setItem("selectedCurrency", currency);
    dispatch(setActiveCurrencyAndRate(currency)); 
  };
 
  return (
    <div className="currency-container">
      <h2>Валюта:</h2>
      <span
        className={`currency-option ${activeCurrency === "UAH" ? "active" : ""}`}
        onClick={() => handleCurrencyClick("UAH")}
      >
        UAH
      </span>
      <span
        className={`currency-option ${activeCurrency === "USD" ? "active" : ""}`}
        onClick={() => handleCurrencyClick("USD")}
      >
        USD
      </span>
      <span
        className={`currency-option ${activeCurrency === "EUR" ? "active" : ""}`}
        onClick={() => handleCurrencyClick("EUR")}
      >
        EUR
      </span>
      <div className="currency-underline"></div>
    </div>
  );
};

export default CurrencySelector;

