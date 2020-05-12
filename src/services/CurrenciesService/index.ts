import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';
import { CurrencyResponse, CurrenciesResponse } from './types';

export class CurrenciesService extends CrudService {
  constructor(http: Http) {
    super('currencies', http);
  }

  async getAll(): Promise<Response<CurrenciesResponse>> {
    return this.http.get(`/${this.path}`);
  }

  async getById(id: number): Promise<Response<CurrencyResponse>> {
    return this.http.get(`/${this.path}/${id}`);
  }
}

export * from './types';
