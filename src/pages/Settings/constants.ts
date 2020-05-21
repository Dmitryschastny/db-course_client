import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  pageTitle: string;
  save: string;
  fields: {
    language: string;
    mainCurrency: string;
  };
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    pageTitle: 'Settings',
    save: 'Save',
    fields: {
      language: 'Language',
      mainCurrency: 'Main currency',
    },
  },
  ru: {
    pageTitle: 'Настройки',
    save: 'Сохранить',
    fields: {
      language: 'Настройки',
      mainCurrency: 'Основная валюта',
    },
  },
};
