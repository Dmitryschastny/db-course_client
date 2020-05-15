import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  accountType: string;
  bank: string;
  add: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    accountType: 'Account type',
    bank: 'Bank',
    add: 'Add',
  },
  ru: {
    accountType: 'Тип аккаунта',
    bank: 'Банк',
    add: 'Добавить',
  },
};
