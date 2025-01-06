import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../Redux/store.ts";
import { setActiveCurrencyAndRate } from "../../../Redux/Actions/currencyActions.ts";
import "./CurrencySelector.css";

const CurrencySelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeCurrency = useSelector((state: RootState) => state.currency.activeCurrency);
  const underlineRef = useRef<HTMLDivElement>(null);

  const updateUnderlinePosition = () => {
    const activeElement = document.querySelector(".currency-option.active");
    const underline = underlineRef.current;

    if (activeElement && underline) {
      const activeRect = activeElement.getBoundingClientRect();
      underline.style.width = `${activeElement.offsetWidth}px`;
      underline.style.left = `${activeElement.offsetLeft}px`;
    }
  };

  useEffect(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency") || "UAH";
    dispatch(setActiveCurrencyAndRate(savedCurrency));
  }, [dispatch]);

  const handleCurrencyClick = (currency: string) => {
    localStorage.setItem("selectedCurrency", currency);
    dispatch(setActiveCurrencyAndRate(currency));
  };

  useEffect(() => {
    updateUnderlinePosition();

    // Добавляем обработчик изменения размера окна
    window.addEventListener("resize", updateUnderlinePosition);

    // Убираем обработчик при размонтировании
    return () => {
      window.removeEventListener("resize", updateUnderlinePosition);
    };
  }, [activeCurrency]);

  return (
    <div className="currency-container">
      <h2>Валюта:</h2>
      {["UAH", "USD", "EUR"].map((currency) => (
        <span
          key={currency}
          className={`currency-option ${activeCurrency === currency ? "active" : ""}`}
          onClick={() => handleCurrencyClick(currency)}
        >
          {currency}
        </span>
      ))}
      <div className="currency-underline" ref={underlineRef}></div>
    </div>
  );
};

export default CurrencySelector;
