import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  accountName: string;
  accountType: string;
  bank: string;
  save: string;
  delete: string;
  error: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    accountName: 'Account name',
    accountType: 'Account type',
    bank: 'Bank',
    save: 'Save',
    delete: 'Delete',
    error: 'Something went wrong',
  },
  ru: {
    accountName: 'Наименование аккаунта',
    accountType: 'Тип аккаунта',
    bank: 'Банк',
    save: 'Сохранить',
    delete: 'Удалить',
    error: 'Произошла ошибка',
  },
};
