import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  pageTitle: string;
  save: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    pageTitle: 'Settings',
    save: 'Save',
  },
  ru: {
    pageTitle: 'Настройки',
    save: 'Сохранить',
  },
};
