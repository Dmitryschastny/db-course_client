import { Languages } from '../../hooks/useStrings';

export interface StringEntries {
  logout: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    logout: 'Logout',
  },
  rus: {
    logout: 'Выйти',
  },
};
