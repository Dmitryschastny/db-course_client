import { Languages } from '../../hooks/useStrings';

export interface StringEntries {
  save: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    save: 'Save',
  },
  rus: {
    save: 'Сохранить',
  },
};
