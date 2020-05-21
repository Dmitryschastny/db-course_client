import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  accountName: string;
  accountType: string;
  currency: string;
  bank: string;
  add: string;
  done: string;
  error: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    accountName: 'Account name',
    accountType: 'Account type',
    currency: 'Currency',
    bank: 'Bank',
    add: 'Add',
    done: 'Account has been added',
    error: 'Something went wrong',
  },
  ru: {
    accountName: 'Наименование аккаунта',
    accountType: 'Тип аккаунта',
    currency: 'Валюта',
    bank: 'Банк',
    add: 'Добавить',
    done: 'Аккаунт был добавлен',
    error: 'Произошла ошибка',
  },
};
