import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  exportError: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    exportError: 'Nothing to export',
  },
  ru: {
    exportError: 'Нечего экспортировать',
  },
};
