import { Http, Response } from 'http/types';

export abstract class CrudService<T = any, R = any> {
  protected readonly path: string;

  protected readonly http: Http;

  constructor(path: string, http: Http) {
    this.path = path;
    this.http = http;
  }

  create(data: T): Promise<Response<R>> {
    return this.http.post(this.path, data);
  }

  getAll(): Promise<Response<R[]>> {
    return this.http.get(this.path);
  }

  getById(id: number): Promise<Response<R>> {
    return this.http.get(`${this.path}/${id}`);
  }

  update(id: number, data: T): Promise<Response<R>> {
    return this.http.put(`${this.path}/${id}`, data);
  }

  delete(id: number): Promise<Response> {
    return this.http.delete(`${this.path}/${id}`);
  }
}
