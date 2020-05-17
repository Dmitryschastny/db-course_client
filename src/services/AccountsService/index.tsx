import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';
import {
  CreateAccountRequest,
  AccountsResponse,
  CreateAccountResponse,
  UpdateAccountResponse,
  UpdateAccountRequest,
} from './types';

export class AccountsService extends CrudService {
  constructor(http: Http) {
    super('accounts', http);
  }

  create(data: CreateAccountRequest): Promise<Response<CreateAccountResponse>> {
    return this.http.post(this.path, data);
  }

  update(
    id: number,
    data: UpdateAccountRequest
  ): Promise<Response<UpdateAccountResponse>> {
    return this.http.put(`${this.path}/${id}`, data);
  }

  /**
   * Returns current user accounts
   */
  async getAll(): Promise<Response<AccountsResponse>> {
    return this.http.get(`/${this.path}`);
  }

  // async getById(id: number): Promise<Response<AccountTypeResponse>> {
  //   return this.http.get(`/${this.path}/${id}`);
  // }
}

export * from './types';
