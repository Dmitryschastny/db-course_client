import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  balance: string;
  logout: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    balance: 'Balance',
    logout: 'Logout',
  },
  ru: {
    logout: 'Выйти',
    balance: 'Баланс',
  },
};
