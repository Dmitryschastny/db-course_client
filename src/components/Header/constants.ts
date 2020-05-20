import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  balance: string;
  logout: string;
  admin: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    balance: 'Balance',
    logout: 'Logout',
    admin: 'Administrator',
  },
  ru: {
    logout: 'Выйти',
    balance: 'Баланс',
    admin: 'Администратор',
  },
};
