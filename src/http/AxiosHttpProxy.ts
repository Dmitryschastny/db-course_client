import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Http, Response } from './types';

export class AxiosHttpProxy implements Http {
  private readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async delete(path: string, config?: AxiosRequestConfig): Promise<Response> {
    return this.axios.delete(path, config);
  }

  async get(path: string, config?: AxiosRequestConfig): Promise<Response> {
    return this.axios.get(path, config);
  }

  async post(
    path: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<Response> {
    return this.axios.post(path, data, config);
  }

  async put(
    path: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<Response> {
    return this.axios.put(path, data, config);
  }
}
