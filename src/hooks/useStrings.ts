import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';
import { Languages } from 'services/LanguagesService';
import { useContext } from 'react';
import { AppContext } from 'App';

type Strings<T> = T & LocalizedStringsMethods;

export const useStrings: <T>(entries: Languages<T>) => Strings<T> = entries => {
  const { language } = useContext(AppContext);

  const strings = new LocalizedStrings(entries);

  if (language) {
    strings.setLanguage(language.code.toLowerCase());
  }

  return strings;
};
