import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  bank: string;
  add: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    bank: 'Bank',
    add: 'Add',
  },
  ru: {
    bank: 'Банк',
    add: 'Добавить',
  },
};
