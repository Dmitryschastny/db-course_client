import { useContext } from 'react';
import { AppContext } from 'App';

export const useLanguageCode = () => {
  const { settings } = useContext(AppContext);

  if (settings?.language) {
    return settings.language.code.toLocaleLowerCase();
  }

  return null;
};
