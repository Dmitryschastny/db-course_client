import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';
import { CreateTransactionRequest, TransactionsResponse } from './types';

export class TransactionsService extends CrudService {
  constructor(http: Http) {
    super('transactions', http);
  }

  create(data: CreateTransactionRequest): Promise<Response<any>> {
    return this.http.post(this.path, data);
  }

  async getAll(): Promise<Response<TransactionsResponse>> {
    return this.http.get(`/${this.path}`);
  }

  // async getById(id: number): Promise<Response<BankResponse>> {
  //   return this.http.get(`/${this.path}/${id}`);
  // }
}

export * from './types';
