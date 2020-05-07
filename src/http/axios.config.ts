import axios from 'axios';

const BASE_API_URL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  responseType: 'json',
});

axiosInstance.interceptors.request.use(config => {
  const { headers } = config;

  headers.Authorization = 'efc39915d59aedb52c1049b0cb49fc11cbf128fd';

  return config;
});

export { axiosInstance };
