import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';
import { LanguageResponse, LanguagesResponse } from './types';

export class LanguagesService extends CrudService {
  constructor(http: Http) {
    super('languages', http);
  }

  async getAll(): Promise<Response<LanguagesResponse>> {
    return this.http.get(`/${this.path}`);
  }

  async getById(id: number): Promise<Response<LanguageResponse>> {
    return this.http.get(`/${this.path}/${id}`);
  }
}

export * from './types';
