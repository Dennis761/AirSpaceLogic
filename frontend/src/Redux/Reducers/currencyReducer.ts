import {
  SET_ACTIVE_CURRENCY_AND_RATE,
  FETCH_CURRENCY_RATE_ERROR,
} from "../Constants/currencyConstants.ts";

interface CurrencyState {
  activeCurrency: string;
  currencyRate: number;
  error: string | null;
}

const initialState: CurrencyState = {
  activeCurrency: "UAH",
  currencyRate: 1,
  error: null,
};

export const currencyReducer = (state = initialState, action: any): CurrencyState => {
  switch (action.type) {
    case SET_ACTIVE_CURRENCY_AND_RATE:
      return {
        ...state,
        activeCurrency: action.payload.currency,
        currencyRate: action.payload.rate,
        error: null,
      };

    case FETCH_CURRENCY_RATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
