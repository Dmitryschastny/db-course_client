import { http } from 'http/http.config';
import { UsersService } from './UsersService';
import { LanguagesService } from './LanguagesService';
import { CurrenciesService } from './CurrenciesService';
import { BanksService } from './BanksService';
import { CountriesService } from './CountriesService';
import { AccountTypesService } from './AccountTypesService';

export const clients = {
  banks: new BanksService(http),
  countries: new CountriesService(http),
  languages: new LanguagesService(http),
  currencies: new CurrenciesService(http),
  users: new UsersService(http),
  accountTypes: new AccountTypesService(http),
};
