import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  accountType: string;
  bank: string;
  save: string;
  delete: string;
  error: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    accountType: 'Account type',
    bank: 'Bank',
    save: 'Save',
    delete: 'Delete',
    error: 'Something went wrong',
  },
  ru: {
    accountType: 'Тип аккаунта',
    bank: 'Банк',
    save: 'Сохранить',
    delete: 'Удалить',
    error: 'Произошла ошибка',
  },
};
