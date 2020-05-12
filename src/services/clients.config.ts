import { http } from 'http/http.config';
import { UsersService } from './UsersService';
import { LanguagesService } from './LanguagesService';
import { CurrenciesService } from './CurrenciesService';

export const clients = {
  languages: new LanguagesService(http),
  currencies: new CurrenciesService(http),
  users: new UsersService(http),
};
