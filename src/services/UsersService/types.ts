import { Settings } from 'services/SettingsService';
import { Account } from '../AccountsService';
import { Currency } from '../CurrenciesService';
import { Language } from '../LanguagesService';

export type Credentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type User = {
  id: number;
  email: string;
};

export type MeResponse = {
  user: User;
  settings: {
    language: Language;
    mainCurrency: Currency;
  };
  accounts: Account[];
};

export type UpdateRequest = {
  settings?: Settings;
};
