import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';
import { Credentials } from './types';

export class UsersService extends CrudService {
  constructor(http: Http) {
    super('users', http);
  }

  auth(data: Credentials): Promise<Response<any>> {
    return this.http.post(`auth`, data);
  }
}

export * from './types';
