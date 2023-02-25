import axios, { AxiosRequestConfig } from 'axios';
import CommonApiHandler from './handlers/CommonApiHandler';
import { ApiHandlerType } from './types';

function objectToQueryString(obj: object) {
  const keyValuePairs = [];

  for (const key in obj) {
    const value = encodeURIComponent(obj[key as keyof typeof obj]);
    keyValuePairs.push(`${key}=${value}`);
  }

  return keyValuePairs.join('&');
}

export default class ApiConnection<
  T extends ApiHandlerType = CommonApiHandler
> {
  #axios;
  #responseHandler;

  constructor(baseURL: string, handler: T) {
    this.#axios = axios.create({ baseURL });
    this.#axios.interceptors.request.use(handler.request);
    this.#responseHandler = handler.response;
  }

  get<T>(
    path: string,
    params?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const uri = `${path}?${objectToQueryString(params)}`;
    return this.#responseHandler(this.#axios.get(path, { ...config, params }));
  }

  post<T>(
    path: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.#responseHandler(this.#axios.post(path, data, config));
  }

  put<T>(path: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.#responseHandler(this.#axios.put(path, data, config));
  }

  delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.#responseHandler(this.#axios.delete(path, config));
  }
}
