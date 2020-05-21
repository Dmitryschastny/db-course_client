import { Languages } from 'services/LanguagesService';

export interface CommonStringEntries {
  required: string;
}

export const commonStringEntries: Languages<CommonStringEntries> = {
  en: {
    required: 'Required',
  },
  ru: {
    required: 'Обязательное поле',
  },
};
