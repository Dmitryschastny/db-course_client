import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';
import {
  CreateTransactionRequest,
  TransactionsResponse,
  Transaction,
  UpdateTransactionRequest,
  UpdateTransactionResponse,
} from './types';

export class TransactionsService extends CrudService {
  constructor(http: Http) {
    super('transactions', http);
  }

  create(data: CreateTransactionRequest): Promise<Response<Transaction>> {
    return this.http.post(this.path, data);
  }

  update(
    id: number,
    data: UpdateTransactionRequest
  ): Promise<Response<UpdateTransactionResponse>> {
    return this.http.put(`${this.path}/${id}`, data);
  }

  async getAll(): Promise<Response<TransactionsResponse>> {
    return this.http.get(`/${this.path}`);
  }

  // async getById(id: number): Promise<Response<BankResponse>> {
  //   return this.http.get(`/${this.path}/${id}`);
  // }
}

export * from './types';
