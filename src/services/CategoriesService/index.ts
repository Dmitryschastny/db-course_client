import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';
import { CategoryResponse, CategoriesResponse } from './types';

export class CategoriesService extends CrudService {
  constructor(http: Http) {
    super('categories', http);
  }

  async getAll(): Promise<Response<CategoriesResponse>> {
    return this.http.get(`/${this.path}`);
  }

  async getById(id: number): Promise<Response<CategoryResponse>> {
    return this.http.get(`/${this.path}/${id}`);
  }
}

export * from './types';
