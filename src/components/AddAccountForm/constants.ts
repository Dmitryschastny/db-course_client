import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  accountType: string;
  bank: string;
  add: string;
  done: string;
  error: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    accountType: 'Account type',
    bank: 'Bank',
    add: 'Add',
    done: 'Account has been added',
    error: 'Something went wrong',
  },
  ru: {
    accountType: 'Тип аккаунта',
    bank: 'Банк',
    add: 'Добавить',
    done: 'Аккаунт был добавлен',
    error: 'Произошла ошибка',
  },
};
