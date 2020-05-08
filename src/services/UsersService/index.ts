import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';
import { Credentials, AuthResponse } from './types';

export class UsersService extends CrudService {
  constructor(http: Http) {
    super('users', http);
  }

  auth(data: Credentials): Promise<Response<AuthResponse>> {
    return this.http.post(`auth`, data);
  }
}

export * from './types';
