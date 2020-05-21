export type Currency = {
  id: number;
  name: string;
  code: string;
  exchangeFactor: number;
};

export type CurrencyResponse = Currency;
export type CurrenciesResponse = Currency[];
