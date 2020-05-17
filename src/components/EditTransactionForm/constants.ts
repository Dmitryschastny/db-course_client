import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  save: string;
  delete: string;
  fields: {
    amount: string;
    transactionType: string;
    account: string;
    date: string;
    category: string;
    note: string;
    place: string;
  };
  done: string;
  error: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    save: 'Save',
    delete: 'Delete',
    fields: {
      amount: 'Amount',
      transactionType: 'Transaction type',
      account: 'Account',
      date: 'Date',
      category: 'Category',
      note: 'Note',
      place: 'Place',
    },
    done: 'Transactions has been added',
    error: 'Something went wrong',
  },
  ru: {
    save: 'Сохранить',
    delete: 'Удалить',
    fields: {
      amount: 'Количество',
      transactionType: 'Тип транзакции',
      account: 'Аккаунт',
      date: 'Дата',
      category: 'Категория',
      note: 'Заметка',
      place: 'Место',
    },
    done: 'Транзакция была добавлена',
    error: 'Произошла ошибка',
  },
};
