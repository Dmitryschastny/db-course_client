import { AxiosRequestConfig } from 'axios';

export interface Http {
  get(path: string, config?: AxiosRequestConfig): Promise<Response>;
  post(path: string, data: any, config?: AxiosRequestConfig): Promise<Response>;
  put(path: string, data: any, config?: AxiosRequestConfig): Promise<Response>;
  delete(path: string, config?: AxiosRequestConfig): Promise<Response>;
}

export interface Response<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}
