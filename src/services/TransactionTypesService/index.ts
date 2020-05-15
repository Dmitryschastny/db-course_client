import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';
import { TransactionTypeResponse, TransactionTypesResponse } from './types';

export class TransactionTypesService extends CrudService {
  constructor(http: Http) {
    super('transaction-types', http);
  }

  async getAll(): Promise<Response<TransactionTypesResponse>> {
    return this.http.get(`/${this.path}`);
  }

  async getById(id: number): Promise<Response<TransactionTypeResponse>> {
    return this.http.get(`/${this.path}/${id}`);
  }
}

export * from './types';
