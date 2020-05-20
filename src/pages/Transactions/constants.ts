import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  pageTitle: string;
  transactionsList: string;
  exportError: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    pageTitle: 'Transactions',
    transactionsList: 'Transactions list',
    exportError: 'Nothing to export',
  },
  ru: {
    pageTitle: 'Транзакции',
    transactionsList: 'Список транзакций',
    exportError: 'Нечего экспортировать',
  },
};
