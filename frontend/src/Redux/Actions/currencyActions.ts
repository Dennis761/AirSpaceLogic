import { Dispatch } from "redux";
import { SET_ACTIVE_CURRENCY_AND_RATE, FETCH_CURRENCY_RATE_ERROR } from "../Constants/currencyConstants.ts";

export const setActiveCurrencyAndRate =
  (currency: string) => async (dispatch: Dispatch) => {
    try {
      const response = await fetch(
        "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
      );
      const data = await response.json();

      let rate = 1;
      if (currency !== "UAH") {
        const selectedCurrency = data.find((item: { cc: string }) => item.cc === currency);
        if (!selectedCurrency) throw new Error(`Курс для ${currency} не найден`);
        rate = selectedCurrency.rate;
      }

      dispatch({
        type: SET_ACTIVE_CURRENCY_AND_RATE,
        payload: { currency, rate },
      });
    } catch (error) {
      console.error("Ошибка получения курса валют:", error);
      dispatch({
        type: FETCH_CURRENCY_RATE_ERROR,
        payload: "Не удалось загрузить курс валюты",
      });
    }
  };
