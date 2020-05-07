import { http } from 'http/http.config';
import { UsersService } from './UsersService';

export const clients = {
  users: new UsersService(http),
};
