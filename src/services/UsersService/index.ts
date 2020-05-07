import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';

export class UsersService extends CrudService {
  constructor(http: Http) {
    super('users', http);
  }
}

// export * from './types';
