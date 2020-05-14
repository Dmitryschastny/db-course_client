import { Country } from '../CountriesService/types';

export type Bank = {
  id: number;
  name: string;
  country: Country;
};

export type BankResponse = Bank;

export type BanksResponse = Bank[];
