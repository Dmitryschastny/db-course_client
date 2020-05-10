import { clients } from 'services/clients.config';
import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';

export type Languages<T> = {
  en: T;
  rus: T;
};

type Strings<T> = T & LocalizedStringsMethods;

export const useStrings: <T>(entries: Languages<T>) => Strings<T> = entries => {
  const strings = new LocalizedStrings(entries);

  strings.setLanguage('rus');

  return strings;
};
