import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  fields: {
    amount: string;
    transactionType: string;
  };
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    fields: {
      amount: 'Amount',
      transactionType: 'Transaction type',
    },
  },
  ru: {
    fields: {
      amount: 'Количество',
      transactionType: 'Тип транзакции',
    },
  },
};
