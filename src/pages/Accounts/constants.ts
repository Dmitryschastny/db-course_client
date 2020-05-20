import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  pageTitle: string;
  accountsList: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    pageTitle: 'Accounts',
    accountsList: 'Accounts list',
  },
  ru: {
    pageTitle: 'Аккаунты',
    accountsList: 'Список аккаунтов',
  },
};
