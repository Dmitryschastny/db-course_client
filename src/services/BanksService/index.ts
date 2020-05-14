import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';
import { BanksResponse, BankResponse } from './types';

export class BanksService extends CrudService {
  constructor(http: Http) {
    super('banks', http);
  }

  async getAll(): Promise<Response<BanksResponse>> {
    return this.http.get(`/${this.path}`);
  }

  async getById(id: number): Promise<Response<BankResponse>> {
    return this.http.get(`/${this.path}/${id}`);
  }
}

export * from './types';
