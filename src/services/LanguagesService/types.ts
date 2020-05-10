export type Language = {
  id: number;
  name: string;
  code: string;
};

export type Languages<T> = {
  en: T;
  ru: T;
};

export type LanguageResponse = Language;
export type LanguagesResponse = Language[];
