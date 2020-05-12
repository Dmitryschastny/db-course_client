import { Settings } from 'services/SettingsService';
import { Language } from '../LanguagesService/types';

export type Credentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type User = {
  id: number;
  email: string;
};

export type MeResponse = {
  user: User;
  language: Language;
  // currency: string; // Currency code
};

export type UpdateRequest = {
  settings?: Settings;
};
