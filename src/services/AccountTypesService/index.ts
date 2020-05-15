import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';
import { AccountTypeResponse, AccountTypesResponse } from './types';

export class AccountTypesService extends CrudService {
  constructor(http: Http) {
    super('account-types', http);
  }

  async getAll(): Promise<Response<AccountTypesResponse>> {
    return this.http.get(`/${this.path}`);
  }

  async getById(id: number): Promise<Response<AccountTypeResponse>> {
    return this.http.get(`/${this.path}/${id}`);
  }
}

export * from './types';
