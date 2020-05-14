import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';
import { CountryResponse, CountriesResponse } from './types';

export class CountriesService extends CrudService {
  constructor(http: Http) {
    super('countries', http);
  }

  async getAll(): Promise<Response<CountriesResponse>> {
    return this.http.get(`/${this.path}`);
  }

  async getById(id: number): Promise<Response<CountryResponse>> {
    return this.http.get(`/${this.path}/${id}`);
  }
}

export * from './types';
