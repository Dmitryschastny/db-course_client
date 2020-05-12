import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';
import { Credentials, AuthResponse, MeResponse, UpdateRequest } from './types';

export class UsersService extends CrudService {
  constructor(http: Http) {
    super('users', http);
  }

  auth(data: Credentials): Promise<Response<AuthResponse>> {
    return this.http.post(`auth`, data);
  }

  getByToken(data: { token: string }): Promise<Response<MeResponse>> {
    return this.http.post(`me`, data);
  }

  update(id: number, data: UpdateRequest): Promise<Response<{}>> {
    return this.http.put(`${this.path}/${id}`, data);
  }
}

export * from './types';
