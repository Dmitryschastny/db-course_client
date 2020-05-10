import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  logout: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    logout: 'Logout',
  },
  ru: {
    logout: 'Выйти',
  },
};
