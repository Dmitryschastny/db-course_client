import { AxiosHttpProxy } from 'http/AxiosHttpProxy';
import { axiosInstance } from 'http/axios.config';
import { Http } from 'http/types';

export const http = new AxiosHttpProxy(axiosInstance) as Http;
