import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  add: string;
  fields: {
    amount: string;
    transactionType: string;
    account: string;
    date: string;
  };
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    add: 'Add',
    fields: {
      amount: 'Amount',
      transactionType: 'Transaction type',
      account: 'Account',
      date: 'Date',
    },
  },
  ru: {
    add: 'Добавить',
    fields: {
      amount: 'Количество',
      transactionType: 'Тип транзакции',
      account: 'Аккаунт',
      date: 'Дата',
    },
  },
};
