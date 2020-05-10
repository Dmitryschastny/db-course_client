import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  save: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    save: 'Save',
  },
  ru: {
    save: 'Сохранить',
  },
};
