import { http } from 'http/http.config';
import { UsersService } from './UsersService';
import { LanguagesService } from './LanguagesService';

export const clients = {
  languages: new LanguagesService(http),
  users: new UsersService(http),
};
