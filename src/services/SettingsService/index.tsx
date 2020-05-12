import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';
import { SettingsResponse } from './types';

export class SettingsService extends CrudService {
  constructor(http: Http) {
    super('settings', http);
  }

  async getById(id: number): Promise<Response<SettingsResponse>> {
    return this.http.get(`/${this.path}/${id}`);
  }
}

export * from './types';
